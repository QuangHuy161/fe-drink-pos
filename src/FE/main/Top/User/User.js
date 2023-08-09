import { useRef,useEffect } from "react";
import icon_user from "../../../../img/icon-user.png"
import "./User.scss"

function User(){
    const LogOut = () => {
        window.location.href="/"
    }
    return(
        <div className="user p-2 text-end border-bottom">
            <div className="avatar">
                <img className="rounded-circle" src={icon_user} alt="" />
                <span className="name m-2">{JSON.parse(localStorage.getItem('acc')).fullname}</span>
                <button className="btn btn-primary" onClick={LogOut}>Logout</button>
            </div>
        </div>
    )
}

export default User;