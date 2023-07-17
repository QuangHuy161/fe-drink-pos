import "./login.scss"
import React, { useState } from "react"
import Axios from "axios"
import {
  Navigate,
  Route
} from "react-router-dom";
function Login(props) {
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
        if(result.data.role==='admin')
          window.location.href = "/admin";
          else{
            window.location.href = "/banhang";
          }
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
      })
      .catch((error) => {
        error = new Error();
      });
    }

    alert("Submited");

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
          ) : (
            <p className="text-danger">You Are Not Logged in</p>
          )}
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