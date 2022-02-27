const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


// @desc     Create new Order
// @route    POST /api/orders
// @access   Private
exports.createOrder = asyncHandler(async(req, res) => {
    const { orderItems, restaurant, deliveryAddress, paymentMethod, itemPrice, gst, deliveryPrice, packagingPrice, totalPrice, isPaid, paidAt } = req.body

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
            isPaid,
            paidAt
        })

        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderCreated', order)
        
        res.status(201).json(order)
    }
})


// @desc     Get Order Details By orderId
// @route    GET /api/orders/orderId/:id
// @access   Public
exports.getOrderDetails = asyncHandler(async(req, res) => {
    let order = await Order.findById(req.params.id).populate('restaurant').populate('deliveryAddress').sort('-createdAt')
    
    if (!order) {
        res.status(404)
        throw new Error('No such order found')
    } else {
        res.status(200)
        res.json(order)
    }
})


// @desc     Get Orders Details By userId / restaurantId
// @route    GET /api/orders/:id
// @access   Private
exports.getOrders = asyncHandler(async(req, res) => {
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


// @desc     Update Order Status
// @route    PUT /api/orders/:id/updateStatus
// @access   Private
exports.updateOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.status = req.body.status

        if (req.body.status === 'Delivered') {
            order.deliveredAt = Date.now()
        }

        const updatedOrder = await order.save()

        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderUpdated', { id: req.params.id, status: req.body.status, updatedAt: updatedOrder.updatedAt })

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})
