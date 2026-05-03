const express = require('express');
const { 
  getDashboard, 
  getAppointments, 
  assignAppointment, 
  getPatients, 
  getDoctors,
  updatePatient,
  deletePatient,
  getBedStats,
  getBilling
} = require('../controllers/reception');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all reception routes, and require RECEPTIONIST role
router.use(protect);
router.use(authorize('RECEPTIONIST', 'ADMIN'));

router.route('/dashboard').get(getDashboard);
router.route('/appointments').get(getAppointments);
router.route('/appointments/:id/assign').put(assignAppointment);
router.route('/patients').get(getPatients);
router.route('/patients/:id').put(updatePatient).delete(deletePatient);
router.route('/doctors').get(getDoctors);
router.route('/beds').get(getBedStats);
router.route('/billing').get(getBilling);

module.exports = router;
