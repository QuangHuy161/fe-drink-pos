import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import DATA_TABLE from './Data_table';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function Nhomvattu() {
    
    const [nhomvattu,setNhomvattu] = useState(
        {
            ten:"",
            tenphu:"",
        })

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
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://103.229.53.71:5000/add_nhomvattu', {
            _id: 'nvt'+nhomvattu.tenphu,
            ten: nhomvattu.ten,
            tenphu:nhomvattu.tenphu
        })

        alert(`Đã thêm loại ${nhomvattu.ten}`)
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
                    placeholder="Nhập tên loại vật tư" 
                    onChange={(e) => {setNhomvattu({...nhomvattu,ten:e.target.value})}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Tên rút gọn</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Nhập viết tắt của tên (viết thường)" 
                    onChange={(e) => {setNhomvattu({...nhomvattu,tenphu:e.target.value})}}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

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
