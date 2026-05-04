const express = require('express');
const {
  getDashboard,
  getAppointments,
  assignAppointment,
  cancelAppointment,
  getPatients,
  getDoctors,
  updatePatient,
  deletePatient,
  getBedStats,
  getBilling
} = require('../controllers/reception');

const {
  getBedsOverview,
  getBedsByDepartment,
  assignBed,
  releaseBed,
  updateCharges
} = require('../controllers/bedManagement');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Protect all reception routes
router.use(protect);
router.use(authorize('RECEPTIONIST', 'ADMIN'));

router.route('/dashboard').get(getDashboard);
router.route('/appointments').get(getAppointments);
router.route('/appointments/:id/assign').put(assignAppointment);
router.route('/appointments/:id/cancel').put(cancelAppointment);
router.route('/patients').get(getPatients);
router.route('/patients/:id').put(updatePatient).delete(deletePatient);
router.route('/doctors').get(getDoctors);
router.route('/beds').get(getBedsOverview);
router.route('/beds/department/:id').get(getBedsByDepartment);
router.route('/beds/:id/assign').post(assignBed);
router.route('/beds/:id/release').post(releaseBed);
router.route('/beds/charges').put(updateCharges);

router.route('/billing').get(getBilling);

module.exports = router;
