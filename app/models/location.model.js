const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    default: 0,
    required: true,
  },
  longitude: {
    type: Number,
    default: 0,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

/**
 * @typedef Location
 */
module.exports = mongoose.model('Location', LocationSchema)
