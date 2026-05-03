const express = require('express');
const { getReports, getReport } = require('../controllers/reports');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getReports);

router.route('/:id')
  .get(getReport);

module.exports = router;
