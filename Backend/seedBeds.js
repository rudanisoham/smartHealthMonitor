const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Department = require('./models/Department');
const Bed = require('./models/Bed');

dotenv.config();

const seedBeds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const departments = await Department.find();
    
    if (departments.length === 0) {
      console.log('No departments found. Please seed departments first.');
      process.exit();
    }

    // Clear existing beds
    await Bed.deleteMany();
    console.log('Existing beds cleared.');

    const beds = [];
    const bedTypes = ['NORMAL', 'ICU'];

    departments.forEach((dept, index) => {
      // Add 10 beds per department
      for (let i = 1; i <= 10; i++) {
        const type = i <= 2 ? 'ICU' : 'NORMAL'; // First 2 beds are ICU
        const bedNumber = `${dept.name.substring(0, 3).toUpperCase()}-${i.toString().padStart(2, '0')}`;
        
        beds.push({
          bedNumber,
          type,
          status: 'AVAILABLE',
          department: dept._id,
          dailyCharge: type === 'ICU' ? 2500 : 800
        });
      }
    });

    await Bed.insertMany(beds);
    console.log(`${beds.length} beds seeded successfully!`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedBeds();
