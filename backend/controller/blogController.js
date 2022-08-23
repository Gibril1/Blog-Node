const asyncHandler = require('express-async-handler')
// @desc Get all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get blogs'})
}) 
// @desc Get user blogs
// @route GET /api/blogs
// @access Private
const getUserBlogs = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get User blogs'})
}) 
// @desc Set users blogs
// @route POST /api/blogs
// @access Private
const setBlogs = asyncHandler(async(req, res) => {
    if(!req.body.title || !req.body.content){
        res.status(400)
        throw new Error('Please add all the fields')
    }
    res.status(200).json({ message: 'Set blogs'})
}) 
// @desc Update users blogs
// @route PUT /api/blogs
// @access Private
const updateBlogs = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update Blog ${req.params.id}`})
} )
// @desc delete users blogs
// @route DELETE /api/blogs
// @access Private
const deleteBlogs = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete Blog ${req.params.id}`})
} )

module.exports = {
    getBlogs,
    getUserBlogs,
    setBlogs,
    updateBlogs,
    deleteBlogs
}