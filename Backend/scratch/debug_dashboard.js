const mongoose = require('mongoose');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Vital = require('../models/Vital');

async function debugData() {
    await mongoose.connect('mongodb://localhost:27017/smartHealthMonitor');
    
    // Find the user rudanisoham@gmail.com (likely the active one)
    const user = await User.findOne({ email: 'rudanisoham@gmail.com' });
    if (!user) {
        console.log('User not found');
        process.exit(1);
    }
    
    const patient = await Patient.findOne({ user: user._id });
    console.log('Patient profile:', patient ? 'Found' : 'Not found');
    
    const vitals = await Vital.find({ patient: patient?._id }).sort('-createdAt');
    console.log('Vitals count:', vitals.length);
    if (vitals.length > 0) {
        console.log('Latest vital risk:', vitals[0].riskLevel);
        console.log('Latest vital heartRate:', vitals[0].heartRate);
    }
    
    process.exit(0);
}

debugData().catch(console.error);
