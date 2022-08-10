const express = require('express')
const { get } = require('mongoose')
const router = express.Router()
const { 
    getBlogs, 
    setBlogs, 
    updateBlogs, 
    deleteBlogs
    } = require('../controllers/blogController')

router.get('/', getBlogs)
router.post('/', setBlogs)
router.put('/:id', updateBlogs)
router.delete('/:id', deleteBlogs)

module.exports = router