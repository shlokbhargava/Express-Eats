const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


// @desc     Create new Order
// @route    POST /api/orders
// @access   Private
exports.createOrder = asyncHandler(async(req, res) => {
    const { orderItems, deliveryAddress, paymentMethod, itemPrice, gst, deliveryPrice, packagingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = await Order.create({
            user: req.user._id,
            orderItems,
            deliveryAddress,
            paymentMethod,
            itemPrice,
            gst,
            deliveryPrice,
            packagingPrice,
            totalPrice
        })

        res.status(201).json(order)
    }
})


// @desc     Get Order Details By Id
// @route    GET /api/orders/:id
// @access   Private
exports.getOrderDetails = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(404)
        throw new Error('No such order found')
    } else {
        res.status(200)
        res.json(order)
    }
})