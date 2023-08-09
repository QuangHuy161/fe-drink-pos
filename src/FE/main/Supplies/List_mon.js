import React, { useState,useEffect } from 'react';
import Axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ClearIcon from '@mui/icons-material/Clear';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function MyVerticallyCenteredModal(props) {
    let tdata;
    if(props.nguyenlieu[0]=== undefined) 
        tdata=
            <tr key="0">
            </tr>
        else{
            let key = Object.keys(props.nguyenlieu[0])
            key.shift()
             tdata = props.nguyenlieu.map( item =>
                <tr >
                    {
                        key.map(i =>
                            <td key={i}>{item[i]}</td>
                        )
                    }
                    
                </tr>
            )
        }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-primary">
          <Modal.Title id="contained-modal-title-vcenter">
            Công thức
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.tenmon}</h4>
          <table className="table">
                <tbody>
                    {tdata}
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer className="border-primary">
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function List_mon({data}) {
    const [modalShow, setModalShow] = useState(false);
    const [dataModal,setDataModal] =useState({
        tenmon:'',
        nguyenlieu:[]
    })
    const [list,setList] = useState([]);

    useEffect(() => {

        setTimeout( async () =>{

            setList(data)
            
        },1000)
        return ;
    },[]);

    const handleClick = (e) => {
        e.preventDefault();
        let t ={
            tenmon:e.target.innerText,
            nguyenlieu:list[Number(e.target.attributes['in'].value)].nguyenlieu
        }
        setDataModal(t)
        //console.log(t)
        setModalShow(true)
        
    }

    function delCT(i){
        if(
            window.confirm("BẠN CHẮC CHẮN MUỐN XÓA CÔNG THỨC CỦA MÓN NÀY \n NẾU XÓA SẼ KHÔNG THỂ THỐNG KÊ HAO HỤT CỦA NGUYÊN LIỆU?")
        ){
            const id =list[i]._id
            list.splice(i,1)
            setList([...list])
            Axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/delete/mon/${id}`,
            });
        }
    }
    function ShowTable(){
        let head=["STT","Tên món","Xóa"]
        let data=list


        let thead = head.map( item => item !=="Tên món" ?
            <th scope="col" key={item}>{item}</th>
            :
            <th scope="col" className='text-start' key={item}>{item}</th>
        )
        let tdata;
        if(data[0]=== undefined) 
        tdata=
            <>
            </>
        else{
             tdata = data.map( (item,index) =>
                <tr key={ index}>
                    <td>{index}</td>
                    <td className="pe text-start" in={index }onClick={handleClick}>{item.tenmon}</td>
                    <td>
                        <span className="pe link-danger" onClick={()=>delCT(index)}><ClearIcon/></span>
                    </td>
                </tr>
            )
        }
            
        
        return (
            <div>
                <h1 className="h1">Danh sách và công thức món</h1>
                <table className="table">
                    <thead>
                        <tr>
                            {thead}
                        </tr>
                    </thead>
                    <tbody>
                        {tdata}
                    </tbody>
                </table>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    tenmon={dataModal.tenmon}
                    nguyenlieu={dataModal.nguyenlieu}
                    onHide={() => setModalShow(false)}
                />
            </div>
        )
    }


    return (
        <div className='container'>
            <ShowTable/>
        </div>
    );
}

export default List_mon;