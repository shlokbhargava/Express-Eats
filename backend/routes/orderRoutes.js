const express = require('express')
const { createOrder, getOrderDetails, updateOrder } = require('../controllers/orderController')
const { protect, seller } = require('../middleware/authMiddleware')
const router = express.Router()
router.post('/', protect, createOrder)
router.get('/:id', protect, getOrderDetails)
router.put('/:id/updateStatus', protect, seller, updateOrder)

module.exports = router