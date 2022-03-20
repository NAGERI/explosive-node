 const express = require('express')
 const router = express.Router()

 const {login,dashboard} = require('../controllers/main')
 const authMiddleware = require('../middleware/auth')

 router.route('/login').post(login)
 /**A request will have to go through the middleware before auth */
 router.route('/dashboard').get(authMiddleware,dashboard)

 module.exports = router