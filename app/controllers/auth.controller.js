const config = require('../config')
const User = require('../models/user.model')

function isAdmin(req) {
  return (req.token === config.adminToken)
}

function authenticateUser(username, req, callback) {
  User.find({
    username,
    token: req.token,
  }, (err, res) => {
    if (res.length) {
      callback(true)
    } else if (req.token === config.adminToken) {
      callback(true)
    } else {
      callback(false)
    }
  })
}

module.exports = { isAdmin, authenticateUser }
