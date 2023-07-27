import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import DATA_TABLE from './Data_table';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function Donvi() {

    const [list,setList] = useState({head:[],data:[]});

    useEffect(() => {

        setTimeout( async () =>{
            let DV= await Axios({
                method: 'get',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://103.229.53.71:5000/donvi',
            })
            let head=Object.keys(DV.data[0]);
            head.pop();
            let data=DV.data;
            setList({head:head,data:data})
        },1000)
        return ;
    },[]);
    
    return (
        <div>
        
            {
                <DATA_TABLE
                title="Đơn vị"
                head= {["ID","Tên", "Tên rút gọn"]}
                label= {list.head}
                data = {list.data}
                />
            }
        </div>
    );
}

export default Donvi;
