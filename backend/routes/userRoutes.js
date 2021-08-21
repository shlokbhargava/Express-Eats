const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', userController.authUser)
router.post('/', userController.registerUser)
router.put('/profile', protect, userController.updateProfile)

module.exports = router