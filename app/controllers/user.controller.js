const User = require('../models/user.model')
const Location = require('../models/location.model')

function getAllUsers(callback) {
  User.find({}, (err, users) => {
    if (!err) {
      const userMap = {}
      users.forEach((user) => {
        userMap[user._id] = user
      })
      callback(200, { success: true, user: userMap })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function getUserWithID(id, callback) {
  User.find({
    _id: id,
  }, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function createNewUser(params, callback) {
  const userLocation = new Location()
  userLocation.save((locationError) => {
    if (locationError) {
      callback(500, { success: false, message: locationError })
    } else {
      const newUser = new User(params)
      Object.assign(newUser, { location: userLocation._id })
      newUser.save((userError) => {
        if (!userError) {
          callback(200, { success: true, message: newUser })
        } else {
          callback(500, { success: false, message: userError })
        }
      })
    }
  })
}

function updateUserWithID(id, params, callback) {
  User.update({ _id: id }, params, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, user: err })
    }
  })
}

function deleteUserWithID(id, callback) {
  User.remove({ _id: id }, (err, raw) => {
    if (!err) {
      callback(200, { success: true, user: raw })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserWithID,
  updateUserWithID,
  deleteUserWithID,
}
