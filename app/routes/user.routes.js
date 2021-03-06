const express = require('express')
const UserController = require('../controllers/user.controller')
const DestinationController = require('../controllers/destination.controller')
const Auth = require('../controllers/auth.controller')
const Crypto = require('crypto')
const eventBus = require('../eventBus')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    // List all users
    if (Auth.isAdmin(req)) {
      UserController.getAllUsers((status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

  .post((req, res) => {
    //  Create new user
    if (Auth.isAdmin(req)) {
      Crypto.randomBytes(3, (cryptoError, buffer) => {
        if (!cryptoError) {
          const creationParams = {
            username: req.body.username,
            token: buffer.toString('hex'),
          }
          UserController.createNewUser(creationParams, (status, response) => {
            res.status(status)
            res.json(response)
          })
        } else {
          res.status(401).json({ success: false, message: 'Unauthorized' })
        }
      })
    }
  })

router.route('/:username/')
  .get((req, res) => {
    // Get user info
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        UserController.getUserByUsername(req.params.username, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

  .put((req, res) => {
    //  Update user info
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        const updateParams = {
          username: req.body.username,
        }
        UserController.updateUserWithUsername(req.params.username, updateParams, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

  .delete((req, res) => {
    //  Delete user
    if (Auth.isAdmin(req)) {
      UserController.deleteUserWithUsername(req.params.username, (status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

router.route('/:username/auth')
  .get((req, res) => {
    // Authenticate user
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        res.status(200).json({ success: true, message: 'Authorized' })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

router.route('/:username/location')
  .get((req, res) => {
    // Get user coordinates
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        UserController.getLocationByUsername(req.params.username, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

  .put((req, res) => {
    //  Update user coordinates
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        const newLocation = {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        }
        eventBus.emit('locationUpdate', newLocation)
        UserController.updateUser(req.params.username, newLocation, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

router.route('/:username/destination')
  .get((req, res) => {
    // Get user destination
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        DestinationController.getDestinationOfUserWithUsername(req.params.username, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

  .put((req, res) => {
    //  Update user destination
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        DestinationController.getDestinationWithID(req.body.destinationID, (status, response) => {
          if (status === 200) {
            eventBus.emit('destinationUpdate', response.destination)
          }
        })
        UserController.updateDestinationOfUserWithUsername(req.params.username, req.body.destinationID, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

router.route('/:username/message')
  //  Get user message
  .get((req, res) => {
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        UserController.getMessageByUsername(req.params.username, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

  .put((req, res) => {
    //  Update user message
    Auth.authenticateUser(req.params.username, req, (authenticated) => {
      if (authenticated) {
        eventBus.emit('messageUpdate', req.body.message)
        UserController.updateUser(req.params.username, { message: req.body.message }, (status, response) => {
          res.status(status)
          res.json(response)
        })
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
    })
  })

module.exports = router
