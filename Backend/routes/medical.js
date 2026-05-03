const express = require('express');
const { getDashboard, getInventory, getPrescriptions, addMedicine, deleteMedicine } = require('../controllers/medical');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('ADMIN', 'PHARMACIST', 'DOCTOR', 'RECEPTIONIST', 'MEDICAL_STAFF'));

router.route('/dashboard').get(getDashboard);
router.route('/inventory').get(getInventory).post(addMedicine);
router.route('/inventory/:id').delete(deleteMedicine);
router.route('/prescriptions').get(getPrescriptions);

module.exports = router;
