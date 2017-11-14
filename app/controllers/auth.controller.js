const config = require('../config')
const User = require('../models/user.model')

function isAdmin(req) {
  return (req.token === config.adminToken)
}

function authenticateUser(username, req, callback) {
  if (/^[a-zA-Z0-9_]+?/.test(username)) {
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
  } else {
    callback(false)
  }
}

module.exports = { isAdmin, authenticateUser }
