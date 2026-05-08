const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    // THÊM CÁC TRƯỜNG MỚI Ở ĐÂY:
    applicantName: { type: String }, // Họ tên người ứng tuyển
    phone: { type: String },         // Số điện thoại
    address: { type: String },       // Địa chỉ
    
    status: { 
        type: String, 
        enum: ['Đang chờ', 'Phỏng vấn', 'Đã đậu', 'Từ chối'], 
        default: 'Đang chờ' 
    },
    owner: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);