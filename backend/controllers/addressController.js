const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

// @desc    Add a new Address
// @route   POST /api/address/new
// @access  Private
exports.addAddress = asyncHandler(async(req, res) => {
    const { name, address, city, state, postalCode, country, contact } = req.body

    let addAddress

    if (!req.body.addressId) {
        addAddress = await Address.create({
            name,
            user: req.user,
            address,
            city,
            state,
            postalCode,
            country,
            contact
        })
    } else if (req.body.addressId) {
        // Edit Address
        addAddress = await Address.findById(req.body.addressId)

        address.name = name
        addAddress.address = address
        addAddress.city = city
        addAddress.state = state
        addAddress.postalCode = postalCode
        addAddress.country = country
        addAddress.contact = contact
    } else {
        res.status(404)
        throw new Error('Address not found')
    }

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


// @desc    Delete Address
// @route   DELETE /api/address/:id/delete
// @access  Private
exports.deleteAddress = asyncHandler(async(req, res) => {
    const address = await Address.findById(req.params.id)

    if (address) {
        await address.remove()
        res.json({ 
            message: 'Address Deleted'
        })
    } else {
        res.status(404)
        throw new Error('No address found')
    }
})


// @desc    Get Address
// @route   GET /api/address/:id
// @access  Private
exports.getAddress = asyncHandler(async(req, res) => {
    const address = await Address.findById(req.params.id)

    res.status(200).json(address)
})