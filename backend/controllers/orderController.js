const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


// @desc     Create new Order
// @route    POST /api/orders
// @access   Private
exports.createOrder = asyncHandler(async(req, res) => {
    const { orderItems, restaurant, deliveryAddress, paymentMethod, itemPrice, gst, deliveryPrice, packagingPrice, totalPrice, isPaid } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = await Order.create({
            user: req.user._id,
            orderItems,
            restaurant,
            deliveryAddress,
            paymentMethod,
            itemPrice,
            gst,
            deliveryPrice,
            packagingPrice,
            totalPrice,
            isPaid
        })

        res.status(201).json(order)
    }
})


// @desc     Get Orders Details By userId / restaurantId
// @route    GET /api/orders/:id
// @access   Private
exports.getOrderDetails = asyncHandler(async(req, res) => {
    let orders = await Order.find({ restaurant: req.params.id }).populate('deliveryAddress').sort('-createdAt')

    if (orders.length === 0) {
        orders = await Order.find({ user: req.params.id }).populate('deliveryAddress').populate('restaurant').sort('-createdAt')
    }

    if (!orders) {
        res.status(404)
        throw new Error('No such orders found')
    } else {
        res.status(200)
        res.json(orders)
    }
})


// @desc     Mark Order as Confirmed
// @route    PUT /api/orders/:id/confirm
// @access   Private
exports.confirmOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isConfirmed = true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})


// @desc     Mark Order as Preparing
// @route    PUT /api/orders/:id/prepare
// @access   Private
exports.prepareOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPreparing = true
        
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})


// @desc     Mark Order as Out for delivery
// @route    PUT /api/orders/:id/outfordelivery
// @access   Private
exports.outForDelivery = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isOutForDelivery = true
        
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})


// @desc     Mark Order as Delivered
// @route    PUT /api/orders/:id/deliver
// @access   Private
exports.deliverOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})