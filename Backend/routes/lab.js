const express = require('express');
const { getDashboard, getTests, createTest, getHistory } = require('../controllers/lab');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all lab routes
router.use(protect);

// Adjust roles based on your application setup.
router.use(authorize('ADMIN', 'DOCTOR', 'LAB_STAFF'));

router.route('/dashboard').get(getDashboard);
router.route('/tests').get(getTests).post(createTest);
router.route('/history').get(getHistory);

module.exports = router;
