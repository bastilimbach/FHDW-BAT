const express = require('express')
const UserController = require('./controllers/user.controller')
const LocationController = require('./controllers/location.controller')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    // List all users
    UserController.getAllUsers((status, response) => {
      res.status(status)
      res.json(response)
    })
  })

  .post((req, res) => {
    //  Create new user
    const creationParams = {
      username: req.body.username,
    }
    UserController.createNewUser(creationParams, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

router.route('/:user_id/')
  .get((req, res) => {
    // Get user info
    UserController.getUserWithID(req.params.user_id, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

  .put((req, res) => {
    //  Update user info
    const updateParams = {
      username: req.body.username,
    }
    UserController.updateUserWithID(req.params.user_id, updateParams, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

  .delete((req, res) => {
    //  Delete user
    UserController.deleteUserWithID(req.params.user_id, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

router.route('/:user_id/location')
  .get((req, res) => {
    // Get user coordinates
    LocationController.getLocationOfUserWithID(req.params.user_id, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

  .put((req, res) => {
    //  Update user coordinates
    const newLocation = {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }
    LocationController.updateLocationOfUserWithID(req.params.user_id, newLocation, (status, response) => {
      res.status(status)
      res.json(response)
    })
  })

module.exports = router
