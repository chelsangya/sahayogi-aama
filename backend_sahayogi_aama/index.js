// Import packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const path = require('path');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');
const fs = require('fs');
const https = require('https');
const http = require('http');
const helmet = require('helmet');
const xss = require('xss-clean');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use Helmet for security headers
app.use(helmet());

// Use xss-clean to sanitize input
app.use(xss());

// Set CORS policy
const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));

// MongoDB connection
connectDB();

// Body parsers
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

// Multiparty middleware for file uploads
app.use(multiparty());

// Static file serving
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/aama', require('./routes/aamaRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/favourite', require('./routes/favouriteRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
  res.send('Hello, the server is running!');
});

// Load SSL certificate and key if HTTPS is enabled
let server;
if (process.env.HTTPS === 'true') {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
  };
  server = https.createServer(sslOptions, app);
} else {
  server = http.createServer(app);
}

// Define port
const PORT = process.env.PORT || 443;

// Run the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} as ${process.env.HTTPS === 'true' ? 'HTTPS' : 'HTTP'}`);
});
