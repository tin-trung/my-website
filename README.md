# The 30 - Coffee & Tea (the30s.id.vn)

Website và hệ thống quản trị bán hàng, đặt món trực tuyến theo thời gian thực dành cho quán **The 30 - Coffee & Tea**.

## 🌟 Tính năng nổi bật

### 1. Dành cho Khách hàng (Customer Experience)
- **Menu trực quan**: Danh mục Cà phê, Trà & Trà sữa, Đá xay, Bánh ngọt với mác Best Seller.
- **Tùy chỉnh món**: Chọn lượng đường, đá, size ly, thêm topping trân châu và ghi chú yêu cầu riêng.
- **Giỏ hàng & Đặt hàng nhanh**: Đặt mang đi (Takeaway), Uống tại quán (Dine-in) hoặc Giao tận nơi (Delivery).
- **Thanh toán QR Thông minh**: Tự động sinh mã VietQR theo chuẩn Napas kèm số tiền và mã đơn.
- **Tích điểm thành viên**: Quản lý khách hàng thân thiết theo số điện thoại.

### 2. Bảng Quản trị Quầy / POS (Admin Dashboard)
- **Thông báo đơn mới tức thì**: Thanh thông báo màu vàng/cam nổi bật kèm chuông reo "Ting ting" khi có khách đặt. Tự động ẩn khi đã xử lý hết đơn.
- **Phân loại đơn hàng thông minh**:
  - `⚡ Đang cần làm`: Chỉ hiển thị các đơn đang chờ nhận, đang pha chế hoặc đang giao. Tuyệt đối không lẫn đơn đã xong.
  - `✅ Đã hoàn thành`: Tự động chuyển đơn vào đây ngay khi bấm "Hoàn thành", lưu vết thời gian hoàn tất.
  - `🕒 Chờ nhận`, `☕ Đang pha chế`, `🚚 Đang giao`, `❌ Đã hủy`.
- **Thống kê KPI thời gian thực**: Theo dõi số đơn cần làm, đơn chờ duyệt, tổng đơn hoàn thành và doanh thu tích lũy.
- **Tìm kiếm đơn hàng**: Tìm kiếm nhanh theo SĐT, Tên khách, Mã đơn.
- **Quản lý Menu, Banner & Cài đặt**: Thêm/sửa/xóa món, thay đổi banner carousel, cài đặt tài khoản ngân hàng nhận tiền QR.

---

## 🛠️ Cấu trúc dự án
- `index.html`: Giao diện chính cho cả Khách hàng và Admin Panel (bảo vệ bằng mã PIN bảo mật).
- `app.js`: Toàn bộ logic frontend, giỏ hàng, bộ lọc đơn hàng, chuông thông báo Web Audio API.
- `api.php`: Backend PHP xử lý đơn hàng, lưu trữ dữ liệu dạng JSON.
- `webhook.php`: Tích hợp webhook tự động xác nhận thanh toán.
- `logo.jpg`: Logo thương hiệu The 30.

---

&copy; 2026 The 30 - Coffee & Tea. Phát triển và triển khai bởi tin-trung.
