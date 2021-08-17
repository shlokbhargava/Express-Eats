const asyncHandler = require('express-async-handler')
const Restaurant = require('../models/restaurantModel')
const User = require('../models/userModel')

// @desc    Register Seller
// @route   POST /api/sellers
// @access  Public
exports.registerSeller = asyncHandler(async (req, res) => {
    const { name, email, contact, minOrderValue, state, country, onlinePayment, cod, password } = req.body
    console.log(email)

    const sellerExists = await User.findOne({ email })

    if (sellerExists) {
        res.status(400)
        throw new Error('Seller already exists')
    } 

    const seller = await User.create({
        name,
        email,
        password,
        isSeller: true
    })

    const restaurant = await Restaurant.create({
        name,
        email,
        contact,
        minOrderValue,
        state,
        country,
        onlinePayment,
        cod
    })

    if (seller && restaurant) {
        res.status(201).json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
            isSeller: seller.isSeller,
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})