const jwt  = require('jsonwebtoken')
const {BadRequestError} = require('../errors')
const login = async (req,res) => {
  const {username,password} = req.body
  // check if values are present (can be done using Joi pkg or mongoose validation)
  if(!username || !password){
    // No need to use next() since we are using express-async-errors pkg
    throw new BadRequestError('Please provide username and Password')
  }
  
const id = new Date().getDate()
/* Try keeping small payload, for better user experience.
   In prod use long, complex and unguessable string values
   Only kept on the server
*/
  const token = jwt.sign({id,username}, process.env.JWT_SECRET,{expiresIn:'30d'}) 
  res.status(200).json({msg:'User Created',token})
}
const dashboard = async (req,res) => {
  
  const luckynumber = Math.floor(Math.random()*100)
  res.status(200).json({msg: `Hello ${req.user.username}`,secret: `Here is your auth data, and lucky number is ${luckynumber}`})
  
}

module.exports = {
  login,dashboard
}