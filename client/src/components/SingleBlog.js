import axios from "axios"
import { useEffect, useState } from "react"
import HTMLRenderer from "react-html-renderer"
import Navbar from "./navbar"

const SingleBlog=(props)=>{

    const [blog,SetBlog]= useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response =>{
            SetBlog(response.data)
        }).catch(err=>alert(err))
    },[])


    return (

        <div className="container">
            <Navbar/>
            {blog && 
            <div>
            <h1>{blog.title}</h1>
            <HTMLRenderer html={blog.content}></HTMLRenderer>
            <p className="text-muted">Author::{blog.author} , Date:{new Date(blog.createdAt).toLocaleString()}</p>
            </div>
            }
          </div>
        
    )
}

export default SingleBlog
