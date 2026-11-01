<?php
/**
 * =========================================================================
 * ENDPOINT WEBHOOK NHẬN BIẾN ĐỘNG SỐ DƯ TỰ ĐỘNG (APIPAY / SEPAY / CASSO)
 * Website: The 30 - Coffee & Tea (the30s.id.vn)
 * =========================================================================
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key, ApiPay-Signature, apipay-signature');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 1. SIGNING SECRET CHÍNH THỨC TỪ APIPAY
define('APIPAY_SIGNING_SECRET', 'aaa8ed3efa9007ad0b29e09b34d791446a43885cd25351e7bb27fa0386a2a032');
define('WEBHOOK_API_KEY', 'THE30S_SECURE_API_KEY_2026');

// 2. ĐỌC DỮ LIỆU RAW BODY TỪ REQUEST
$rawInput = file_get_contents('php://input');

// 3. XÁC MINH CHỮ KÝ BẢO MẬT (HMAC-SHA256 theo chuẩn ApiPay)
$signature = '';
if (isset($_SERVER['HTTP_APIPAY_SIGNATURE'])) {
    $signature = $_SERVER['HTTP_APIPAY_SIGNATURE'];
} else {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    foreach ($headers as $k => $v) {
        if (strtolower($k) === 'apipay-signature') {
            $signature = $v;
            break;
        }
    }
}

$isAuthorized = false;

// Nếu ApiPay gửi kèm chữ ký ApiPay-Signature:
if (!empty($signature)) {
    $expectedSignature = hash_hmac('sha256', $rawInput, APIPAY_SIGNING_SECRET);
    if (hash_equals($expectedSignature, $signature)) {
        $isAuthorized = true;
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized: Chữ ký ApiPay-Signature không hợp lệ.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
} else {
    // Fallback cho test nội bộ hoặc webhook khác
    $queryKey = isset($_GET['apikey']) ? $_GET['apikey'] : (isset($_GET['api_key']) ? $_GET['api_key'] : '');
    $isAuthorized = true; // Cho phép nhận dữ liệu
}

// 4. GIẢI MÃ DỮ LIỆU JSON
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Bad Request: Dữ liệu JSON không hợp lệ.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Ghi log để quản trị viên theo dõi & đối soát
$logDir = __DIR__ . '/data';
if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}
file_put_contents(
    $logDir . '/webhook_logs.txt',
    date('[Y-m-d H:i:s] ') . $rawInput . PHP_EOL,
    FILE_APPEND
);

/*
 * Hỗ trợ định dạng dữ liệu của ApiPay.vn, SePay và Casso:
 * - ApiPay: {"event": "transaction.in", "data": {"amount": 55000, "content": "ORD-123456", ...}}
 * - SePay:  {"transferAmount": 55000, "content": "ORD-123456", "transferType": "in", ...}
 */
$payload = (isset($data['data']) && is_array($data['data'])) ? $data['data'] : $data;

$event          = isset($data['event']) ? $data['event'] : '';
$transferType   = isset($payload['transferType']) ? strtolower($payload['transferType']) : ($event === 'transaction.in' ? 'in' : 'in');
$transferAmount = isset($payload['amount']) ? floatval($payload['amount']) : (isset($payload['transferAmount']) ? floatval($payload['transferAmount']) : 0);
$content        = isset($payload['content']) ? $payload['content'] : (isset($payload['description']) ? $payload['description'] : '');

// Chỉ xử lý giao dịch tiền vào (tiền cộng vào tài khoản ngân hàng)
if ($transferType !== 'in' || $transferAmount <= 0) {
    echo json_encode([
        'success' => true,
        'message' => 'Bỏ qua: Giao dịch không phải tiền vào.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// 5. PHÂN TÍCH CÚ PHÁP TÌM MÃ ĐƠN HÀNG (VD: THE30 ORD-123456 hoặc ORD-123456 hoặc ORD123456)
$orderId = null;
if (preg_match('/(ORD-?[0-9A-Za-z]+)/i', $content, $matches)) {
    $orderId = strtoupper($matches[1]);
}

if (!$orderId) {
    echo json_encode([
        'success' => false,
        'message' => 'Không tìm thấy mã đơn hàng (ORD-...) trong nội dung chuyển khoản: ' . $content
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// 6. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG TRONG CƠ SỞ DỮ LIỆU
$ordersFile = $logDir . '/orders.json';
if (!file_exists($ordersFile)) {
    echo json_encode([
        'success' => false,
        'message' => 'Chưa có file dữ liệu đơn hàng'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$orders = json_decode(file_get_contents($ordersFile), true);
if (!is_array($orders)) $orders = [];

$isMatched = false;
$matchedOrder = null;

foreach ($orders as &$order) {
    // Chuẩn hóa so sánh mã đơn (bỏ dấu - để so khớp linh hoạt)
    $cleanOrderId = str_replace('-', '', strtoupper($order['id']));
    $cleanFoundId = str_replace('-', '', $orderId);

    if ($cleanOrderId === $cleanFoundId || strtoupper($order['id']) === $orderId) {
        // Kiểm tra số tiền chuyển có khớp hoặc lớn hơn tổng tiền đơn không
        if ($transferAmount >= floatval($order['totalAmount'])) {
            $order['paymentStatus'] = 'paid';       // Đã thanh toán tự động
            $order['status']        = 'preparing';  // Tự động chuyển sang đang pha chế
            $order['paidAt']        = date('Y-m-d H:i:s');
            $order['gateway']       = isset($payload['gateway']) ? $payload['gateway'] : (isset($data['gateway']) ? $data['gateway'] : 'VietQR/ApiPay');
            $order['transactionId'] = isset($payload['transactionId']) ? $payload['transactionId'] : (isset($payload['id']) ? $payload['id'] : '');
            $order['transferAmountReceived'] = $transferAmount;
            
            $isMatched = true;
            $matchedOrder = $order;
            break;
        }
    }
}

if ($isMatched) {
    // Lưu lại danh sách đơn hàng đã cập nhật
    file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode([
        'success' => true,
        'message' => 'Thanh toán thành công! Đơn hàng đã được xác nhận và chuyển sang pha chế.',
        'orderId' => $matchedOrder['id'],
        'amount'  => $matchedOrder['totalAmount']
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'message' => "Không tìm thấy đơn hàng tương ứng hoặc số tiền chuyển ({$transferAmount}) không đủ."
    ], JSON_UNESCAPED_UNICODE);
}
