const User = require('../models/user.model')
const Destination = require('../models/destination.model')

function getAllDestinations(callback) {
  Destination.find({}, (error, destinations) => {
    if (!error) {
      const destinationMap = {}
      destinations.forEach((destination) => {
        destinationMap[destination._id] = {
          id: destination.destinationID,
          name: destination.name,
          latitude: destination.latitude,
          longitude: destination.longitude,
          createdAt: destination.createdAt,
          updatedAt: destination.updatedAt,
        }
      })
      callback(200, { success: true, destinations: destinationMap })
    } else {
      callback(500, { success: false, message: error })
    }
  })
}

function deleteAllDestinations(callback) {
  Destination.remove()
  callback(200, { success: true })
}

function getDestinationWithID(id, callback) {
  Destination.find({
    destinationID: id,
  }, (error, raw) => {
    if (!error) {
      const destinationMap = []
      raw.forEach((destination) => {
        destinationMap.push({
          id: destination.destinationID,
          name: destination.name,
          latitude: destination.latitude,
          longitude: destination.longitude,
          createdAt: destination.createdAt,
          updatedAt: destination.updatedAt,
        })
      })
      callback(200, { success: true, destination: destinationMap })
    } else {
      callback(500, { success: false, message: error })
    }
  })
}

function createDestination(params, callback) {
  const newDestination = new Destination(params)
  newDestination.save((error) => {
    if (!error) {
      callback(200, { success: true, destination: newDestination })
    } else {
      callback(500, { success: false, message: error })
    }
  })
}

function updateDestinationWithID(id, params, callback) {
  Destination.update({ destinationID: id }, params, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, destination: err })
    }
  })
}

function deleteDestinationWithID(id, callback) {
  Destination.remove({ destinationID: id }, (err, raw) => {
    if (!err) {
      callback(200, { success: true, destinations: raw })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function getDestinationOfUserWithUsername(username, callback) {
  User.find({
    username,
  }, (userError, users) => {
    if (!userError) {
      Destination.find({
        destinationID: users[0].destination,
      }, (destinationError, destinations) => {
        if (!destinationError) {
          const destinationMap = {}
          destinations.forEach((destination) => {
            destinationMap[destination._id] = {
              id: destination.destinationID,
              name: destination.name,
              latitude: destination.latitude,
              longitude: destination.longitude,
              createdAt: destination.createdAt,
              updatedAt: destination.updatedAt,
            }
          })
          callback(200, { success: true, destination: destinationMap })
        } else {
          callback(500, { success: false, message: destinationError })
        }
      })
    } else {
      callback(500, { success: false, message: userError })
    }
  })
}


module.exports = {
  getAllDestinations,
  getDestinationWithID,
  createDestination,
  updateDestinationWithID,
  deleteDestinationWithID,
  getDestinationOfUserWithUsername,
  deleteAllDestinations,
}
