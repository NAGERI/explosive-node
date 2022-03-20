const jwt  = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
const login = async (req,res) => {
  const {username,password} = req.body
  // check if values are present (can be done using Joi pkg or mongoose validation)
  if(!username || !password){
    // No need to use next() since we are using express-async-errors pkg
    throw new CustomAPIError('Please provide username and Password',400)
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
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    // JS munipulating strings. 
    throw  new CustomAPIError('No token Provided',401)
  }
  const token = authHeader.split(' ')[1]
  /**Verification: */
  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode)    
    const luckynumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello ${decode.username}`,secret: `Here is your auth data, and lucky number is ${luckynumber}`})
  } catch (error) {
    throw  new CustomAPIError('Not authorized to access this route',401)
  }
}

module.exports = {
  login,dashboard
}