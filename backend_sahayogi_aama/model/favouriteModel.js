const mongoose = require('mongoose')

const favouriteSchema = mongoose.Schema({
    by : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aama'
    },
})

const favourite = mongoose.model('favourite', favouriteSchema)
module.exports = favourite;