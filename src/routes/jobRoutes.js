const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getHomePage);
router.post('/auth', jobController.handleAuth);
router.post('/jobs', jobController.createJob);

// Routes mới cho Xóa và Sửa
router.post('/jobs/delete/:id', jobController.deleteJob);
router.post('/jobs/update/:id', jobController.updateJobStatus);
// Thêm dòng này vào jobRoutes.js
router.post('/jobs/update-info/:id', jobController.updateJobInfo);
module.exports = router;