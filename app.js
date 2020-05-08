const express = require('express')
const chalk = require('chalk')
require('./src/db/mongoose')
require('dotenv/config')
require('./src/initialData')

const carsRoute = require('./src/routes/cars')

const app = express()
const port = process.env.DB_DEV_PORT || 3000
app.use(express.json())
app.use('/api/v1/', carsRoute)

app.listen(port, () => {
  console.log(chalk.green(`The server is running on port ${port}`))
})

//  C:/Users/Vladislav/mongodb/bin/mongod.exe --dbpath=C:/Users/Vladislav/mongodb-data
