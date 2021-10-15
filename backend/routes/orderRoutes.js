const express = require('express')
const { createOrder, getOrderDetails, confirmOrder, prepareOrder, outForDelivery, deliverOrder } = require('../controllers/orderController')
const { protect, seller } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', protect, createOrder)
router.get('/:id', protect, getOrderDetails)
router.put('/:id/confirm', protect, seller, confirmOrder)
router.put('/:id/prepare', protect, seller, prepareOrder)
router.put('/:id/outfordelivery', protect, seller, outForDelivery)
router.put('/:id/deliver', protect, seller, deliverOrder)

module.exports = router