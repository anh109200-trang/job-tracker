// src/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

const { requireAuth } = require('../middlewares/authMiddleware');



router.get('/', requireAuth, jobController.getHomePage);

router.get('/auth/login', jobController.getLoginPage);
router.get('/auth/register', jobController.getRegisterPage);

router.post('/auth/login', jobController.handleAuth);
router.post('/auth/register', jobController.handleAuth);


router.post('/auth', jobController.handleAuth); 


router.post('/jobs', requireAuth, jobController.createJob);
router.post('/jobs/create', requireAuth, jobController.createJob);

router.post('/jobs/update-status/:id', requireAuth, jobController.updateJobStatus);


router.post('/jobs/update-info/:id', requireAuth, jobController.updateJobInfo);



router.get('/jobs/delete/:id', requireAuth, jobController.deleteJob);

module.exports = router;