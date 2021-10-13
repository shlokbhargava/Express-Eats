const express = require('express')
const { addAddress, listAllAddress, deleteAddress, getAddress } = require('../controllers/addressController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add', protect, addAddress)
router.get('/list', protect, listAllAddress)
router.delete('/:id/delete', protect, deleteAddress)
router.get('/:id', getAddress)

module.exports = router