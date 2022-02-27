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
const addressRoutes = require('./routes/addressRoutes')
const orderRoutes = require('./routes/orderRoutes')
const Emitter = require('events')

dotenv.config()

db()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/sellers', sellerRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/dish', dishRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/orders', orderRoutes)

const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

app.use('/uploads', express.static(path.join(__dirname, '../uploads'))) 

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`))

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('join', (roomName) => {
    socket.join(roomName)
  })
})

eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit('orderUpdated', data)
})