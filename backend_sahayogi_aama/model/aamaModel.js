const mongoose = require('mongoose')

const aamaSchema = mongoose.Schema({
    aamaImageUrl: {
        type : String,
        required : false,
        trim : true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    charge: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
    },
    language: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // isVerified: {
    //     type: String,
    //     default: false
    // }
    
})
const aama = mongoose.model('aama', aamaSchema)
module.exports = aama;