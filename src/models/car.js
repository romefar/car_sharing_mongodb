const { carSchema } = require('../schemas')
const { model } = require('mongoose')

const Car = model('Car', carSchema)

module.exports = Car
