const jwt  = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
const authenticationMiddleware = async (req,res, next) => {
   const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    // JS munipulating strings. 
    throw  new UnauthenticatedError('No token Provided')
  }
  const token = authHeader.split(' ')[1] // @ index 0 , it is `Bearer`
  /**Verification: */
  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    const {id,username} = decode
    req.user =  {id,username}
    next()
  } catch (error) {
    throw  new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware