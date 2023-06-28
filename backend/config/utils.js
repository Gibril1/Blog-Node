const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Blog = require('../models/blog')

let payload = {
    id: null
}

const getTestUserToken = async () => {
    const testUser = await User.create({
        name: 'testuser',
        email: 'testing@test.com',
        password: 'testpassword'
    })

    payload.id = testUser._id

    const token = jwt.sign(payload, process.env.JWT_SECRET)


    return {
        token,
        id: payload.id
    }
}

const createBlog = async () => {

    const testBlog = await Blog.create({
        title: 'this is a test blog',
        content: 'this is a test content',
        author: payload.id
    })

    return testBlog
}

module.exports = {
    getTestUserToken,
    createBlog
}