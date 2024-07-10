const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    aama: {
        type: mongoose.Schema.Types.ObjectId, ref: "aama"
    },
    by: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    dateTime: {
        type: Date,
        required: true
    },
})

const booking = mongoose.model("booking", bookingSchema)
module.exports = booking;