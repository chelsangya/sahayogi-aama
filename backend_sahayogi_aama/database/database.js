const mongoose = require('mongoose');

// Enable query filter sanitization to prevent NoSQL injection
mongoose.set('sanitizeFilter', true);

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connectDB function
module.exports = connectDB;
