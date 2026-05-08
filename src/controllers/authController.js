let users = []; 
let currentUser = null; 

exports.handleAuth = (req, res) => {
    // THÊM: Lấy thêm email và re_password từ body
    const { action, username, password, email, re_password } = req.body;

    if (action === 'register') {
        // THÊM: Kiểm tra khớp mật khẩu
        if (password !== re_password) {
            console.log("Mật khẩu không khớp!");
            return res.redirect('/'); // Quay lại trang chủ để nhập lại
        }
        
        // Cập nhật logic lưu trữ: Thêm email vào object user
        users.push({ username, password, email });
        currentUser = username; 
        console.log("Đăng ký mới thành công:", username, email);

    } else if (action === 'login') {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = username;
            console.log("Đăng nhập thành công:", username);
        } else {
            console.log("Sai tài khoản hoặc mật khẩu!");
        }
    } else if (action === 'logout') {
        currentUser = null;
    }
    
    res.redirect('/');
};

exports.getHomePageData = () => {
    return currentUser;
};

// Đảm bảo hàm này truyền đúng dữ liệu currentUser vào index.ejs
exports.getHomePage = (req, res) => {
    // Sử dụng getHomePageData() để lấy trạng thái mới nhất
    const user = exports.getHomePageData(); 
    res.render('index', { 
        jobs: typeof jobs !== 'undefined' ? jobs : [], // Tránh lỗi nếu biến jobs chưa định nghĩa
        user: user 
    });
};