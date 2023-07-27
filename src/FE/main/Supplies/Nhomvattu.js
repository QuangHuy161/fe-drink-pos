import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import DATA_TABLE from './Data_table';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function Nhomvattu() {

    const [list,setList] = useState({head:[],data:[]});

    useEffect(() => {
        setTimeout( async () =>{
            let NVT= await Axios({
                method: 'get',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://103.229.53.71:5000/nhomvattu',
            })
            let head=Object.keys(NVT.data[0]);
            head.pop();
            let data=NVT.data;
            setList({head:head,data:data})
        },1000)
        return ;
    },[]);
    return (
        <div>
            {
                <DATA_TABLE
                title="Nhóm vật tư"
                head= {["ID","Tên", "Viết tắt"]}
                label= {list.head}
                data = {list.data}
                />
            }
        </div>
    );
}

export default Nhomvattu;
