const asyncHandler = require("express-async-handler")
const dotenv = require('dotenv')
const Order = require('../models/orderModel')

dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_API)

// @desc    Payment Check Out Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
exports.checkOutSession = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body._id)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice*100,
    currency: "inr",
    automatic_payment_methods: {enabled: true},
  })

  if (paymentIntent) {
    order.paymentMethod = 'stripe'
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentID = paymentIntent.id
    order.status = 'Placed'

    await order.save()
  }

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})