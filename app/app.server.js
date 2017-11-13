const express = require('express')
const userRoutes = require('./routes/user.routes')
const destinationRoutes = require('./routes/destination.routes')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

const app = express()

app.use(bodyParser.json())
app.use(bearerToken())
app.use('/', express.static('./public'))
app.use('/user', userRoutes)
app.use('/destination', destinationRoutes)

module.exports = app
