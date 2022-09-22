import { useState } from "react"
import Navbar from "./navbar"
import axios from 'axios'
import {authenticate,getUser} from '../service/authorize'
import Swal from "sweetalert2"
import {withRouter} from 'react-router-dom'
import { useEffect } from "react"


const Login = (props) =>{

    const [state,setState] = useState({
        username:"",
        password:""
    })
    
    const {username,password} = state
    
    const inputValue=name=>event=>{
        // console.log(name,event.target.value)
        setState({...state,[name]:event.target.value})
    }
    
    const submitdata=(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            authenticate(response,()=>props.history.push("/create"))
        }).catch(err=>{
            console.log(err.response.data)
            Swal.fire(
                "Failed",
                err.response.data.error,
                "error"
              )
        })
    }

    useEffect(()=>{
        getUser() && props.history.push('/')
    },[])

    

    return(
        <div className="container p-5">
            <Navbar></Navbar>
        <h1>Login</h1>
        <form onSubmit={submitdata}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={inputValue('username')}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={inputValue('password')}/>
            </div>
            <br/>
            <input type="submit" value="Login" className="btn btn-primary m-20"></input>
            <a className="btn btn-success" href="/">Home</a>
        </form>

      </div>
    )
}

export default withRouter(Login)