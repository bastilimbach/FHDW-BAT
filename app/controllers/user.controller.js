const User = require('../models/user.model')
const Location = require('../models/location.model')
const Crypto = require('crypto')

function getAllUsers(callback) {
  User.find({}, (err, users) => {
    if (!err) {
      const userMap = {}
      users.forEach((user) => {
        userMap[user._id] = {
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })
      callback(200, { success: true, user: userMap })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function getUserWithUsername(username, callback) {
  User.find({
    username,
  }, (err, raw) => {
    if (!err) {
      const userMap = {}
      raw.forEach((user) => {
        userMap[user._id] = {
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })
      callback(200, { success: true, message: userMap })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function createNewUser(params, callback) {
  const userLocation = new Location()
  Crypto.randomBytes(12, (cryptoError, buffer) => {
    if (!cryptoError) {
      const token = buffer.toString('hex')
      userLocation.save((locationError) => {
        if (locationError) {
          callback(500, { success: false, message: locationError })
        } else {
          const newUser = new User(params)
          Object.assign(newUser, { location: userLocation._id, token })
          newUser.save((userError) => {
            if (!userError) {
              callback(200, { success: true, message: newUser })
            } else {
              callback(500, { success: false, message: userError })
            }
          })
        }
      })
    } else {
      callback(500, { success: false, message: cryptoError })
    }
  })
}

function updateUserWithUsername(username, params, callback) {
  User.update({ username }, params, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, user: err })
    }
  })
}

function deleteUserWithUsername(username, callback) {
  User.remove({ username }, (err, raw) => {
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
  getUserWithUsername,
  updateUserWithUsername,
  deleteUserWithUsername,
}
