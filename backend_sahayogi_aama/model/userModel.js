const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    booked: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'booking'
    },
    favourite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'favourite'
    }
});
const Users=mongoose.model("users",userSchema);
module.exports=Users;