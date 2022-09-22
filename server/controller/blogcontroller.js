const slugify = require('slugify')
const Blog = require('../model/blogSchema')
const { v4: uuidv4 } = require('uuid');


exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    Blog.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })
}

exports.getAllBlogs=(req,res)=>{
    Blog.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

exports.singleBlog=(req,res)=>{
    const slug = req.params
    console.log(slug)
    Blog.findOne(slug).exec((err,blogs)=>{
        res.json(blogs)
    })
  
}

exports.singleBlogById=(req,res)=>{
    const contentId = req.params.id
    console.log(contentId)
    Blog.findById(contentId).exec((err,blog)=>{
        res.json(blog)
    })

}

exports.remove=(req,res)=>{
    const {slug} = req.params
    Blog.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err)console.log(err)
        res.json({
            message:"Delete Suscess"
        })
    })
}

exports.update=(req,res)=>{
    const {slug} = req.params
    const {title,content,author} =req.body
    Blog.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
    
}