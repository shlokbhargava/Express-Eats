const asyncHandler = require("express-async-handler");
const Dish = require("../models/dishModel");


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


exports.dishList = asyncHandler(async (req, res) => {
    const dishes = await Dish.find({ restaurant: req.params.id })
    
    if (dishes) {
        res.status(200).json(dishes)
    } else {
        res.status(404)
        throw new Error('No Dishes found')
    }
})

exports.editDish = asyncHandler(async (req, res) => {
    const { name, description, type, cost, image } = req.body

    const dish = Dish.findById(req.params.id)
    
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