const mongoose = require('mongoose')

/**
 * Mongoose is the ORM ODM ~ Object Data Mapper
 * A model is the interface to the db
 * Set up all documents we shall need */
const taskSchema = new mongoose.Schema({
  /**basic validation  */
  name: {
    type:String,
    required:[true,'Must provide name'],
    trim: true,
    maxLength:[15,'Name must not have more than 15 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
})
// Todo Validation is required at this point, aside from the above.

// Use this model from the controllers.

module.exports = mongoose.model('Tasks',taskSchema)