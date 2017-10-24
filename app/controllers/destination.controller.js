const User = require('../models/user.model')
const Destination = require('../models/destination.model')

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

function updateDestinationOfUserWithUsername(username, destinationID, callback) {
  User.update({ username }, { destination: destinationID }, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, user: err })
    }
  })
}

module.exports = { getDestinationOfUserWithUsername, updateDestinationOfUserWithUsername }
