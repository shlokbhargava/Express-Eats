const mongoose = require('mongoose')

const dishSchema = mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish