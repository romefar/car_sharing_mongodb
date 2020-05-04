const { Schema } = require('mongoose')
const runSchema = require('./runSchema')
const locationSchema = require('./locationSchema')
const bookingSchema = require('./bookingSchema')

const carSchema = new Schema({
  vin: {
    type: String,
    unique: true,
    uppercase: true,
    required: [true, 'VIN is required.'],
    minlength: [17, 'VIN length cannot be less than 17.'],
    maxlength: [17, 'VIN length cannot be greater than 17.'],
    match: [/[A-HJ-NPR-Z0-9]{13}[0-9]{4}/g, 'Invalid VIN.']
  },
  registartionNumber: {
    type: String,
    unique: true,
    uppercase: true,
    required: [true, 'Registartion number is required.'],
    minlength: [5, 'Invalid EU vehicle registration number. The number length must be between 5 and 9.'],
    maxlength: [9, 'Invalid EU vehicle registration number. The number length must be between 5 and 9.'],
    match: [/^[A-Z0-9-]+$/g, 'The registration number can only contain letters, numbers and hyphen characters.']
  },
  productionInfo: {
    brand: {
      type: String,
      required: [true, 'Brand name is required.'],
      match: [/^[a-zA-Z-]+$/g, 'The brand name can only contain letters and hyphen characters.']
    },
    model: {
      type: String,
      required: [true, 'Model name is required.'],
      match: [/^[a-zA-Z0-9]+$/g, 'The model name can only contain letters and numbers characters.']
    },
    date: {
      type: Date,
      required: [true, 'Production date is required.'],
      min: [`${new Date().getFullYear() - 10}-01-01`, 'The car cannot be older than 10 years.'],
      max: [`${new Date().toJSON().slice(0, 10)}`, 'The car cannot be produced today.']
    }
  },
  status: {
    type: String,
    enum: ['Free', 'In use', 'Unavailable', 'In service', 'Reserved'],
    default: 'Free'
  },
  fuelCapacity: {
    type: Number,
    required: [true, 'Fuel capacity is required.'],
    min: [0, 'Fuel capacity cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Fuel capacity (${props.value}) must be an integer value.`
    }
  },
  fuelLevel: {
    type: Number,
    required: [true, 'Fuel level is required.'],
    min: [0, 'Fuel level cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Fuel level (${props.value}) must be an integer value.`
    }
  },
  mileage: {
    type: Number,
    required: [true, 'Mileage is required.'],
    min: [0, 'Mileage cannot be a negative number or 0.'],
    validate: {
      validator: Number.isInteger,
      message: props => `Mileage (${props.value}) must be an integer value.`
    }
  },
  geometry: locationSchema,
  runs: [runSchema],
  bookingsHistory: [bookingSchema]
})

module.exports = carSchema