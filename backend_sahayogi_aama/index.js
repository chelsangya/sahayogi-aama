// import packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const multiparty=require('connect-multiparty');
const cloudinary=require('cloudinary');

// create an instance of express
const app = express();

// dotenv config
dotenv.config();

// cors policy
const corsPolicy={
    origin: true,
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsPolicy))
// mongodb connection
connectDB();

// json middleware
app.use(express.json());

// multiparty middleware
app.use(multiparty());


cloudinary.config({ 
  cloud_name: 'dczxrob6w', 
  api_key: '153278163438971', 
  api_secret: 'AylcERDx_b0d9n_2y4hsof7v1yE' 
});

app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/aama', require('./routes/aamaRoutes'));
app.use('/api/booking', require('./routes/bookingRoutes'));
app.use('/api/favourite', require('./routes/favouriteRoutes'))

// define port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});