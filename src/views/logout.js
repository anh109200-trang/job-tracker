exports.logout = (req, res) => {
    // 1. Thực hiện xóa Session / xóa Cookie Token ở đây...
    
    // 2. Chuyển hướng thẳng người dùng về trang login
    res.redirect('/auth/login'); 
};