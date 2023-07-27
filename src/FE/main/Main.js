import Top from "./Top/Top";
import Supplies from "./Supplies/Supplies";
import Staff from "./Staff/staff";
import React, { useState } from "react"
import Donvi from "./Supplies/Donvi";
import Dropdown from 'react-bootstrap/Dropdown';
import Nhomvattu from "./Supplies/Nhomvattu";
import Mon from "./Supplies/Mon";
import Statis from "./Statis/Statis";
function Main(props ){

    let [pageMode, setPageMode] = useState("vattu")

    let t= (<div id="menu" className="col col-sm-2 " >

                <div className="row m-1">
                    <a href="/create" className="p-0">
                        <button  className="btn btn-menu btn-primary rounded-1 w-100" >
                            <span className="nav-link h4"  >
                            Tạo đơn vị và loại
                            </span>
                        </button>
                    </a>
                </div>

                <div className="row m-1">
                    <Dropdown className="bt btn btn-menu rounded-1">
                        <Dropdown.Toggle
                        className="text-wrap bt btn"
                        style={{
                            border: 'none',
                            color:'black',
                            background:'transparent',
                        }}>
                                Thống kê vật tư
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                        className="p-0"
                        style={{
                            background:'rgb(152, 221, 198)',
                            border: 'none',
                            color:'black',
                            borderRadius:'5px',
                            boxShadow: '0 0 12px rgb(45, 66, 59)'
                        }}
                        >
                            <Dropdown.Item
                            className="bt"
                            onClick={() => setPageMode("vattu")}
                            >
                                Vật tư
                            </Dropdown.Item>
                            <Dropdown.Item
                            className="bt"
                            onClick={() => setPageMode("donvi")}
                            >
                                Đơn vị
                            </Dropdown.Item>
                            
                            <Dropdown.Item
                            className="bt"
                            onClick={() => setPageMode("nhomvattu")}
                            >
                                Nhóm vật tư
                            </Dropdown.Item>
                            <Dropdown.Item
                            className="bt"
                            onClick={() => setPageMode("mon")}
                            >
                                Món và Công thức
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="row m-1">
                    <button  className=" bt btn btn-menu rounded-1">
                        <a href="/banhang" className="nav-link" >
                            Bán Hàng
                        </a>
                    </button>
                </div>

                <div className="row m-1">
                    <button  className=" bt btn btn-menu rounded-1" onClick={() => setPageMode("nhanvien")} >
                        <span className="nav-link"  >
                        Nhân Viên
                        </span>
                    </button>
                </div>

                <div className="row m-1">
                    <button  className=" bt btn btn-menu rounded-1" onClick={() => setPageMode("thongke")} >
                        <span className="nav-link"  >
                        Thống kê bán hàng
                        </span>
                    </button>
                </div>
            </div>
        )
    if(pageMode==='vattu')
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className="col col-sm-10">
                    <Supplies/>
                </div>
            </div>
        </div>
    )
    if(pageMode==='thongke')
        return(
            <div  >
                <div className="row">
                    <Top/>
                </div>
                <div className="row">
                    {t}
                    <div className="col col-sm-10">
                        <Statis/>
                    </div>
                </div>
            </div>
        )

    if(pageMode==='nhanvien')
        return(
            <div  >
                <div className="row">
                    <Top/>
                </div>
                <div className="row">
                    {t}
                    <div className="col col-sm-10">
                        <Staff/>
                    </div>
                </div>
            </div>
        )
    
    if(pageMode==='donvi')
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className="col col-sm-10">
                    <Donvi/>
                </div>
            </div>
        </div>
    )

    if(pageMode==='nhomvattu')
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className="col col-sm-10">
                    <Nhomvattu/>
                </div>
            </div>
        </div>
    )
    if(pageMode==='mon')
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className="col col-sm-10">
                    <Mon/>
                </div>
            </div>
        </div>
    )
}

export default Main;