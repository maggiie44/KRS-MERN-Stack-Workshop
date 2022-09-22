import {BrowserRouter,Switch,Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleBlog from "./components/SingleBlog"
import Edit from "./components/Edit"
import Login from "./components/Login"
import AdminRoute from "./AdminRoute"

const myRoute=()=>{
    return(
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={App}/>
        <AdminRoute path="/create" exact component={FormComponent}/>
        <Route path="/blog/:slug" exact component={SingleBlog}/>
        <AdminRoute path="/blog/edit/:slug" exact component={Edit}/>
        <Route path="/login" exact component={Login}/>
    </Switch>
    </BrowserRouter>
    )
}

export default myRoute