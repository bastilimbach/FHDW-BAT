const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
  uptodate: {
    type: Boolean,
    default: 0,
  },
  message: {
    type: String,
    default: '',
  },
  destination: {
    type: Number,
    ref: 'Destination',
    default: null,
  },
})

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema)
