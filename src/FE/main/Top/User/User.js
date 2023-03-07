import icon_user from "../../../../img/icon-user.png"
import "./User.scss"
function User(){
    return(
        <div class="user p-2 text-end border-bottom">
            <div class="avatar">
                <img class="rounded-circle" src={icon_user} alt="" />
                <span class="name m-2">Nguyễn Văn A</span>
            </div>
        </div>
    )
}

export default User;