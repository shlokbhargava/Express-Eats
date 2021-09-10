const express = require('express')
const router = express.Router()
const { protect, seller } = require('../middleware/authMiddleware')

const restaurantController = require('../controllers/restaurantController')

router.post('/', restaurantController.getRestaurant)
router.get('/', restaurantController.getRestaurants)
router.post('/:id/edit', protect, seller, restaurantController.editRestaurant)

module.exports = router