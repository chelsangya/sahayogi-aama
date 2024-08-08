//import necessary packages
const mongoose= require('mongoose');
mongoose.set('sanitizeFilter', true);
//function to connect database
const connectDB= ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('Connected to Database');
    })
}

//export
module.exports= connectDB;