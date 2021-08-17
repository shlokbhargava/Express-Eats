const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    minOrderValue: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    onlinePayment: {
        type: Boolean,
        required: true
    },
    cod: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant