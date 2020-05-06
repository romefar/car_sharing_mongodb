const express = require('express')
const router = express.Router()
const Car = require('../models/car')

router.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body)
    await car.save()
    res.status(201).send(car)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find({}, '-__v')
    res.send(cars)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/cars/active', async (req, res) => {
  try {
    const cars = await Car.find({
      $expr: {
        $and: [
          { $lte: ['$fuelLevel', { $divide: ['$fuelCapacity', 0.25] }] },
          { $eq: ['$status', 'In use'] }
        ]
      }
    }, '-__v')
    res.send(cars)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/cars/reserved', async (req, res) => {
  try {
    const cars = await Car.find({
      $expr: {
        $and: [
          { $eq: ['$status', 'Reserved'] },
          { $eq: ['$currentRun.driver.creditCard.isAuthorized', false] }
        ]
      }
    }, '-__v')
    res.send(cars)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/cars/:id/book', async (req, res) => {
  try {
    const { id } = req.params
    const { driver, creditCard } = req.body
    const car = await Car.findById(id)

    if (!car) throw new Error('Unable to find the car.')

    car.status = 'Reserved'

    car.currentRun = {
      startFuelLevel: car.fuelLevel,
      startMileage: car.mileage,
      driver: {
        ...driver,
        creditCard
      }
    }
    // await car.save()

    const booking = {
      status: 'Booked',
      startFuelLevel: car.fuelLevel,
      startMileage: car.mileage,
      driver: {
        ...driver,
        creditCard
      }
    }
    car.bookingsHistory.push(booking)
    await car.save()

    res.send('asdasdasdas')
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
