import { Link,withRouter } from "react-router-dom";
import { getUser,logout } from "../service/authorize";

const Navbar=({history})=>{

    return(
        <nav>
            <ul className="nav nav-tabs">
                <li className="mt-100 nav-item nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                {getUser() &&
                <div>
                <li className="nav-item nav-item pr-3 pt-3 pb-3">
                    <Link to="/create" className="nav-link">Create cotent</Link>
                </li>
                </div>
                }
                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/login" className="nav-link">เข้าสู่ระบบ</Link>
                    </li>
                )}

                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button className="nav-link" onClick={()=>logout(()=>history.push("/"))}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default withRouter(Navbar);