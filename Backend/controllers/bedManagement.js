const Bed = require('../models/Bed');
const BedStay = require('../models/BedStay');
const Department = require('../models/Department');
const Patient = require('../models/Patient');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get beds overview (by department)
// @route   GET /api/reception/beds/overview
// @access  Private/Receptionist
exports.getBedsOverview = async (req, res, next) => {
  try {
    const departments = await Department.find();
    
    const bedStats = await Promise.all(departments.map(async (dept) => {
      const beds = await Bed.find({ department: dept._id });
      const total = beds.length || 10; // Fallback for demo
      const occupied = beds.filter(b => b.status === 'OCCUPIED').length;
      const available = beds.filter(b => b.status === 'AVAILABLE').length;
      
      return {
        _id: dept._id,
        name: dept.name,
        total,
        occupied,
        available,
        pct: total > 0 ? Math.round((occupied / total) * 100) : 0
      };
    }));

    res.status(200).json({
      success: true,
      data: bedStats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get beds by department
// @route   GET /api/reception/beds/department/:id
// @access  Private/Receptionist
exports.getBedsByDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    const beds = await Bed.find({ department: req.params.id })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName email' }
      });

    res.status(200).json({
      success: true,
      data: {
        department,
        beds
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Assign patient to bed
// @route   POST /api/reception/beds/:id/assign
// @access  Private/Receptionist
exports.assignBed = async (req, res, next) => {
  try {
    const { patientId } = req.body;
    const mongoose = require('mongoose');
    
    console.log('Assignment request:', { bedId: req.params.id, patientId });

    if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ success: false, error: 'Invalid or missing Patient ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: 'Invalid Bed ID' });
    }

    const bed = await Bed.findById(req.params.id);
    if (!bed) {
      return res.status(404).json({ success: false, error: 'Bed not found' });
    }

    if (bed.status !== 'AVAILABLE') {
      return res.status(400).json({ success: false, error: `Bed is ${bed.status}, not AVAILABLE` });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    // Check for existing active stay - using a more direct query
    const activeStay = await BedStay.findOne({ patient: patientId, status: 'ACTIVE' });
    if (activeStay) {
      return res.status(400).json({ success: false, error: 'Patient already has an active bed assignment' });
    }

    const now = new Date();

    // 1. Update Bed Status
    const updatedBed = await Bed.findByIdAndUpdate(req.params.id, {
      status: 'OCCUPIED',
      patient: patientId,
      assignedAt: now
    }, { new: true });

    // 2. Create BedStay Record
    try {
      await BedStay.create({
        patient: patientId,
        bed: bed._id,
        bedNumber: bed.bedNumber,
        assignedAt: now,
        dailyCharge: bed.dailyCharge || 500,
        status: 'ACTIVE'
      });
    } catch (stayErr) {
      // Rollback bed status if stay creation fails
      await Bed.findByIdAndUpdate(req.params.id, {
        status: 'AVAILABLE',
        patient: null,
        assignedAt: null
      });
      throw stayErr;
    }

    console.log('Assignment successful');
    res.status(200).json({ success: true, data: updatedBed });
  } catch (err) {
    console.error('CRITICAL: assignBed Error:', err);
    res.status(500).json({ success: false, error: err.message || 'Server Error' });
  }
};

// @desc    Release bed
// @route   POST /api/reception/beds/:id/release
// @access  Private/Receptionist
exports.releaseBed = async (req, res, next) => {
  try {
    const Payment = require('../models/Payment');
    const bed = await Bed.findById(req.params.id);

    if (!bed) {
      return res.status(404).json({ success: false, error: 'Bed not found' });
    }

    if (bed.status !== 'OCCUPIED') {
      return res.status(400).json({ success: false, error: 'Bed is not occupied' });
    }

    const patientId = bed.patient;

    // Find the active BedStay
    const bedStay = await BedStay.findOne({
      bed: bed._id,
      patient: patientId,
      status: 'ACTIVE'
    });

    const releasedAt = new Date();
    let finalBill = 0;
    let stayDuration = 0;

    if (bedStay) {
      // Calculate duration in days (minimum 1 day)
      const diffTime = Math.abs(releasedAt - bedStay.assignedAt);
      stayDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      finalBill = stayDuration * bedStay.dailyCharge;

      bedStay.releasedAt = releasedAt;
      bedStay.status = 'COMPLETED';
      bedStay.totalBill = finalBill;
      await bedStay.save();

      // Create a pending payment record
      await Payment.create({
        patient: patientId,
        amount: finalBill,
        type: 'DEBIT',
        description: `Bed Charges: ${bed.bedNumber} (${bed.type}) for ${stayDuration} day(s)`,
        status: 'PENDING',
        method: 'CASH' // Default for manual release
      });
    }

    // Update Bed
    bed.status = 'AVAILABLE';
    bed.patient = null;
    bed.assignedAt = null;
    await bed.save();

    console.log(`Bed ${bed.bedNumber} released. Duration: ${stayDuration} days. Bill: ₹${finalBill}`);

    res.status(200).json({ 
      success: true, 
      message: 'Bed released successfully',
      data: {
        bill: finalBill,
        days: stayDuration,
        bedNumber: bed.bedNumber
      }
    });
  } catch (err) {
    console.error('releaseBed Error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update bed charges
// @route   PUT /api/reception/beds/charges
// @access  Private/Receptionist
exports.updateCharges = async (req, res, next) => {
  try {
    const { normalCharge, icuCharge } = req.body;

    if (normalCharge) {
      await Bed.updateMany({ type: 'NORMAL' }, { dailyCharge: normalCharge });
    }
    if (icuCharge) {
      await Bed.updateMany({ type: 'ICU' }, { dailyCharge: icuCharge });
    }

    res.status(200).json({ success: true, message: 'Charges updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
