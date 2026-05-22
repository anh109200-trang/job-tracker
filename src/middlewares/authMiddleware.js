

const requireAuth = (req, res, next) => {
   
    const controllerPath = '../controllers/jobController';
    let currentUser = null;
    
    try {
        const jobController = require(controllerPath);
        currentUser = jobController.currentUser;
    } catch (e) {
        console.error("Lỗi đọc trạng thái đăng nhập:", e);
    }

    if (currentUser) {
        // Nếu đã đăng nhập, cho phép đi tiếp
        next();
    } else {

        console.log("⚠️ Truy cập bị chặn: Vui lòng đăng nhập trước!");
        res.redirect('/auth/login');
    }
};

module.exports = { requireAuth };