const express = require('express')
const router = express.Router()

const restaurantController = require('../controllers/restaurantController')

router.post('/', restaurantController.getRestaurant)

module.exports = router