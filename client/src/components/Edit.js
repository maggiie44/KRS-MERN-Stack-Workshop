import axios from "axios"
import { useState,useEffect } from "react"
import Navbar from "./navbar"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import { getToken } from "../service/authorize"


const Edit =(props)=>{

    const [state,setState]=useState({
        title:"",
        author:"",
        slug:""

    })
    const [content,setContent] = useState('')
    const {title,author,slug} = state


    const submitcontent=(e)=>{
        setContent(e)
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...setState,title,author,slug})
            setContent(content)
        }).catch(err=>alert(err))
    },[])

    const inputValue=name=>event=>{
        // console.log(name,event.target.value)
        setState({...state,[name]:event.target.value})
    }

    const submitdata=(e)=>{
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`}
            }
        )
        .then(response=>{
            Swal.fire('แจ้งเตือน','Update Success','success')
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>{
            alert(err)
        })
        // e.preventDefault()
        // console.log(state)
        // axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author})
        // .then(response=>{
        //     Swal.fire(
        //         "Good job!",
        //         "You clicked the button!",
        //         "success"
        //       )
        //       setState({...state,title:"",content:"",author:""})
        // })
        // .catch(err=>{
        //     // alert(err.response.data.error)
        //     Swal.fire(
        //         "Failed",
        //         err.response.data.error,
        //         "error"
        //       )
        // })

        }


    const showUpdateForm=()=>( 
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
                style={{border:'1px solid'}}></ReactQuill>
        </div>
        <div className="form-group">
            <label>Author</label>
            <input type="text" className="form-control" value={author} onChange={inputValue('author')}/>
        </div>
        <br/>
        <input type="submit" value="อัพเดท" className="btn btn-primary m-20"></input>
        <a className="btn btn-success" href="/">Home</a>
    </form>
    )
    

    return(
        <div className="container">
            <Navbar/>
            {showUpdateForm()}
        </div>
    )

}

export default Edit;