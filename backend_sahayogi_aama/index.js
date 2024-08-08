// import packages
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
const helmet = require('helmet');  // Import helmet

// create an instance of express
const app = express();

// dotenv config
dotenv.config();

// Use helmet for security
app.use(helmet());

// cors policy
const corsPolicy = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsPolicy));

// mongodb connection
connectDB();

// json middleware
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

// multiparty middleware
app.use(multiparty());

app.use('/uploads', (req, res, next) => {
    express.static(path.resolve(__dirname, 'uploads'))(req, res, next);
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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
        cert: fs.readFileSync(process.env.SSL_CRT_FILE)
    };
    server = https.createServer(sslOptions, app);
} else {
    server = http.createServer(app);
}

// define port
const PORT = process.env.PORT || 443;

// run the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} as ${process.env.HTTPS === 'true' ? 'HTTPS' : 'HTTP'}`);
});
