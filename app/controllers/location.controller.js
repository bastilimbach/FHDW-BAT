const User = require('../models/user.model')
const Location = require('../models/location.model')

function getLocationOfUserWithUsername(username, callback) {
  User.find({
    username,
  }, (userError, users) => {
    if (!userError) {
      Location.find({
        _id: users[0].location,
      }, (locationError, locations) => {
        if (!locationError) {
          const locationMap = {}
          locations.forEach((location) => {
            locationMap[location._id] = {
              latitude: location.latitude,
              longitude: location.longitude,
              createdAt: location.createdAt,
              updatedAt: location.updatedAt,
            }
          })
          callback(200, { success: true, location: locationMap })
        } else {
          callback(500, { success: false, message: locationError })
        }
      })
    } else {
      callback(500, { success: false, message: userError })
    }
  })
}

function updateLocationOfUserWithUsername(username, params, callback) {
  User.find({
    username,
  }, (userError, users) => {
    if (!userError) {
      Location.update({
        _id: users[0].location,
      }, params, (err, raw) => {
        if (!err) {
          callback(200, { success: true, location: raw })
        } else {
          callback(500, { success: false, location: err })
        }
      })
    } else {
      callback(500, { success: false, location: userError })
    }
  })
}

module.exports = { getLocationOfUserWithUsername, updateLocationOfUserWithUsername }
