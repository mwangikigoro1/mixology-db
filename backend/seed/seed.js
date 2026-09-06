require('dotenv').config();
const mongoose = require('mongoose');
const Cocktail = require('../models/Cocktail');
const cocktails = require('./cocktails');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 Connected to MongoDB');

    await Cocktail.deleteMany({});
    console.log('🗑️  Cleared existing cocktails');

    await Cocktail.insertMany(cocktails);
    console.log(`✅ Inserted ${cocktails.length} cocktails`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
