const express = require('express');
const app = express();
const path = require('path');
const jobRoutes = require('./src/routes/jobRoutes');

const PORT = 3000;

const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/jobtracker_db';

mongoose.connect(mongoURI)
    .then(() => console.log('🚀 Đã kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', jobRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`);
});