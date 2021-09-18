const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

// @desc    Add a new Address
// @route   POST /api/address/new
// @access  Private
exports.addAddress = asyncHandler(async(req, res) => {
    const { address, city, state, postalCode, country, contact } = req.body

    const addAddress = await Address.create({
        user: req.user,
        address,
        city,
        state,
        postalCode,
        country,
        contact
    })

    const newAddress = await addAddress.save()

    res.status(201).json('Address Added')
})


// @desc    List all Addresses
// @route   POST /api/address/list
// @access  Private
exports.listAllAddress = asyncHandler(async(req, res) => {
    const addresses = await Address.find({ user: req.user })

    if (addresses) {
        res.status(200).json(addresses)
    } else {
        res.status(404)
        throw new Error('No address found')
    }
})