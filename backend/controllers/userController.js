const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const registerUser = asyncHandler(async (req, res) => {
    
    const { name, email, password } = req.body

    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all the fields')
    }

    if (!(validator.isEmail(email) && validator.isAlpha(name))) {
        res.status(400);
        throw new Error('Invalid User Data');
    }    


    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password:hashed_password
    })

    if(user){
        res.status(201).json({
            message: `An account has been created for ${name}`,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body 

    if(!email || !password){
        res.status(400)
        throw new Error('Please enter fields')
    }

    const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)){
        res.status(200)
        res.json({
            message: 'Successful Login',
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Login Failed')
    }
})

const getUser = asyncHandler(async(req, res) => {
    const {_id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}