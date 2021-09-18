const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Dish'
            }
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Address'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    gst: {
        type: Number,
        required: true,
        default: 0.0
    },
    deliveryPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isConfirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    isOutForDelivery: {
        type: Boolean,
        required: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
}, {
    timestamps: true
}) 

const Order = mongoose.model('Order', orderSchema)
module.exports = Order