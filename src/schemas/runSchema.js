const { Schema } = require('mongoose')
const driverSchema = require('./driverSchema')

const runSchema = new Schema({
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  startFuelLevel: {
    type: Number,
    min: [0, 'Start fuel level cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Start fuel level (${props.value}) must be an integer value.`
    }
  },
  startMileage: {
    type: Number,
    min: [0, 'Fuel level cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Fuel level (${props.value}) must be an integer value.`
    }
  },
  driver: driverSchema
})

module.exports = runSchema
