const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    postalCode: { 
        type: Number, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    contact: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Address = mongoose.model('Address', addressSchema)
module.exports = Address