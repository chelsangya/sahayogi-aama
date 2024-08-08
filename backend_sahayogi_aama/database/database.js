const mongoose = require('mongoose');

mongoose.set('sanitizeFilter', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;