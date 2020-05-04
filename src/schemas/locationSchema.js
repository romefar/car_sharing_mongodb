const { Schema } = require('mongoose')

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: [true, 'Coordinated are required.'],
    index: '2dsphere'
  }
})

module.exports = locationSchema
