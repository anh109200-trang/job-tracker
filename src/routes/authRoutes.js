const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Khi người dùng truy cập http://localhost:3000/auth bằng trình duyệt
router.get('/', authController.getHomePage); 

// KHI NGƯỜI DÙNG NHẤN NÚT (POST dữ liệu)
// Nếu form của bạn là <form action="/auth" method="POST"> thì code dưới đây là đúng
router.post('/', authController.handleAuth); 

module.exports = router;