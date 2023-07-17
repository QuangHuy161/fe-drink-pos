import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import DATA_TABLE from './Data_table';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function Donvi() {
    
    const [donvi,setDonvi] = useState(
        {
            ten:"",
            tenphu:"",
        })

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
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://103.229.53.71:5000/add_donvi', {
            _id: 'dv'+donvi.tenphu,
            ten: donvi.ten,
            tenphu:donvi.tenphu
        })

        alert(`Đã thêm đơn vị ${donvi.ten}`)
    }
    return (
        <div>
            <Form 
            className='text-left'
            onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label > Tên</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Nhập tên đơn vị" 
                    onChange={(e) => {setDonvi({...donvi,ten:e.target.value})}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Tên rút gọn</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Nhập tên rút gọn của đơn vị" 
                    onChange={(e) => {setDonvi({...donvi,tenphu:e.target.value})}}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

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
