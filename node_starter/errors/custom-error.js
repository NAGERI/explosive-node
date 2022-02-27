
class CustomAPIError extends Error {
  constructor(message,statusCode){
    super(message)
    this.statusCode = statusCode
  }
}

const createCustomError = (msg,sCode) => {
  return new CustomAPIError(msg, sCode) 
}

module.exports = { createCustomError,CustomAPIError}