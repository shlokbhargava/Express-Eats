const express = require('express')
const { createDish, editDish, dishList, dishDetails } = require('../controllers/dishController')
const { seller, protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/:id', dishList)
router.post('/', protect, seller, createDish)
router.post('/:id/edit', protect, seller, editDish)

module.exports = router