// @desc Get all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = (req, res) => {
    res.status(200).json({ message: 'Get blogs'})
} 
// @desc Get user blogs
// @route GET /api/blogs
// @access Private
const getUserBlogs = (req, res) => {
    res.status(200).json({ message: 'Get User blogs'})
} 
// @desc Set users blogs
// @route POST /api/blogs
// @access Private
const setBlogs = (req, res) => {
    res.status(200).json({ message: 'Set blogs'})
} 
// @desc Update users blogs
// @route PUT /api/blogs
// @access Private
const updateBlogs = (req, res) => {
    res.status(200).json({ message: `Update Blog ${req.params.id}`})
} 
// @desc delete users blogs
// @route DELETE /api/blogs
// @access Private
const deleteBlogs = (req, res) => {
    res.status(200).json({ message: `Delete Blog ${req.params.id}`})
} 

module.exports = {
    getBlogs,
    getUserBlogs,
    setBlogs,
    updateBlogs,
    deleteBlogs
}