const User = require('../models/user.model')

function getAllUsers(callback) {
  User.find({}, (err, users) => {
    if (!err) {
      const userMap = []
      users.forEach((user) => {
        userMap.push(user)
      })
      callback(200, { success: true, users: userMap })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function getUserByUsername(username, callback) {
  User.find({
    username,
  }, (err, raw) => {
    if (!err) {
      raw.forEach((user) => {
        callback(200, { success: true, message: user })
      })
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function getMessageByUsername(username, callback) {
  User.find({
    username,
  }, (err, raw) => {
    if (!err) {
      if (raw.length === 1) {
        callback(200, { success: true, message: raw[0].message })
      } else {
        callback(400, { success: false, message: 'username not unique or found' })
      }
    } else {
      callback(500, { success: false, message: err })
    }
  })
}
function getLocationByUsername(username, callback) {
  User.find({
    username,
  }, (err, raw) => {
    if (!err) {
      if (raw.length === 1) {
        callback(200, { success: true, latitude: raw[0].latitude, longitude: raw[0].longitude })
      } else {
        callback(400, { success: false, message: 'username not unique or found' })
      }
    } else {
      callback(500, { success: false, message: err })
    }
  })
}

function createNewUser(params, callback) {
  const newUser = new User(params)
  newUser.save((userError) => {
    if (!userError) {
      callback(200, { success: true, message: newUser })
    } else {
      callback(500, { success: false, message: userError })
    }
  })
}

function updateUser(username, params, callback) {
  User.update({ username }, params, (err, raw) => {
    if (!err) {
      callback(200, { success: true, message: raw })
    } else {
      callback(500, { success: false, user: err })
    }
  })
}

function deleteUserByUsername(username, callback) {
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
  getUserByUsername,
  getMessageByUsername,
  getLocationByUsername,
  updateUser,
  deleteUserByUsername,
}
