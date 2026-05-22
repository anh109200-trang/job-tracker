// controllers/authController.js

// Import các file giao diện JS thuần đã bóc tách
const renderLayout = require('../views/layout');
const renderIndex = require('../views/index');
const renderLogin = require('../views/login');
const renderRegister = require('../views/register');

// Giả lập Database bằng bộ nhớ tạm thời
let users = []; 
let currentUser = null; // null nếu chưa đăng nhập, lưu object user { name, email } nếu đã đăng nhập

// ==========================================
// 1. CÁC ROUTE HIỂN THỊ GIAO DIỆN (GET)
// ==========================================

// Hiển thị Trang chủ (Dashboard)
exports.getHomePage = (req, res) => {
    const indexContent = renderIndex();
    // Đút giao diện trang chủ vào layout chung và truyền biến currentUser
    const html = renderLayout(indexContent, currentUser);
    res.send(html);
};

// Hiển thị Trang đăng nhập
exports.getLoginPage = (req, res) => {
    // Nếu người dùng đã đăng nhập rồi, không cho vào trang login nữa mà đẩy về trang chủ
    if (currentUser) return res.redirect('/');

    const loginContent = renderLogin();
    const html = renderLayout(loginContent, null);
    res.send(html);
};

// Hiển thị Trang đăng ký
exports.getRegisterPage = (req, res) => {
    // Nếu người dùng đã đăng nhập rồi, đẩy về trang chủ
    if (currentUser) return res.redirect('/');

    const registerContent = renderRegister();
    const html = renderLayout(registerContent, null);
    res.send(html);
};

// ==========================================
// 2. CÁC ROUTE XỬ LÝ LOGIC NGHIỆP VỤ (POST)
// ==========================================

// Xử lý Đăng ký tài khoản mới
exports.handleRegister = (req, res) => {
    const { name, email, password } = req.body;

    // Kiểm tra xem email này đã tồn tại trong hệ thống chưa
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        console.log("Email này đã được đăng ký!");
        return res.redirect('/auth/register'); // Đăng ký lỗi, tải lại trang đăng ký
    }

    // Lưu người dùng mới vào mảng
    const newUser = { name, email, password };
    users.push(newUser);
    
    // Đăng ký xong tự động đăng nhập luôn
    currentUser = newUser; 
    console.log("Đăng ký thành công tài khoản:", email);
    
    res.redirect('/'); // Đẩy về trang chủ dashboard
};

// Xử lý Đăng nhập
exports.handleLogin = (req, res) => {
    const { email, password } = req.body;

    // Tìm user khớp cả email và password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user; // Gán user hiện tại
        console.log("Đăng nhập thành công:", email);
        res.redirect('/'); // Về trang chủ dashboard
    } else {
        console.log("Sai tài khoản hoặc mật khẩu!");
        res.redirect('/auth/login'); // Sai thông tin, tải lại trang đăng nhập
    }
};

// Xử lý Đăng xuất
exports.handleLogout = (req, res) => {
    currentUser = null; // Xóa trạng thái đăng nhập
    console.log("Đã đăng xuất tài khoản.");
    res.redirect('/auth/login'); // Đăng xuất xong đẩy thẳng ra trang login
};