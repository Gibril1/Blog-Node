const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRETS)

            // GET USER FROM THE TOKEN
            req.user = User.findById(decoded.id).select('-password')
            next()
        } catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorised. No token')
    }
})

module.exports = { protect }