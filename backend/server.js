const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('API is running..........')
})

app.listen(5000, console.log('Server is up and running on port 5000'));