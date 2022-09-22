import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import HTMLRenderer from 'react-html-renderer'
import { getUser,getToken } from "./service/authorize";


function App() {


  const [blogs,setBlogs] = useState([])

  const fetchData =()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
  }).catch(err=>{
    alert(err)
  })
  }

  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog =(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
          authorization:`Bearer ${getToken()}`}
      }
    )
    .then(response=>{
      Swal.fire('Delete!',response.data.message,'success')
      fetchData()
    }).catch(err=>console.log(err))

  }

  return (
    <div className="container">
      <Navbar></Navbar>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:"1px solid"}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
          <h2>{blog.title}</h2>
          </Link>
          <p><HTMLRenderer
          html={blog.content.substring(0,180)}></HTMLRenderer></p>
          <p className="text-muted">Author::{blog.author} , Date:{new Date(blog.createdAt).toLocaleString()}</p>
          {getUser() && 
            <div>
              <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>EDIT Content</Link>
              <button  className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>Delete Content</button>  
            </div>
          }
          
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
