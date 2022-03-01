const express = require('express')
const logger = require('morgan')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect') 
require('dotenv').config()  /**This file is run instantly  */
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

/** middleware */
app.use(express.static('./public'))
app.use(express.json())
app.use(logger('dev'))

/** routes */
app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log('Error Occured in server connection.')   
  }
}
start()