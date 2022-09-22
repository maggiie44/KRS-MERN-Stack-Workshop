import { getUser } from "./service/authorize";
import { Redirect,Route } from "react-router-dom";

const AdminRoute = ({component:Component,...rest})=>(
    <Route 
    {...rest}
    render={props=>
        getUser() ? 
        (<Component {...props}></Component>) : 
        (<Redirect to={{pathname:"/login",state:{from:props.location}}}></Redirect>)
    }
    >

    </Route>
)

export default AdminRoute;