require('dotenv').config()

const connectDB = require('./db/connect')
const modelProduct = require('./models/product')
const productJSON = require('./products.json')

const start = async () => {
  try {
     await connectDB(process.env.MONGO_URI)
     await  modelProduct.deleteMany()
     console.log('SUCCESS Deletion.')
     await modelProduct.create(productJSON)
     console.log('SUCCESS...')
     process.exit(0) // Exit the process ( node start)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()