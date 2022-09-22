import { useState } from "react";
import Navbar from "./navbar";
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HTMLRenderer from 'react-html-renderer'
import { getUser,getToken } from "../service/authorize";




const FormComponent =()=>{

    const [state,setState]=useState({
        title:"",
        author:getUser()
    })

    const [content,setContent]=useState('')

    const {title,author} = state

    const inputValue=name=>event=>{
        // console.log(name,event.target.value)
        setState({...state,[name]:event.target.value})
    }

    const submitcontent=(e)=>{
        setContent(e)
    }

    const submitdata=(e)=>{
        e.preventDefault()
        // console.log(state)

        axios.post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`}
            }
        )
        .then(response=>{
            Swal.fire(
                "Good job!",
                "You clicked the button!",
                "success"
              )
              setState({...state,title:"",author:""})
              setContent('')
        })
        .catch(err=>{
            // alert(err.response.data.error)
            Swal.fire(
                "Failed",
                err.response.data.error,
                "error"
              )
        })

        }
    

    return (
        <div className="container p-5">
            <Navbar></Navbar>
        <h1>Form component</h1>
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitdata}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={inputValue('title')}/>
            </div>
            <div className="form-group">
                <label>Title</label>
                <ReactQuill 
                value={content} 
                onChange={submitcontent} 
                theme='snow' 
                className="pb-5 mb-3"
                placeholder="Enter content detail"
                style={{border:'1px solid'}}></ReactQuill>
            </div>
            <div className="form-group">
                <label>Author</label>
                <input type="text" className="form-control" value={author} onChange={inputValue('author')}/>
            </div>
            <br/>
            <input type="submit" value="บันทึก" className="btn btn-primary m-20"></input>
            <a className="btn btn-success" href="/">Home</a>
        </form>

      </div>
    )
}

export default FormComponent;