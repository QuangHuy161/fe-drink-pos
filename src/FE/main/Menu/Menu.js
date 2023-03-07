import "./menu.scss"
import { Link } from 'react-router-dom'
function Menu( ){
    let el=[
        {title:"banhang",value:"Order"},
        {title:"nhanvien",value:"Nhân Viên"},
        {title:"vattu",value:"Vật tư"}
    ];
    let T='';
    for (let index = 0; index < el.length; index++) {
        let t =`
            <div class="row m-1 ">
                <button type="button" class="btn btn-menu rounded-1">
                    <a href=${"/" + el[index].title} class="nav-link">
                        ${el[index].value}
                    </a>
                </button>
            </div>
        `
        T+=t;
    }

    return(
        <div id="menu" class="col col-2" dangerouslySetInnerHTML={{__html: T}}>
        </div>
        
    );
}

export default Menu;