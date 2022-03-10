const express = require('express');
const { checkOutSession } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()

router.post('/create-checkout-session', protect, checkOutSession)


module.exports = router