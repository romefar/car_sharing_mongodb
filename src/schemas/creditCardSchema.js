const { Schema } = require('mongoose')

const creditCardSchema = new Schema({
  cardnumber: {
    type: String,
    unique: true,
    required: [true, 'Card number is required.'],
    match: [/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g, 'Invalid card number.']
  },
  cardHolder: {
    type: String,
    required: [true, 'Car holdrer value is required.'],
    uppercase: true,
    match: [/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g, 'Card holder name can only contain the following characters: a-z, A-Z, \', hyphen and space.']
  },
  cardValidDate: {
    type: Date,
    required: [true, 'Card valid date is required.'],
    max: [new Date().toJSON().slice(0, 10), 'You cannot use an expired credit card.']
  },
  isAuthorized: {
    type: Boolean,
    default: false
  }
})

module.exports = creditCardSchema
