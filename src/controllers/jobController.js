const Job = require('../models/Job');

// Biến tạm để quản lý login
let users = []; 
let currentUser = null; 

// 1. Xử lý Authentication (Đăng ký, Đăng nhập, Đăng xuất)
exports.handleAuth = (req, res) => {
    const { action, username, password, email, re_password } = req.body;

    if (action === 'register') {
        if (password !== re_password) {
            console.log("Mật khẩu không khớp!");
            return res.redirect('/');
        }
        users.push({ username, password, email });
        currentUser = username; 
        console.log("Đăng ký mới thành công:", username);

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

// 2. Hiển thị trang chủ (READ)
exports.getHomePage = async (req, res) => {
    try {
        // 1. Cấu hình phân trang
        const resPerPage = 5; // Mỗi trang hiển thị 5 bản ghi
        const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ URL (?page=1), mặc định là 1

        let userJobs = [];
        let totalJobs = 0;

        if (currentUser) {
            // 2. Đếm tổng số job của người dùng này để tính tổng số trang
            totalJobs = await Job.countDocuments({ owner: currentUser });

            // 3. Lấy dữ liệu theo trang
            userJobs = await Job.find({ owner: currentUser })
                .sort({ createdAt: -1 })
                .skip((resPerPage * page) - resPerPage) // Bỏ qua các bản ghi của trang trước
                .limit(resPerPage); // Giới hạn số lượng bản ghi mỗi trang
        }
        
        res.render('index', { 
            jobs: userJobs, 
            user: currentUser,
            currentPage: page,
            pages: Math.ceil(totalJobs / resPerPage) // Tính tổng số trang
        });
    } catch (err) {
        console.error("Lỗi phân trang:", err);
        res.status(500).send("Lỗi server");
    }
};

// 3. Thêm công việc mới (CREATE)
exports.createJob = async (req, res) => {
    const { title, company, applicantName, phone, address } = req.body; 
    
    if (!currentUser) return res.redirect('/');

    try {
        await Job.create({
            title,
            company,
            applicantName,
            phone,
            address,
            owner: currentUser,
            status: 'Đang chờ'
        });
        console.log("Đã lưu công việc mới thành công!");
    } catch (err) {
        console.error("Lỗi khi thêm job:", err);
    }
    res.redirect('/');
};

// 4. Xóa công việc (DELETE)
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await Job.findByIdAndDelete(id);
        console.log("Đã xóa job ID:", id);
    } catch (err) {
        console.error("Lỗi khi xóa job:", err);
    }
    res.redirect('/');
};

// 5. Cập nhật TRẠNG THÁI (Dành cho ô Select trong bảng)
exports.updateJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Job.findByIdAndUpdate(id, { status });
        console.log("Đã cập nhật trạng thái mới!");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

// 6. Cập nhật THÔNG TIN CHI TIẾT (Dành cho Modal sửa thông tin)
exports.updateJobInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, applicantName, phone, address } = req.body;
        
        await Job.findByIdAndUpdate(id, { 
            title, company, applicantName, phone, address 
        });
        
        console.log("Đã cập nhật thông tin chi tiết!");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};