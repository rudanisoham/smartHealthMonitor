const express = require('express');
const { getVitals, createVital } = require('../controllers/vitals');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getVitals)
  .post(createVital);

module.exports = router;
