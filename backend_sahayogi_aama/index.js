const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const path = require('path');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const winston = require('winston');
const expressWinston = require('express-winston');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');

dotenv.config();

const app = express();

// Apply security middlewares
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://localhost:3000"],
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
app.use(hpp());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter); // Apply to all API routes

// Configure CORS
const corsPolicy = {
  origin: ['https://localhost:3000'], // Allow localhost for development
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));

// Connect to database
connectDB();

// Body parsers
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

// Multiparty middleware for handling form data
app.use(multiparty());

// Serve static files
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setup logging with Winston
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
}));

// Define your routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/aama', require('./routes/aamaRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/favourite', require('./routes/favouriteRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Example validation with Joi
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

app.post('/api/user', (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Proceed with user creation
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello, the server is running!');
});

// SSL options
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_FILE),
  cert: fs.readFileSync(process.env.SSL_CRT_FILE),
};

// Create HTTPS server
const server = https.createServer(sslOptions, app);

const PORT = process.env.PORT || 443;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} as HTTPS`);
});
