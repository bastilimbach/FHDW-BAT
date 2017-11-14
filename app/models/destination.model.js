const mongoose = require('mongoose')

const DestinationSchema = new mongoose.Schema({
  destinationID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
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
})

/**
 * @typedef Destination
 */
module.exports = mongoose.model('Destination', DestinationSchema)
