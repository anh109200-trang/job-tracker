const Job = require('../models/Job');

// Nhúng các file render giao diện JS thuần kết hợp Tailwind
const renderLayout = require('../views/layout');
const renderIndex = require('../views/index');
const renderLogin = require('../views/login');
const renderRegister = require('../views/register');

let users = []; 
let currentUser = null; 



exports.handleAuth = (req, res) => {
    // Lấy dữ liệu từ Form gửi lên
    const { action, username, password, email, re_password } = req.body;
    
    // Đồng bộ định danh: Form đăng nhập dùng ô "Địa chỉ Email" (name="email") hoặc 'username'
    const loginIdentifier = email || username;

    if (action === 'register') {
        if (password !== re_password) {
            console.log("❌ Mật khẩu nhập lại không khớp!");
            return res.redirect('/auth/register');
        }
        
        // MẸO: Nếu lúc đăng ký họ không nhập username, lấy luôn phần chữ trước dấu @ của Email làm Username
        const finalUsername = username || (email ? email.split('@')[0] : 'User');

        // Lưu thông tin đăng ký mới vào mảng tạm
        users.push({ 
            username: finalUsername, 
            password: password, 
            email: email 
        });
        
        console.log(`📝 Đăng ký thành công! Username: ${finalUsername} | Email: ${email}`);
        return res.redirect('/auth/login'); 

    } else if (action === 'login' || !action) { 
        console.log(`🔑 Đang thử đăng nhập với định danh: ${loginIdentifier}`);

        // Tìm tài khoản khớp với Email HOẶC Username và đúng Mật khẩu
        const user = users.find(u => 
            (u.email === loginIdentifier || u.username === loginIdentifier) && u.password === password
        );
        
        if (user) {
            // Đăng nhập thành công -> Lưu tên hiển thị (Chắc chắn không bị undefined)
            currentUser = user.username; 
            console.log("✅ Đăng nhập thành công, chào mừng:", currentUser);
            return res.redirect('/'); // Điều hướng về trang chủ chính
        } else {
            console.log("❌ Đăng nhập thất bại: Sai tài khoản, email hoặc mật khẩu!");
            currentUser = null; 
            return res.redirect('/auth/login'); // Load lại trang đăng nhập
        }
        
    } else if (action === 'logout') {
        currentUser = null;
        console.log("🔒 Đã đăng xuất tài khoản.");
        return res.redirect('/auth/login');
    }

    // Phòng hờ treo trang
    res.redirect('/');
};

exports.getHomePage = async (req, res) => {
    try {
        const resPerPage = 5; 
        const page = parseInt(req.query.page) || 1; 

        let userJobs = [];
        let totalJobs = 0;

        // Nếu đã có người dùng đăng nhập, tìm kiếm công việc thuộc sở hữu của người đó
        if (currentUser) {
            totalJobs = await Job.countDocuments({ owner: currentUser });
            userJobs = await Job.find({ owner: currentUser })
                .sort({ createdAt: -1 })
                .skip((resPerPage * page) - resPerPage) 
                .limit(resPerPage); 
        }
        
        // Tạo chuỗi HTML giao diện danh sách bảng
        const indexContent = renderIndex(userJobs, page, Math.ceil(totalJobs / resPerPage));
        
        // TRUYỀN BIẾN currentUser VÀO THAM SỐ THỨ HAI CỦA LAYOUT
        const fullHtml = renderLayout(indexContent, currentUser);
        
        res.send(fullHtml);

    } catch (err) {
        console.error("Lỗi tải trang chủ:", err);
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
// Thêm hàm này vào file src/controllers/jobController.js
exports.updateJobInfo = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, company, candidateName, phone, location } = req.body;

        // Tiến hành cập nhật thông tin mới vào MongoDB theo ID
        await Job.findByIdAndUpdate(jobId, {
            title: title,
            company: company,
            candidateName: candidateName,
            phone: phone,
            location: location
        });

        console.log(`✏️ Đã cập nhật thông tin công việc ID: ${jobId}`);
        res.redirect('/'); // Cập nhật xong đưa người dùng quay lại trang chủ luôn

    } catch (err) {
        console.error("❌ Lỗi khi cập nhật thông tin công việc:", err);
        res.status(500).send("Lỗi server không thể cập nhật dữ liệu.");
    }
};

// --- BỔ SUNG ROUTE GET CHO TRANG LOGIN VÀ REGISTER ---
exports.getLoginPage = (req, res) => {
    if (currentUser) return res.redirect('/');
    const loginContent = renderLogin();
    res.send(renderLayout(loginContent, null));
};

exports.getRegisterPage = (req, res) => {
    if (currentUser) return res.redirect('/');
    const registerContent = renderRegister();
    res.send(renderLayout(registerContent, null));
};

module.exports = {
    getHomePage: exports.getHomePage,
    getLoginPage: exports.getLoginPage,
    getRegisterPage: exports.getRegisterPage,
    handleAuth: exports.handleAuth,
    createJob: exports.createJob,
    updateJobStatus: exports.updateJobStatus,
    updateJobInfo: exports.updateJobInfo,
    deleteJob: exports.deleteJob,
    
    // Hàm getter để lấy giá trị thực tế của currentUser bất cứ lúc nào file khác cần gọi
    get currentUser() {
        return currentUser;
    }
};