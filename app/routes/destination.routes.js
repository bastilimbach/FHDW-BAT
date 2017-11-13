const express = require('express')
const DestinationController = require('../controllers/destination.controller')
const Auth = require('../controllers/auth.controller')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    // List all destinations
    if (Auth.isAdmin(req)) {
      DestinationController.getAllDestinations((status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

  .post((req, res) => {
    //  Create new destination
    if (Auth.isAdmin(req)) {
      const creationParams = {
        destinationID: req.body.destinationID,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }
      DestinationController.createDestination(creationParams, (status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

router.route('/:destinationID/')
  .get((req, res) => {
    // Get destination info
    if (Auth.isAdmin(req)) {
      DestinationController.getDestinationWithID(req.params.destinationID, (status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

  .put((req, res) => {
    //  Update destination info
    if (Auth.isAdmin(req)) {
      const updateParams = {
        destinationID: req.body.destinationID,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }
      DestinationController.updateDestinationWithID(req.params.destinationID, updateParams, (status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

  .delete((req, res) => {
    //  Delete destination
    if (Auth.isAdmin(req)) {
      DestinationController.deleteDestinationWithID(req.params.destinationID, (status, response) => {
        res.status(status)
        res.json(response)
      })
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized' })
    }
  })

module.exports = router
