const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');

// @desc    Get medical dashboard stats
// @route   GET /api/medical/dashboard
// @access  Private/Medical
exports.getDashboard = async (req, res, next) => {
  try {
    const totalMedicines = await Medicine.countDocuments();
    const pendingPrescriptionsCount = await Prescription.countDocuments({ status: { $in: ['PENDING', 'IN_PROGRESS'] } });
    
    // Low stock: assuming threshold is 20
    const lowStockCount = await Medicine.countDocuments({ stockQuantity: { $lt: 20 } });
    
    // Dispensed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dispensedToday = await Prescription.countDocuments({
      status: 'DISPENSED',
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const pendingPrescriptions = await Prescription.find({ status: { $in: ['PENDING', 'IN_PROGRESS'] } })
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'fullName' } })
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedPending = pendingPrescriptions.map(p => ({
      _id: p._id,
      patient: p.patient?.user?.fullName || 'Unknown',
      doctor: p.doctor?.user?.fullName || 'Unknown',
      time: p.createdAt ? new Date(p.createdAt).toLocaleString() : 'N/A',
      status: p.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending'
    }));

    const lowStockItems = await Medicine.find({ stockQuantity: { $lt: 20 } })
      .sort({ stockQuantity: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalMedicines,
          pendingPrescriptions: pendingPrescriptionsCount,
          lowStock: lowStockCount,
          dispensedToday
        },
        pendingPrescriptions: formattedPending,
        lowStockItems: lowStockItems.map(m => ({
          _id: m._id,
          name: m.name,
          stock: m.stockQuantity,
          unit: m.dosageForm || 'Units',
          min: 20 // Default threshold
        }))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all medicines (inventory)
// @route   GET /api/medical/inventory
// @access  Private/Medical
exports.getInventory = async (req, res, next) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 });
    
    const formattedMedicines = medicines.map(m => {
      let status = 'In Stock';
      if (m.stockQuantity === 0) status = 'Out of Stock';
      else if (m.stockQuantity < 20) status = 'Low Stock';
      
      return {
        _id: m._id,
        name: m.name,
        brand: m.category || 'Generic',
        category: m.category || 'General',
        stock: m.stockQuantity,
        unit: m.dosageForm || 'Units',
        price: `₹${m.price || 0}`,
        status
      };
    });

    res.status(200).json({ success: true, data: formattedMedicines });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all prescriptions
// @route   GET /api/medical/prescriptions
// @access  Private/Medical
exports.getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find()
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'fullName' } })
      .sort({ createdAt: -1 });

    const formattedPrescriptions = prescriptions.map(p => ({
      _id: p._id,
      patient: p.patient?.user?.fullName || 'Unknown',
      doctor: p.doctor?.user?.fullName || 'Unknown',
      date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
      status: p.status === 'IN_PROGRESS' ? 'In Progress' : (p.status === 'DISPENSED' ? 'Dispensed' : 'Pending'),
      items: p.items ? p.items.length : 0
    }));

    res.status(200).json({ success: true, data: formattedPrescriptions });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add new medicine to inventory
// @route   POST /api/medical/inventory
// @access  Private/Medical
exports.addMedicine = async (req, res, next) => {
  try {
    const { name, brand, category, stock, unit, price, expiryDate, description } = req.body;

    const medicine = await Medicine.create({
      name,
      category: category || brand,
      dosageForm: unit || 'Tablets',
      stockQuantity: parseInt(stock) || 0,
      price: parseFloat(price) || 0,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      description,
    });

    res.status(201).json({ success: true, data: medicine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete medicine from inventory
// @route   DELETE /api/medical/inventory/:id
// @access  Private/Medical
exports.deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({ success: false, error: 'Medicine not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
