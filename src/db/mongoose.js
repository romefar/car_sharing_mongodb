const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(`mongodb://${process.env.DB_DEV_HOST}:${process.env.DB_DEV_DB_PORT}/${process.env.DB_DEV_NAME}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Succesfully connected to database.')
  })
  .catch(err => {
    console.log(err)
  })

mongoose.set('useCreateIndex', true)
