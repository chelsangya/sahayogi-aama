// import packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const https = require('https');
const http = require('http');

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

// Load SSL certificate and key if HTTPS is enabled
let server;
if (process.env.HTTPS === 'true') {
    const sslOptions = {
        key: fs.readFileSync(process.env.SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.SSL_CRT_FILE)
// Add this line if the key is encrypted
    };
    server = https.createServer(sslOptions, app);
} else {
    server = http.createServer(app);
}

// define port
const PORT = process.env.PORT || 443;

// run the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
