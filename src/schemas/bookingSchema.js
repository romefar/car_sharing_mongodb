const { Schema } = require('mongoose')
const driverSchema = require('./driverSchema')

const bookingSchema = new Schema({
  status: {
    type: String,
    enum: ['Booked', 'Active', 'Closed', 'Cancelled'],
    default: 'Booked'
  },
  finishFuelLevel: {
    type: Number,
    min: [0, 'Finish fuel level cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Finish fuel level (${props.value}) must be an integer value.`
    }
  },
  finishMileage: {
    type: Number,
    min: [0, 'Finish mileage cannot be a negative number.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Finish mileage (${props.value}) must be an integer value.`
    }
  },
  startDate: {
    type: Date,
    default: new Date().toJSON()
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

module.exports = bookingSchema
