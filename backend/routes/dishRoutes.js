const express = require('express')
const { createDish, editDish, dishList, dishDetail } = require('../controllers/dishController')
const { seller, protect } = require('../middleware/authMiddleware')
const router = express.Router()


router.get('/:id', dishList)
router.get('/detail/:id', dishDetail)
router.post('/', protect, seller, createDish)
router.post('/:id/edit', protect, seller, editDish)

module.exports = router