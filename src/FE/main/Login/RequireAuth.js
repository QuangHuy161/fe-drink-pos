import { useLocation, Navigate, Outlet} from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import {
    Link
  } from "react-router-dom";
import Order from "../Order/Order";
import Main from "../Main";
import Create from "../Supplies/Create";
const RequireAuth = ({ allowedRoles }) => {
    const auth  = useContext(AuthContext);
    console.log(allowedRoles===auth.role)
    const location = useLocation();
    return (
        auth.role===allowedRoles && auth.role==="admin" ?
            <div>
                <Main/>
            </div>
            
            : 
            <Order/>
    );
}

export default RequireAuth;