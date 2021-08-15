const express = require('express')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const db = require('./config/db')

dotenv.config()

db()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running..........')
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`));