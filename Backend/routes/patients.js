const express = require('express');
const { 
  getPatients, 
  getPatient, 
  createPatient, 
  getPatientMe, 
  updatePatientMe,
  getAvailableDoctors,
  getDoctorProfile,
  getMyPrescriptions,
  getBillingData
} = require('../controllers/patients');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('ADMIN', 'DOCTOR', 'RECEPTIONIST'), getPatients)
  .post(authorize('ADMIN', 'RECEPTIONIST'), createPatient);

router.get('/me', getPatientMe);
router.put('/me', updatePatientMe);

// Routes for patients to interact with data
router.get('/doctors', getAvailableDoctors);
router.get('/doctors/:id', getDoctorProfile);
router.get('/prescriptions', getMyPrescriptions);
router.get('/billing', getBillingData);

router.route('/:id')
  .get(getPatient);

module.exports = router;
