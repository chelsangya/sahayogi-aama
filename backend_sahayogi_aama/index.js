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
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

dotenv.config();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use(limiter);

const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsPolicy));

connectDB();

app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

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

const PORT = process.env.PORT || 443;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} as ${process.env.HTTPS === 'true' ? 'HTTPS' : 'HTTP'}`);
});
