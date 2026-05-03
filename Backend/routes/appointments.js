const express = require('express');
const { getAppointments, getAppointment, createAppointment } = require('../controllers/appointments');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointment);

module.exports = router;
