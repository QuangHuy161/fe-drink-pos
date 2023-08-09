import "./login.scss"
import React, {useRef, useState, useContext} from "react"
import Axios from "axios"
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate, useLocation } from 'react-router-dom';


function Login(props) {
  
  const  [auth,setAuth]  = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  let [authMode, setAuthMode] = useState("signin")
  let [fullname,setFullname] = useState ("admin")
  let [role,setRole] = useState ("staff")
  let [password,setPassword] = useState ("admin123")
  const [register, setRegister] = useState(false);
  const [islogin, setLogin] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(authMode ==='signin'){
        Axios.post('http://103.229.53.71:5000/login',{
        fullname:fullname,
        password:password
      }).then((result) => {
        setLogin(true)
        setRole(result.data.role)
        let t = {
          fullname: result.data.fullname,
          role: result.data.role,
          token: result.data.token
        }
        setAuth(t)
        console.log(authMode)
        localStorage.setItem("acc",JSON.stringify(t))
        // navigate(from, { replace: true });

        if(result.data.role==='admin')
          window.location.href = "/admin";
          else{
            window.location.href = "/banhang";
          }
        navigate(from, { replace: true });
      })
      .catch((error) => {console.log(error);})
      
      
    }
    else{
      Axios.post('http://103.229.53.71:5000/auth/signup',{
        fullname:fullname,
        password:password,
        role:'staff'
      }).then((result) => {
        setRegister(true);
        alert("Submited");
      })
      .catch((error) => {
        error = new Error();
      });
    }

    

  }

  const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
    <div className="Auth">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Fullname</label>
              <input
              onChange={(e) => {setFullname(e.target.value)}}
                type="text"
                className="form-control mt-1"
                placeholder="Enter fullname"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              onChange={(e) => {setPassword(e.target.value)}}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            {islogin ? (
            <p className="text-success">You Are Logged in Successfully</p>
          ) : <></>}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    )
  }

  return (
    <div className="Auth">
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                Sign In
                </span>
            </div>
            <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                onChange={(e) => {setFullname(e.target.value)}}
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                />
            </div>
            
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                onChange={(e) => {setPassword(e.target.value)}}
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                />
            </div>
            {register ? (
              <p className="text-success">You Are Registered Successfully</p>
            ) : (
              <p className="text-danger">You Are Not Registered</p>
            )}
            <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                Submit
                {Login}
                </button>
            </div>
            <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
            </p>
            </div>
        </form>
        </div>
        
    </div>
  )
}

export default Login;