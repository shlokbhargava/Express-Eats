const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");

// @desc    Find a single restaurant
// @route   GET /api/restaurant
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