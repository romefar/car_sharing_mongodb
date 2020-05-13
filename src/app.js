const express = require('express')
const chalk = require('chalk')
const connect = require('./db/mongoose')
require('dotenv/config')

const carsRoute = require('./routes/cars')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/v1/', carsRoute)

connect()
  .then(() => {
    require('./initialData')
    console.log(chalk.green('\n - Succesfully connected to the database.'))
    app.listen(port, () => {
      console.log(chalk.green(` -- Server is running on port ${port}.`))
    })
  })
  .catch(err => {
    console.log(chalk.red(`An error was occured. ${err}`))
  })
