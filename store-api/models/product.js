const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name:{
     type:String
    ,reqired: [true,'Product name must be provided']
  },
  price:{
     type:Number
    ,reqired: [true,'Product price must be provided']
  },
  featured:{
     type:Boolean
    ,reqired: false
  },
  rating:{
    type: Number
    ,default: 4.5
  },
  CreatedAt:{
    type: Date
    ,default: Date.now()
  },
  company:{
    type: String
   ,enum:{
      values: ['ikea','liddy','caressa', 'marcos']
     ,message: '{VALUE} is not supported'
    }
    // ,enum: ['ikea','liddy','caressa', 'marcos'] /**my Guard rails */
  }
})

module.exports = mongoose.model('Product',productSchema)