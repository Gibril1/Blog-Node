const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')
// @desc Get all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
}) 
// @desc Get user blogs
// @route GET /api/blogs
// @access Private
const getUserBlogs = asyncHandler(async(req, res) => {
    const blogs = await Blog.find({ user: req.user.id })
    res.status(200).json(blogs)
}) 
// @desc Set users blogs
// @route POST /api/blogs
// @access Private
const setBlogs = asyncHandler(async(req, res) => {
    if(!req.body.title || !req.body.content){
        res.status(400)
        throw new Error('Please add all the fields')
    }
    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id
    })

    res.status(200).json(blog)
}) 
// @desc Update users blogs
// @route PUT /api/blogs
// @access Private
const updateBlogs = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in use matches the author of the blog post
    if (blog.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new : true})

    res.status(200).json(updatedBlog)
} )
// @desc delete users blogs
// @route DELETE /api/blogs
// @access Private
const deleteBlogs = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Making sure the logged in use matches the author of the blog post
    if (blog.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

    await blog.remove()
    res.status(200).json({ id: req.params.id })
} )

module.exports = {
    getBlogs,
    getUserBlogs,
    setBlogs,
    updateBlogs,
    deleteBlogs
}