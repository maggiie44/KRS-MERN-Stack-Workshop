const express = require('express')
const router = express.Router()
const {create,getAllBlogs,singleBlog,singleBlogById,remove,update} = require('../controller/blogcontroller')
const {requireLogin} = require("../controller/authController")



router.post('/create',requireLogin,create)

router.get('/blogs',getAllBlogs)
router.get('/blog/:slug',singleBlog)

router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)
// router.get('/blog/:id',singleBlogById)

module.exports=router