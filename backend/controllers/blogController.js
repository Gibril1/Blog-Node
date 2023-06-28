const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Blogs = require('../models/blog')
const User = require('../models/userModel')
const blog = require('../models/blog')

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blogs.find()
    res.status(200).json(blogs)
})

const createBlogs = asyncHandler(async (req, res) => {
    
    const { title, content } = req.body

    if (!title || !content) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const blog = await Blogs.create({
        author: req.user.id,
        title,
        content,
    })
    res.status(201).json(blog)
})

const updateBlogs = asyncHandler(async (req, res) => {
    const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400);
    throw new Error('Invalid blog ID');
    }
    
    const blog = await Blogs.findById(blogId)

    if (!blog) {
        res.status(404)
        throw new Error('Blog does not exist')
    }

    const { title, content } = req.body


    if (!title || !content) {
        res.status(400)
        throw new Error('Please enter all fields')
  }
  

    if(blog.author.toString() !== req.user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }

    blog.title = title
    blog.content = content
    await blog.save()

    res.status(200).json(blog)
})

const deleteBlogs = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400);
    throw new Error('Invalid blog ID');
  }
  
  const blog = await Blogs.findById(blogId)
  
    if(!blog){
        res.status(400)
        throw new Error('Blog cannot be found')
    }

    

    if(blog.author.toString() !== req.user.id){
        res.status(401)
        throw new Error('User is not authorized')
    }

    await blog.remove()
    res.status(200).json({id: blogId})
})

const getUserBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blogs.find({ author: req.user.id })
    res.status(200).json(blogs)   
})

const searchBlogs = asyncHandler(async (req, res) => {
    const { query, startDate, endDate } = req.query;
  
    // Create the search query object
    const searchQuery = {};
  
    if (query) {
      // Search by title or content (case-insensitive)
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ];
    }
  
    if (startDate && endDate) {
      // Search by date range
      searchQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
  
    try {
      const blogs = await Blogs.find(searchQuery).populate('author');
  
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  });
  
module.exports = {
    getBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs,
    getUserBlogs,
    searchBlogs
}