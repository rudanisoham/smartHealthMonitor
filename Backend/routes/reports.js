const express = require('express');
const { getReports, getReport, createReport, updateReport } = require('../controllers/reports');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getReports)
  .post(authorize('ADMIN', 'DOCTOR', 'MEDICAL_STAFF', 'LAB_STAFF'), createReport);

router.route('/:id')
  .get(getReport)
  .put(authorize('ADMIN', 'LAB_STAFF', 'DOCTOR'), updateReport);

module.exports = router;
