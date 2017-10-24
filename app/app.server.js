const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

const app = express()

app.use(bodyParser.json())
app.use(bearerToken())
app.get('/', (req, res) => {
  res.status(200)
  res.json({
    success: true,
    message: 'The API is running successfully!',
    routes: [
      {
        path: '/user',
        methods: {
          get: 'Get a list of all users.',
          post: 'Add a new user.',
          put: null,
          delete: null,
        },
      },
      {
        path: '/user/[user_id]',
        methods: {
          get: 'Get user information.',
          post: null,
          put: 'Update user information.',
          delete: 'Delete user.',
        },
      },
      {
        path: '/user/[user_id]/location',
        methods: {
          get: 'Get current user location.',
          post: null,
          put: 'Update current user location.',
          delete: null,
        },
      },
    ],
  })
})

app.use('/user', routes)

module.exports = app
