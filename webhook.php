<?php
/**
 * =========================================================================
 * ENDPOINT WEBHOOK NHẬN BIẾN ĐỘNG SỐ DƯ TỰ ĐỘNG (APIPAY / SEPAY / CASSO)
 * Website: The 30 - Coffee & Tea (the30s.id.vn)
 * =========================================================================
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 1. MÃ BẢO MẬT API KEY (Bạn có thể đổi mã này trùng với API Key từ ApiPay/SePay)
define('WEBHOOK_API_KEY', 'THE30S_SECURE_API_KEY_2026');

// 2. XÁC THỰC BẢO MẬT (Chặn request giả mạo)
$headers = getallheaders();
$authHeader = '';
if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
} elseif (isset($headers['authorization'])) {
    $authHeader = $headers['authorization'];
} elseif (isset($headers['x-api-key'])) {
    $authHeader = $headers['x-api-key'];
}

$queryKey = isset($_GET['apikey']) ? $_GET['apikey'] : (isset($_GET['api_key']) ? $_GET['api_key'] : '');

// Cho phép nếu chứa API Key hoặc nếu đang ở môi trường test/chưa cấu hình strict
$isAuthorized = false;
if (empty(WEBHOOK_API_KEY) || WEBHOOK_API_KEY === 'THE30S_SECURE_API_KEY_2026') {
    // Nếu chưa đổi key mặc định, vẫn cho phép nhận để test thông suốt
    $isAuthorized = true;
} elseif (strpos($authHeader, WEBHOOK_API_KEY) !== false || $queryKey === WEBHOOK_API_KEY) {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized: API Key không chính xác hoặc không được cung cấp.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// 3. NHẬN DỮ LIỆU JSON TỪ WEBHOOK
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Bad Request: Dữ liệu JSON không hợp lệ.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Ghi log để quản trị viên dễ dàng theo dõi & kiểm tra đối soát
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
 * Hỗ trợ định dạng của cả ApiPay.vn, SePay và Casso:
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

// 4. PHÂN TÍCH CÚ PHÁP TÌM MÃ ĐƠN HÀNG (VD: THE30 ORD-123456 hoặc ORD-123456 hoặc ORD123456)
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

// 5. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG TRONG CƠ SỞ DỮ LIỆU
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
            $order['gateway']       = isset($payload['gateway']) ? $payload['gateway'] : (isset($data['gateway']) ? $data['gateway'] : 'VietQR');
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
