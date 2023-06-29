const express = require('express')
const router = express.Router()
const { 
    getBlogs, 
    getUserBlogs, 
    createBlogs, 
    updateBlogs, 
    deleteBlogs,
    searchBlogs
} = require('../controllers/blogController')


const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getBlogs).post(protect,createBlogs)
router.route('/:id').put(protect, updateBlogs).delete(protect,deleteBlogs)
router.get('/myblogs', protect, getUserBlogs)
router.get('/search',  protect, searchBlogs)



module.exports = router