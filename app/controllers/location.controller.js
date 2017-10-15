const User = require('../models/user.model')
const Location = require('../models/location.model')

function getLocationOfUserWithID(id, callback) {
  User.find({
    _id: id,
  }, (userError, users) => {
    if (!userError) {
      Location.find({
        _id: users[0].location,
      }, (locationError, locations) => {
        if (!locationError) {
          callback(200, { success: true, location: locations })
        } else {
          callback(500, { success: false, message: locationError })
        }
      })
    } else {
      callback(500, { success: false, message: userError })
    }
  })
}

function updateLocationOfUserWithID(id, params, callback) {
  User.find({
    _id: id,
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

module.exports = { getLocationOfUserWithID, updateLocationOfUserWithID }
