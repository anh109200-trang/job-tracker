// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// 1. Phải import ĐẦY ĐỦ cả 2 controller ở đầu file
const authController = require('../controllers/authController');
const jobController = require('../controllers/jobController'); 

// 2. Định tuyến cho trang chủ ứng dụng
router.get('/', jobController.getHomePage);
router.post('/', jobController.handleAuth);

// 3. SỬA LẠI ĐƯỜNG DẪN: Bỏ chữ '/auth' đi vì đã có prefix từ app.js
router.get('/login', jobController.getLoginPage);
router.get('/register', jobController.getRegisterPage);

module.exports = router;