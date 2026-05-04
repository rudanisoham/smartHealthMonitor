const express = require('express');
const {
  getDashboard,
  getDoctors,
  getPendingDoctors,
  approveDoctor,
  getPatients,
  getPatientById,
  deletePatient,
  addStaff,
  getStaff,
  deleteStaff,
  addPatient,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  addDepartment,
  deleteDepartment,
  getSystemLogs,
  getReports,
  getReportById,
  getAnalytics,
  getFeedback,
  getFeedbackById,
  replyFeedback,
  getSettings,
  updateSettings,
  getReviews,
  getMessages,
  sendBroadcast,
  getBroadcasts
} = require('../controllers/admin');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all admin routes, and require ADMIN role
router.use(protect);
router.use(authorize('ADMIN'));

router.route('/dashboard').get(getDashboard);
router.route('/logs').get(getSystemLogs);
router.route('/reports').get(getReports);
router.route('/reports/:id').get(getReportById);
router.route('/analytics').get(getAnalytics);

router.route('/doctors').get(getDoctors);
router.route('/doctors/pending').get(getPendingDoctors);
router.route('/doctors/:id/approve').put(approveDoctor);

router.route('/patients').get(getPatients).post(addPatient);
router.route('/patients/:id').get(getPatientById).delete(deletePatient);

router.route('/staff').get(getStaff).post(addStaff);
router.route('/staff/:id').delete(deleteStaff);

router.route('/departments').get(getDepartments).post(addDepartment);
router.route('/departments/:id')
  .get(getDepartmentById)
  .put(updateDepartment)
  .delete(deleteDepartment);

router.route('/feedback').get(getFeedback);
router.route('/feedback/:id').get(getFeedbackById);
router.route('/feedback/:id/reply').put(replyFeedback);

router.route('/settings').get(getSettings).put(updateSettings);

router.route('/reviews').get(getReviews);

router.route('/messages').get(getMessages);

router.route('/broadcast').get(getBroadcasts).post(sendBroadcast);

module.exports = router;
