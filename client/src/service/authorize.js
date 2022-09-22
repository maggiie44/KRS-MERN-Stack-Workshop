export const authenticate=(response,next)=>{
    if(window !== "undifined"){
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
        sessionStorage.setItem('user',JSON.stringify(response.data.username))
    }
    next()
}

export const getUser=()=>{
    if(window !== "undifined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

export const getToken=()=>{
    if(window !== "undifined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const logout=(next)=>{
    if(window !== "undifined"){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
    next()
}