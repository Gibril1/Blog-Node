const asyncHandler = require('express-async-handler')
const Blogs = require('../models/blog')

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blogs.find()
    res.status(200).json(blogs)
})

const setBlogs = asyncHandler(async (req, res) => {
    if(!req.body){
        res.status(400)
        throw new Error ('Please enter the contents')
    }

    const blog = await Blogs.create({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        user: req.author.id
    })
    


    res.status(200).json(blog)
})

const updateBlogs = asyncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog cannot be found')
    }

    const user = await User.find(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User cannot be found')
    }

    if(blog.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new:true})
    res.status(200).json(updatedBlog)
})

const deleteBlogs = asyncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog cannot be found')
    }

    const user = await User.find(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User cannot be found')
    }

    if(blog.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }

    await blog.remove()
    res.status(200).json({id: req.parans.id})
})

module.exports = {
    getBlogs,
    setBlogs,
    updateBlogs,
    deleteBlogs
}