<?php
/**
 * Backend API cho The 30 - Coffee & Tea
 * Lưu trữ dữ liệu dạng JSON - Không cần cấu hình MySQL phức tạp, chạy mượt trên mọi gói Hosting cPanel iNET.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/data';
$uploadDir = __DIR__ . '/uploads';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$productsFile = $dataDir . '/products.json';
$ordersFile   = $dataDir . '/orders.json';
$bannersFile  = $dataDir . '/banners.json';
$settingsFile = $dataDir . '/settings.json';

// Dữ liệu mẫu khởi tạo nếu chưa có
function getInitialProducts() {
    return [
        [
            'id' => 'p1',
            'name' => 'Cà phê Phin Sữa Đá The 30',
            'category' => 'coffee',
            'price' => 25000,
            'image' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => true,
            'description' => 'Cà phê Robusta Đắk Lắk pha phin truyền thống đậm đà kết hợp sữa đặc ngọt béo.'
        ],
        [
            'id' => 'p2',
            'name' => 'Cà phê Muối Cố Đô',
            'category' => 'coffee',
            'price' => 32000,
            'image' => 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => true,
            'description' => 'Lớp kem muối béo ngậy mằn mặn hòa quyện cùng cà phê thơm đậm khó cưỡng.'
        ],
        [
            'id' => 'p3',
            'name' => 'Bạc Xỉu 3 Tầng Kem Béo',
            'category' => 'coffee',
            'price' => 29000,
            'image' => 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => false,
            'description' => 'Vị ngọt dịu từ sữa tươi và sữa đặc, thơm thoang thoảng vị cà phê phin.'
        ],
        [
            'id' => 'p4',
            'name' => 'Trà Đào Cam Sả Tươi Mát',
            'category' => 'tea',
            'price' => 35000,
            'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => true,
            'description' => 'Trà đen hảo hạng kết hợp miếng đào giòn ngọt và vị cam sả thanh nhiệt.'
        ],
        [
            'id' => 'p5',
            'name' => 'Trà Sữa Truyền Thống Trân Châu',
            'category' => 'tea',
            'price' => 32000,
            'image' => 'https://images.unsplash.com/photo-1558857563-b37cfbbf42f5?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => true,
            'description' => 'Trà sữa đậm vị trà, trân châu hoàng kim dai giòn sần sật.'
        ],
        [
            'id' => 'p6',
            'name' => 'Trà Ô Long Sen Vàng Macchiato',
            'category' => 'tea',
            'price' => 39000,
            'image' => 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => false,
            'description' => 'Trà ô long thanh khiết, hạt sen bùi béo kết hợp lớp milk foam sánh mịn.'
        ],
        [
            'id' => 'p7',
            'name' => 'Matcha Đá Xay Kem Tuyết',
            'category' => 'iceblended',
            'price' => 42000,
            'image' => 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => true,
            'description' => 'Bột matcha Nhật Bản nguyên chất xay mịn cùng sữa và kem béo ngọt ngào.'
        ],
        [
            'id' => 'p8',
            'name' => 'Cà Phê Cốt Dừa Đá Xay',
            'category' => 'iceblended',
            'price' => 40000,
            'image' => 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => false,
            'description' => 'Cốt dừa béo thơm ngậy xay đá tuyết quyện cùng cà phê thơm nồng.'
        ],
        [
            'id' => 'p9',
            'name' => 'Bánh Croissant Bơ Tỏi Nướng',
            'category' => 'snack',
            'price' => 28000,
            'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
            'isBestSeller' => false,
            'description' => 'Bánh sừng bò ngàn lớp thơm lừng bơ Pháp, vỏ giòn ruột mềm.'
        ]
    ];
}

function getInitialBanners() {
    return [
        [
            'id' => 'b1',
            'title' => 'CHÀO BẠN MỚI ĐẾN VỚI THE 30',
            'subtitle' => 'Ưu đãi giảm 20% cho đơn hàng đầu tiên - Đậm đà vị cà phê nguyên bản',
            'badge' => 'KHUYẾN MÃI HOT',
            'image' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop&q=80',
            'active' => true
        ],
        [
            'id' => 'b2',
            'title' => 'BST TRÀ TRÁI CÂY NHIỆT ĐỚI TƯƠI MÁT',
            'subtitle' => 'Giải nhiệt sảng khoái với Trà Đào Cam Sả & Trà Dâu Tằm Macchiato',
            'badge' => 'MÓN MỚI TUẦN NÀY',
            'image' => 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1600&auto=format&fit=crop&q=80',
            'active' => true
        ]
    ];
}

function getInitialSettings() {
    return [
        'storeName' => 'The 30 - Coffee & Tea',
        'hotline' => '0949551441 - 0949789483',
        'address' => 'Việt Nam (Đặt giao nhanh tận nơi / Mang đi / Tại bàn)',
        'adminPin' => '123456',
        'bankCode' => 'ICB',
        'bankAccount' => '100880871374',
        'bankAccountName' => 'THE30s_COFFEE',
        'qrImageUrl' => '', // Quản lý có thể tải ảnh QR của quán lên
        'orderPrefix' => 'THE30S',
        'settingsVersion' => '20261101_v5'
    ];
}

// Hàm đọc ghi file JSON
function readFileJson($filePath, $default) {
    if (!file_exists($filePath)) {
        file_put_contents($filePath, json_encode($default, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $default;
    }
    $content = file_get_contents($filePath);
    $data = json_decode($content, true);
    return is_array($data) ? $data : $default;
}

function writeFileJson($filePath, $data) {
    return file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'get_all':
        $products = readFileJson($productsFile, getInitialProducts());
        $banners  = readFileJson($bannersFile, getInitialBanners());
        $settings = readFileJson($settingsFile, getInitialSettings());
        if (empty($settings['bankAccount']) || $settings['bankAccount'] === '0949551441' || (isset($settings['bankCode']) && $settings['bankCode'] === 'MB') || empty($settings['settingsVersion']) || $settings['settingsVersion'] !== '20261101_v5') {
            $settings['bankCode'] = 'ICB';
            $settings['bankAccount'] = '100880871374';
            $settings['bankAccountName'] = 'THE30s_COFFEE';
            $settings['qrImageUrl'] = '';
            $settings['settingsVersion'] = '20261101_v5';
            writeFileJson($settingsFile, $settings);
        }
        $orders   = readFileJson($ordersFile, []);
        
        echo json_encode([
            'success' => true,
            'products' => $products,
            'banners'  => $banners,
            'settings' => $settings,
            'orders'   => $orders
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'create_order':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input || empty($input['items'])) {
            echo json_encode(['success' => false, 'message' => 'Dữ liệu đơn hàng không hợp lệ']);
            exit();
        }
        $orders = readFileJson($ordersFile, []);
        $orderId = (!empty($input['id'])) ? trim($input['id']) : ('ORD-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 6)));
        $newOrder = [
            'id' => $orderId,
            'customerPhone' => isset($input['customerPhone']) ? trim($input['customerPhone']) : '',
            'customerName'  => isset($input['customerName']) ? trim($input['customerName']) : 'Khách hàng',
            'orderType'     => isset($input['orderType']) ? $input['orderType'] : 'takeaway', // takeaway, dinein, delivery
            'address'       => isset($input['address']) ? trim($input['address']) : '',
            'note'          => isset($input['note']) ? trim($input['note']) : '',
            'items'         => $input['items'], // [{id, name, price, quantity, note}]
            'totalAmount'   => intval($input['totalAmount']),
            'status'        => 'pending', // pending, preparing, shipping, completed, cancelled
            'paymentStatus' => 'unpaid',  // unpaid, paid, paid_reported
            'createdAt'     => date('Y-m-d H:i:s'),
            'timestamp'     => time()
        ];
        array_unshift($orders, $newOrder); // Đơn mới nhất lên đầu
        writeFileJson($ordersFile, $orders);

        echo json_encode(['success' => true, 'order' => $newOrder], JSON_UNESCAPED_UNICODE);
        break;

    case 'check_payment_status':
    case 'check_order_payment':
        $orderId = isset($_GET['orderId']) ? trim($_GET['orderId']) : '';
        $orders = readFileJson($ordersFile, []);
        $cleanSearch = str_replace('-', '', strtoupper($orderId));

        $foundOrder = null;
        foreach ($orders as $o) {
            $cleanId = str_replace('-', '', strtoupper($o['id']));
            if ($cleanId === $cleanSearch || strtoupper($o['id']) === strtoupper($orderId)) {
                $foundOrder = $o;
                break;
            }
        }

        if ($foundOrder) {
            $isPaid = ($foundOrder['paymentStatus'] === 'paid');
            echo json_encode([
                'success' => true,
                'paid' => $isPaid,
                'isPaid' => $isPaid,
                'paymentStatus' => isset($foundOrder['paymentStatus']) ? $foundOrder['paymentStatus'] : 'unpaid',
                'status' => $foundOrder['status'],
                'order' => $foundOrder
            ], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([
                'success' => false,
                'paid' => false,
                'isPaid' => false,
                'message' => 'Không tìm thấy đơn hàng'
            ], JSON_UNESCAPED_UNICODE);
        }
        break;

    case 'update_order_status':
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = isset($input['orderId']) ? $input['orderId'] : '';
        $newStatus = isset($input['status']) ? $input['status'] : '';
        $paymentStatus = isset($input['paymentStatus']) ? $input['paymentStatus'] : '';
        
        $orders = readFileJson($ordersFile, []);
        $found = false;
        foreach ($orders as &$ord) {
            if ($ord['id'] === $orderId) {
                if (!empty($newStatus)) {
                    $ord['status'] = $newStatus;
                    if ($newStatus === 'completed') {
                        $ord['completedAt'] = date('Y-m-d H:i:s');
                    }
                }
                if (!empty($paymentStatus)) {
                    $ord['paymentStatus'] = $paymentStatus;
                }
                $found = true;
                break;
            }
        }
        if ($found) {
            writeFileJson($ordersFile, $orders);
            echo json_encode(['success' => true, 'orders' => $orders], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
        }
        break;

    case 'delete_order':
        $input = json_decode(file_get_contents('php://input'), true);
        $orderId = isset($input['orderId']) ? $input['orderId'] : '';
        $orders = readFileJson($ordersFile, []);
        $orders = array_values(array_filter($orders, function($o) use ($orderId) {
            return $o['id'] !== $orderId;
        }));
        writeFileJson($ordersFile, $orders);
        echo json_encode(['success' => true, 'orders' => $orders], JSON_UNESCAPED_UNICODE);
        break;

    case 'save_product':
        $input = json_decode(file_get_contents('php://input'), true);
        $products = readFileJson($productsFile, getInitialProducts());
        
        if (isset($input['id']) && !empty($input['id'])) {
            // Sửa sản phẩm
            $updated = false;
            foreach ($products as &$p) {
                if ($p['id'] === $input['id']) {
                    $p['name'] = $input['name'];
                    $p['category'] = $input['category'];
                    $p['price'] = intval($input['price']);
                    $p['image'] = $input['image'];
                    $p['isBestSeller'] = !empty($input['isBestSeller']);
                    $p['description'] = isset($input['description']) ? $input['description'] : '';
                    $updated = true;
                    break;
                }
            }
            if (!$updated) {
                $input['id'] = 'p' . time();
                $products[] = $input;
            }
        } else {
            // Thêm mới
            $input['id'] = 'p' . time();
            $products[] = $input;
        }
        writeFileJson($productsFile, $products);
        echo json_encode(['success' => true, 'products' => $products], JSON_UNESCAPED_UNICODE);
        break;

    case 'delete_product':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? $input['id'] : '';
        $products = readFileJson($productsFile, getInitialProducts());
        $products = array_values(array_filter($products, function($p) use ($id) {
            return $p['id'] !== $id;
        }));
        writeFileJson($productsFile, $products);
        echo json_encode(['success' => true, 'products' => $products], JSON_UNESCAPED_UNICODE);
        break;

    case 'save_banner':
        $input = json_decode(file_get_contents('php://input'), true);
        $banners = readFileJson($bannersFile, getInitialBanners());
        if (isset($input['id']) && !empty($input['id'])) {
            foreach ($banners as &$b) {
                if ($b['id'] === $input['id']) {
                    $b = $input;
                    break;
                }
            }
        } else {
            $input['id'] = 'b' . time();
            $banners[] = $input;
        }
        writeFileJson($bannersFile, $banners);
        echo json_encode(['success' => true, 'banners' => $banners], JSON_UNESCAPED_UNICODE);
        break;

    case 'delete_banner':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? $input['id'] : '';
        $banners = readFileJson($bannersFile, getInitialBanners());
        $banners = array_values(array_filter($banners, function($b) use ($id) {
            return $b['id'] !== $id;
        }));
        writeFileJson($bannersFile, $banners);
        echo json_encode(['success' => true, 'banners' => $banners], JSON_UNESCAPED_UNICODE);
        break;

    case 'save_settings':
        $input = json_decode(file_get_contents('php://input'), true);
        $settings = readFileJson($settingsFile, getInitialSettings());
        $settings = array_merge($settings, $input);
        writeFileJson($settingsFile, $settings);
        echo json_encode(['success' => true, 'settings' => $settings], JSON_UNESCAPED_UNICODE);
        break;

    case 'upload_image':
        if (!empty($_FILES['image']['name'])) {
            $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
            $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
            if (!in_array($ext, $allowed)) {
                echo json_encode(['success' => false, 'message' => 'Định dạng ảnh không hỗ trợ']);
                exit();
            }
            $fileName = 'img_' . time() . '_' . rand(100, 999) . '.' . $ext;
            $dest = $uploadDir . '/' . $fileName;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $dest)) {
                $url = 'uploads/' . $fileName;
                echo json_encode(['success' => true, 'url' => $url]);
                exit();
            }
        }
        echo json_encode(['success' => false, 'message' => 'Tải ảnh thất bại']);
        break;

    default:
        echo json_encode([
            'success' => true,
            'message' => 'The 30 - Coffee & Tea API is online!',
            'version' => '1.0.0'
        ]);
        break;
}
