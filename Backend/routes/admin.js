const express = require('express');
const {
  getDashboard,
  getDoctors,
  getPendingDoctors,
  approveDoctor,
  getPatients,
  deletePatient,
  addStaff,
  getStaff,
  deleteStaff,
  addPatient,
  getDepartments,
  addDepartment,
  deleteDepartment,
  getSystemLogs,
  getReports
} = require('../controllers/admin');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all admin routes, and require ADMIN role
router.use(protect);
router.use(authorize('ADMIN'));

router.route('/dashboard').get(getDashboard);
router.route('/logs').get(getSystemLogs);
router.route('/reports').get(getReports);

router.route('/doctors').get(getDoctors);
router.route('/doctors/pending').get(getPendingDoctors);
router.route('/doctors/:id/approve').put(approveDoctor);

router.route('/patients').get(getPatients).post(addPatient);

router.route('/patients/:id').delete(deletePatient);

router.route('/staff').post(addStaff);

router.route('/departments').get(getDepartments).post(addDepartment);
router.route('/departments/:id').delete(deleteDepartment);

module.exports = router;
