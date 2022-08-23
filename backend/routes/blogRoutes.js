const express = require('express')
const router = express.Router()
const { 
    getBlogs, 
    getUserBlogs, 
    setBlogs, 
    updateBlogs, 
    deleteBlogs 
} = require('../controller/blogController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getBlogs).post(protect,setBlogs)
router.route('/:id').put(protect,updateBlogs).delete(protect,deleteBlogs)
router.get('/myblogs', protect, getUserBlogs)



module.exports = router