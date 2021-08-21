const asyncHandler = require("express-async-handler");
const Dish = require("../models/dishModel");
const fs = require('fs')
const path = require('path')


// @desc    Add a new Dish
// @route   POST /api/dish
// @access  Private seller
exports.createDish = asyncHandler(async (req, res) => {
    const dish = await Dish.create({
        restaurant: req.body.id,
        name: 'Sample dish name',
        description: 'Sample description',
        type: 'Select Type',
        cost: 0,
        image: 'sample image',
        numReviews: 0,
    })

    const createdDish = await dish.save()

    res.status(201).json(createdDish)
})


// @desc    List Dishes by restaurant
// @route   GET /api/dish/:id
// @access  Public
exports.dishList = asyncHandler(async (req, res) => {
    const dishes = await Dish.find({ restaurant: req.params.id })
    
    if (dishes) {
        res.status(200).json(dishes)
    } else {
        res.status(404)
        throw new Error('No Dishes found')
    }
})


// @desc    List Dish by ID
// @route   GET /api/dish/detail/:id
// @access  Public
exports.dishDetail = asyncHandler(async (req, res) => {
    const dish = await Dish.findById(req.params.id)
    
    if (dish) {
        res.status(200).json(dish)
    } else {
        res.status(404)
        throw new Error('No Dish found')
    }
})


// @desc    Edit Dish
// @route   POST /api/dish/:id/edit
// @access  Private seller
exports.editDish = asyncHandler(async (req, res) => {
    const { name, description, type, cost, image } = req.body

    const dish = await Dish.findById(req.params.id)

    if (dish.image !== "sample image" && image !== dish.image) {
        fs.unlinkSync(path.join(__dirname, '../../', dish.image));
    }
    
    if (dish) {
        dish.name = name,
        dish.description = description,
        dish.type = type,
        dish.cost = cost,
        dish.image = image

        const updatedDish = await dish.save()
        res.json(updatedDish)
    } else {
        res.status(404)
        throw new Error('Dish not found')
    }
})