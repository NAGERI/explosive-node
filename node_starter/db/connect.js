const mongoose = require('mongoose')

const connectDB = (url) => {
 return mongoose
  .connect(url,{ /**Only set for version below 6 */
   useNewUrlParser: true
  ,useCreateIndex:true
  ,useFindAndModify:false
  ,useUnifiedTopology:true
})
}
/**This will return a promise */

module.exports = connectDB