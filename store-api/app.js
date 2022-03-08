require('dotenv').config()
require('express-async-errors')
const logger = require('morgan')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')
const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')

// middleware
app.use(express.json())
app.use(logger('dev'))

// routes
app.get('/', (req,res) => {
  res.send('<h1>Store API</h1>')
})

app.use('/api/v1/products',productRouter)
app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port = process.env.PORT || 3000
const start = async () => {
    try {
      await  connectDB(process.env.MONGO_URI)
      app.listen(port,console.log(`Server listening on port ${port}...`))
   } catch (error) {
      console.log(error)
  }
}
start()