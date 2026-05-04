const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
require('dotenv').config();

const medicines = [
  { name: 'Paracetamol', category: 'Analgesic', dosageForm: 'Tablet', stockQuantity: 500, price: 5, description: 'Fever and pain relief' },
  { name: 'Amoxicillin', category: 'Antibiotic', dosageForm: 'Capsule', stockQuantity: 200, price: 15, description: 'Bacterial infections' },
  { name: 'Ibuprofen', category: 'Analgesic', dosageForm: 'Tablet', stockQuantity: 300, price: 8, description: 'Anti-inflammatory' },
  { name: 'Cetirizine', category: 'Antihistamine', dosageForm: 'Tablet', stockQuantity: 150, price: 10, description: 'Allergy relief' },
  { name: 'Azithromycin', category: 'Antibiotic', dosageForm: 'Tablet', stockQuantity: 100, price: 45, description: 'Bacterial infections' },
  { name: 'Metformin', category: 'Antidiabetic', dosageForm: 'Tablet', stockQuantity: 400, price: 12, description: 'Type 2 Diabetes' },
  { name: 'Amlodipine', category: 'Antihypertensive', dosageForm: 'Tablet', stockQuantity: 250, price: 20, description: 'High blood pressure' },
  { name: 'Atorvastatin', category: 'Antilipemic', dosageForm: 'Tablet', stockQuantity: 180, price: 35, description: 'High cholesterol' },
  { name: 'Omeprazole', category: 'Antacid', dosageForm: 'Capsule', stockQuantity: 220, price: 18, description: 'Acid reflux' },
  { name: 'Salbutamol', category: 'Bronchodilator', dosageForm: 'Inhaler', stockQuantity: 50, price: 150, description: 'Asthma/COPD' }
];

const seedMedicines = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    // Add only if not exists to avoid duplicates
    for (const med of medicines) {
      const exists = await Medicine.findOne({ name: med.name });
      if (!exists) {
        await Medicine.create(med);
        console.log(`Added: ${med.name}`);
      } else {
        console.log(`Skipped: ${med.name} (exists)`);
      }
    }
    
    console.log('Seed process completed');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedMedicines();
