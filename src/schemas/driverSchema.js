const { Schema } = require('mongoose')
const creditCardSchema = require('./creditCardSchema')

const driverSchema = new Schema({
  licenseNumber: {
    type: String,
    required: [true, 'Driver license is required.'],
    uppercase: true,
    match: [/^[0-9A-Z-]+$/, 'The driver license can only contain letters, numbers and hyphen characters.']
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Driver\'s first name is required.'],
    match: [/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/, 'First name can only contain the following characters: a-z, A-Z, \', hyphen and space.']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Driver\'s last name is required.'],
    match: [/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Last name can only contain the following characters: a-z, A-Z, \', hyphen and space.']
  },
  creditCard: creditCardSchema
})

module.exports = driverSchema
