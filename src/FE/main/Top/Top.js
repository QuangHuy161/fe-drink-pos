import User from "./User/User";
function Top({auth}){
    return(
        <div className="top">
            <User auth={auth}/>
        </div>
    )
}

export default Top;