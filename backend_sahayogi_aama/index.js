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

dotenv.config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-scripts.com'"],
        styleSrc: ["'self'", "'trusted-styles.com'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.trusted-site.com"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: { allow: false },
    expectCt: { enforce: true, maxAge: 30 },
    frameguard: { action: "sameorigin" },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: "none" },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
  })
);

app.use(xss());

const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));

connectDB();

app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

app.use(multiparty());

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
  };
  server = https.createServer(sslOptions, app);
} else {
  server = http.createServer(app);
}

const PORT = process.env.PORT || 443;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} as ${process.env.HTTPS === 'true' ? 'HTTPS' : 'HTTP'}`);
});