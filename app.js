const express = require('express');
const app = express();
const path = require('path');
const jobRoutes = require('./src/routes/jobRoutes');

const PORT = 3000;

const mongoose = require('mongoose');

// Thay đổi URL bên dưới nếu bạn dùng MongoDB Atlas hoặc tên DB khác
const mongoURI = 'mongodb://127.0.0.1:27017/jobtracker_db';

mongoose.connect(mongoURI)
    .then(() => console.log('🚀 Đã kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
// 1. Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// 2. Middleware giải mã dữ liệu (PHẢI TRƯỚC ROUTES)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Sử dụng Routes
app.use('/', jobRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`);
});