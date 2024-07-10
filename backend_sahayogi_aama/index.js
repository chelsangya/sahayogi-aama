// import packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');
const fs = require('fs');
const https = require('https');

// create an instance of express
const app = express();

// dotenv config
dotenv.config();

// cors policy
const corsPolicy = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));

// mongodb connection
connectDB();

// json middleware
app.use(express.json());

// multiparty middleware
app.use(multiparty());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/aama', require('./routes/aamaRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/favourite', require('./routes/favouriteRoutes'));

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, the server is running!');
});

// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('./ssl/private.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
    // If you have an intermediate certificate, include it like this:
    // ca: fs.readFileSync('./ssl/ca_bundle.crt')
};

// define port
const PORT = process.env.PORT || 443; // Default to port 443 for HTTPS

// run the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
