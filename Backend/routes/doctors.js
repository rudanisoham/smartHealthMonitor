const express = require('express');
const {
  getDashboard,
  getDoctorProfile,
  updateDoctorProfile,
  createDoctorProfile,
  getDoctorAppointments,
  getDoctorPatients,
  getPatientDetails,
  createPrescription,
  getDoctorPrescriptions,
  getLabReports,
  updateLabReport
} = require('../controllers/doctors');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all doctor routes, and require DOCTOR role
router.use(protect);
router.use(authorize('DOCTOR', 'ADMIN'));

router.route('/dashboard').get(getDashboard);

router.route('/')
  .post(createDoctorProfile);

router.route('/profile')
  .get(getDoctorProfile)
  .put(updateDoctorProfile);

router.route('/appointments')
  .get(getDoctorAppointments);

router.route('/patients')
  .get(getDoctorPatients);

router.route('/patients/:id')
  .get(getPatientDetails);

router.route('/prescriptions')
  .get(getDoctorPrescriptions)
  .post(createPrescription);

router.route('/lab-reports')
  .get(getLabReports);

router.route('/lab-reports/:id')
  .put(updateLabReport);

module.exports = router;
