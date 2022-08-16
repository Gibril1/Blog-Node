const express = require('express')
const { get } = require('mongoose')
const router = express.Router()

const { 
    getBlogs, 
    setBlogs, 
    updateBlogs, 
    deleteBlogs
    } = require('../controllers/blogController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect,getBlogs).post(protect,setBlogs)
router.route('/:id').put(protect,updateBlogs).delete(protect,deleteBlogs)


module.exports = router