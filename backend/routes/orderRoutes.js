const express = require('express')
const { createOrder, getOrderDetails } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', protect, createOrder)
router.get('/:id', protect, getOrderDetails)

module.exports = router