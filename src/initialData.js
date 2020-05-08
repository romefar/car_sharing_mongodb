const Car = require('./models/car')
const chalk = require('chalk');

(async () => {
  const cars = [
    {
      vin: '1G3NL52E14C172187',
      registrationNumber: '3467AB7',
      productionInfo: {
        brand: 'Audi',
        model: 'A5',
        date: '2019-10-10'
      },
      status: 'Free',
      fuelCapacity: 60,
      fuelLevel: 60,
      mileage: 145000,
      geometry: {
        coordinates: [
          -121.56545,
          30.56545
        ]
      },
      useCounter: 3
    },
    {
      vin: 'JM3TB2BA6B0338277',
      registrationNumber: '8899AB5',
      productionInfo: {
        brand: 'Audi',
        model: 'A4',
        date: '2014-10-10'
      },
      status: 'Free',
      fuelCapacity: 55,
      fuelLevel: 55,
      mileage: 231000,
      geometry: {
        coordinates: [
          -21.32453,
          30.56545
        ]
      },
      useCounter: 3
    },
    {
      vin: '1G1AF5F59A7192992',
      registrationNumber: '7777BA7',
      productionInfo: {
        brand: 'Alha Romeo',
        model: '159',
        date: '2011-05-01'
      },
      status: 'Free',
      fuelCapacity: 40,
      fuelLevel: 40,
      mileage: 211500,
      geometry: {
        coordinates: [
          40.8657,
          -73.97987
        ]
      },
      useCounter: 210
    },
    {
      vin: '2C4RC1BG1FR644488',
      registrationNumber: '5091BA5',
      productionInfo: {
        brand: 'Volkswagen',
        model: 'Phaeton',
        date: '2013-11-05'
      },
      status: 'Free',
      fuelCapacity: 60,
      fuelLevel: 60,
      mileage: 189000,
      geometry: {
        coordinates: [
          25.230102,
          53.35710
        ]
      },
      useCounter: 4
    },
    {
      vin: 'JNKCV54E87M934488',
      registrationNumber: '5000CA3',
      productionInfo: {
        brand: 'MINI',
        model: 'Cooper',
        date: '2019-11-05'
      },
      status: 'Free',
      fuelCapacity: 60,
      fuelLevel: 60,
      mileage: 45000,
      geometry: {
        coordinates: [
          40.7295,
          -73.7422
        ]
      },
      useCounter: 3
    }
  ]

  try {
    // for (let i = 0; i < cars.length; i++) {
    //   const car = new Car(cars[i])
    //   await car.save()
    // }
    await Car.insertMany(cars)
  } catch (error) {
    console.log(chalk.red('An error was occured while creating new Car\n'), error)
  }
})()
