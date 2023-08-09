import { useLocation, Navigate, Outlet} from "react-router-dom";
import {
    Link
  } from "react-router-dom";
import Order from "../Order/Order";
import Main from "../Main";
import Create from "../Supplies/Create";
import { useState, useEffect } from "react";
const RequireAuth = ({ allowedRoles}) => {
    
    return (
        JSON.parse(localStorage.getItem('acc')).role===allowedRoles && JSON.parse(localStorage.getItem('acc')).role==="admin" ?
                <Main/>
            : 
            <Order/>
    );
}

export default RequireAuth;