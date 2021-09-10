const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");

// @desc    Find a single restaurant
// @route   POST /api/restaurant
// @access  Public
exports.getRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ email: req.body.email })
    const user = await User.findOne({ email: req.body.email })

    if (!restaurant && !user.isSeller) {
        return
    }

    if (restaurant) {
        res.status(200).json(restaurant)
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
})


// @desc    Find all restaurants
// @route   GET /api/restaurant
// @access  Public
exports.getRestaurants = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const restaurants = await Restaurant.find({ ...keyword })
    res.json(restaurants)
})


// @desc    Edit restaurant
// @route   POST /api/restaurant/:id/edit
// @access  Private
exports.editRestaurant = asyncHandler(async (req, res) => {
    const { contact, minOrderValue, time, description, state, country, onlinePayment, cod } = req.body

    const restaurant = await Restaurant.findById(req.params.id)

    if (restaurant) {
        restaurant.contact = contact,
        restaurant.minOrderValue = minOrderValue,
        restaurant.time = time,
        restaurant.description = description,
        restaurant.state = state,
        restaurant.country = country,
        restaurant.onlinePayment = onlinePayment
        restaurant.cod = cod

        const updatedRestaurant = await restaurant.save()
        res.json(updatedRestaurant)
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
})