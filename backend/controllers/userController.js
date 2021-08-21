const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Restaurant = require('../models/restaurantModel')
const { generateToken } = require('../utils/generateToken')


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        // 401 unauthorized
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc    Register user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        // 400 Bad Request
        res.status(400)
        throw new Error('User already exists')
    } 

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isSeller: user.isSeller,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Update Profile
// @route   PUT /api/users/profile
// @access  Private user
exports.updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    let UpdatedRestaurant
    if (user.isSeller) {
        const restaurant = await Restaurant.findOne({ email: user.email })

        restaurant.name = req.body.name || restaurant.name
        restaurant.email = req.body.email || restaurant.email

        UpdatedRestaurant = await restaurant.save()
    }

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json(updatedUser)
        return
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})