const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

const app = express()

app.use(bodyParser.json())
app.use(bearerToken())
app.use('/', express.static('./public'))
app.use('/user', routes)

module.exports = app
