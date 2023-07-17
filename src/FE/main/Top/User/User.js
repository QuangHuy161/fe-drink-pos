import icon_user from "../../../../img/icon-user.png"
import "./User.scss"
function User(){
    return(
        <div className="user p-2 text-end border-bottom">
            <div className="avatar">
                <img className="rounded-circle" src={icon_user} alt="" />
                <span className="name m-2">Nguyễn Văn A</span>
            </div>
        </div>
    )
}

export default User;