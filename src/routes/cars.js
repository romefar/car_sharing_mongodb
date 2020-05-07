const express = require('express')
const router = new express.Router()
const Car = require('../models/car')

router.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body)
    await car.save()
    res.status(201).send(car)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find({}, '-__v')
    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
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
    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
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
    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/cars/:id/authorize', async (req, res) => {
  try {
    const { id } = req.params

    const car = await Car.findOneAndUpdate({ _id: id, 'currentRun.driver.creditCard.isAuthorized': false }, {
      $set: {
        'currentRun.driver.creditCard.isAuthorized': true
      }
    }, { new: true })

    if (!car) return res.status(404).send({ error: 'Cannot authorize a credit card.' })

    res.send(car)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/cars/:id/book', async (req, res) => {
  try {
    const { id } = req.params
    const { driver, creditCard } = req.body
    const carOld = await Car.findById(id)

    if (!carOld) return res.status(404).send({ error: 'Car was not found.' })
    if (carOld.currentRun) return res.status(409).send({ error: 'Car is already in use.' })

    const booking = {
      status: 'Booked',
      startFuelLevel: carOld.fuelLevel,
      startMileage: carOld.mileage,
      driver: {
        ...driver,
        creditCard
      }
    }

    const car = await Car.findOneAndUpdate({ _id: id }, {
      $set: {
        status: 'Reserved',
        currentRun: {
          startFuelLevel: carOld.fuelLevel,
          startMileage: carOld.mileage,
          driver: {
            ...driver,
            creditCard
          }
        }
      },
      $push: {
        bookingsHistory: booking
      }
    }, { new: true })

    res.send(car || [])
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/cars/:id/active', async (req, res) => {
  try {
    const { id } = req.params

    const car = await Car.findOneAndUpdate({ _id: id, 'currentRun.driver.creditCard.isAuthorized': true, 'bookingsHistory.status': 'Booked' }, {
      $set: {
        status: 'In use',
        'currentRun.startDate': new Date().toJSON(),
        'bookingsHistory.$.status': 'Active'
      }
    }, { new: true })

    if (!car) return res.status(404).send({ error: 'You are not allowed to book a car with abauthorized card.' })

    res.send(car || [])
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/cars/:id/end', async (req, res) => {
  try {
    const { id } = req.params
    const { finishFuelLevel, finishMileage } = req.body
    const carOld = await Car.findById(id)

    if (!carOld) return res.status(404).send({ error: 'Car was not found.' })

    const car = await Car.findOneAndUpdate({ _id: id, 'bookingsHistory.status': 'Active' }, {
      $set: {
        status: 'Free',
        fuelLevel: finishFuelLevel,
        mileage: finishMileage,
        currentRun: null,
        'bookingsHistory.$.status': 'Closed',
        'bookingsHistory.$.finishFuelLevel': finishFuelLevel,
        'bookingsHistory.$.finishMileage': finishMileage,
        'bookingsHistory.$.endDate': new Date().toJSON()
      }
    }, { new: true })

    res.send(car || [])
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/cars/unauthorized', async (req, res) => {
  try {
    const cars = await Car.find({
      status: 'Reserved',
      'currentRun.driver.creditCard.isAuthorized': false
    }, 'vin geometry.coordinates currentRun.driver.firstName currentRun.driver.lastName currentRun.driver.licenseNumber')
    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/cars/service', async (req, res) => {
  try {
    const cars = await Car.findOneAndUpdate({
      $and: [
        { status: 'Free' },
        {
          $or: [
            {
              'productionInfo.date': {
                $lte: `${new Date().getFullYear()}-01-01`
              }
            },
            {
              mileage: {
                $gte: 100000
              }
            }
          ]
        }
      ]
    }, {
      status: 'In service'
    }, { new: true })

    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/cars/relocate', async (req, res) => {
  try {
    const cars = await Car.findOneAndUpdate({
      $and: [
        {
          useCounter: {
            $gte: 2
          }
        },
        {
          status: {
            $nin: ['In use', 'Reserved']
          }
        }
      ]
    }, {
      geometry: {
        coordinates: [53.8882836, 27.5442615]
      }
    })

    res.send(cars || [])
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/cars', async (req, res) => {
  try {
    const { vin } = req.body
    console.log(vin)
    const car = await Car.findOneAndRemove({ vin })

    if (!car) return res.status(404).send({ error: 'Car was not found.' })

    res.send(car)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
