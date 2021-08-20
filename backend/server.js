const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const dishRoutes = require('./routes/dishRoutes')

dotenv.config()

db()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/sellers', sellerRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/dish', dishRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`));