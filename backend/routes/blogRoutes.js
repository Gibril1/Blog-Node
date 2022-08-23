const express = require('express')
const router = express.Router()
const { getBlogs, getUserBlogs, setBlogs, updateBlogs, deleteBlogs } = require('../controller/blogController')

router.route('/').get(getBlogs).post(setBlogs)
router.route('/:id').put(updateBlogs).delete(deleteBlogs)
router.get('/myblogs', getUserBlogs)



module.exports = router