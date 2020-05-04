const { Schema } = require('mongoose')
const creditCardSchema = require('./creditCardSchema')

const driverSchema = new Schema({
  licenseNumber: {
    type: String,
    unique: true,
    required: [true, 'Driver license is required.'],
    uppercase: true,
    match: [/^[0-9A-Z-]+$/g, 'The driver license can only contain letters, numbers and hyphen characters.']
  },
  firstName: {
    type: String,
    required: [true, 'Driver\'s first name is required.'],
    match: [/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g, 'First name can only contain the following characters: a-z, A-Z, \', hyphen and space.']
  },
  lastName: {
    type: String,
    required: [true, 'Driver\'s last name is required.'],
    match: [/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g, 'Last name can only contain the following characters: a-z, A-Z, \', hyphen and space.']
  },
  creditCard: creditCardSchema
})

module.exports = driverSchema
