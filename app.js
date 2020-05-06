const express = require('express')
require('./src/db/mongoose')
require('dotenv/config')
const carsRoute = require('./src/routes/cars')

const app = express()
app.use(express.json())
app.use(carsRoute)

app.listen(process.env.DB_DEV_PORT, () => {
  console.log(`The server is running on port ${process.env.DB_DEV_PORT}`)
})
