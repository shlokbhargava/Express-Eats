const express = require('express')
const { addAddress, listAllAddress } = require('../controllers/addressController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add', protect, addAddress)
router.get('/list', protect, listAllAddress)

module.exports = router