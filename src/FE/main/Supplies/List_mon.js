import React, { useState,useEffect } from 'react';
import Axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClearIcon from '@mui/icons-material/Clear';

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


function MyVerticallyCenteredModal(props) {
    const [img,setImg]=useState("")
    function convertToBase64(e){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () =>{
            setImg(reader.result)
        }
        reader.onerror = error =>{
            console.log("Error",error);
        }
    }
    const updateDinhluong= (e) =>{
        e.preventDefault();
        let fields= document.querySelectorAll('input[type="Number"]')

        
        for (var i = 1; i < fields.length; i++) {
            fields[i].classList.toggle('border-0')
            fields[i].readOnly = false;
            
        }

        console.log(props.metadata[props.index])

        let buttons= document.getElementsByClassName("bg-success")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('d-none')
        }
        let img_space= document.getElementsByClassName('img_space')[0]
        img_space.classList.toggle("d-none")
    }
    const CreateSize= (size) =>{
        //e.preventDefault();
        let fields= document.querySelectorAll('input[type="Number"]')
        let c_change=0;

        let data =props.metadata[props.index];
        let init_dinhluong= []
        props.metadata[props.index].nguyenlieu.forEach(item => init_dinhluong.push(item.dinhluong))
        let dinhluong= []
        //console.log(data)
        for (let i = 1; i < fields.length; i++) {
            fields[i].classList.toggle('border-0')
            fields[i].readOnly = true;
            if(fields[i].value !=="" ){
                c_change+=1
                dinhluong[i-1]= Number(fields[i].value)
            }
            else{
                dinhluong[i-1]="empty"
            }
        }
        for (let index = 0; index < dinhluong.length; index++) {
            if(dinhluong[index]!=="empty")
            data.nguyenlieu[index].dinhluong= dinhluong[index]
        }

        if(c_change!==0 ){
            if(data.loai==="Món"){
                //data.tenmon= size==="M" ? `${data.tenmon} (M)` : `${data.tenmon} (L)`
                
                let price = prompt(`Giá size(${size})`, "");
                let img_space= document.getElementsByClassName('img_space')[0]
                img_space.classList.toggle("d-none")
                let t = {
                    ten:`${data.tenmon + '(' +size +')'}`,
                    donvi:"",
                    nhomvattu:"Món",
                    img:img,
                    soluong:0,
                    tien:price,
                    time: new Date()
                }

                try{
                    Axios.post('http://103.229.53.71:5000/add_data', t )
                    .then((response) => {
                        let res_data = response.data; // response object defined
                        console.log(t)
                        let temp = {
                            id: res_data._id,
                            loai:res_data.nhomvattu,
                            tenmon:res_data.ten,
                            nguyenlieu:data.nguyenlieu
                        }
                        try {
                            Axios.post('http://103.229.53.71:5000/themmon', temp)
                        } catch (error) {
                            console.error(error);
                        } finally {
                            //RESET STATE
                            for (let index = 0; index < init_dinhluong.length; index++) {
                                data.nguyenlieu[index].dinhluong= init_dinhluong[index]
                            }
                            //console.log(data.nguyenlieu)
                            //img_space.classList.toggle("d-none")
                        }

                      })
                } 
                catch (error) {
                    console.error(error);
                } finally  {
                    
                }

            }
            else{
                alert("Chỉ tạo size cho món")
            }
           
        }

        let buttons= document.getElementsByClassName("bg-success")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('d-none')
        }
    }
    const Save= (e) =>{
        e.preventDefault();
        
        let fields= document.querySelectorAll('input[type="Number"]')
        let c_change=0;
        for (var i = 1; i < fields.length; i++) {
            fields[i].classList.toggle('border-0')
            fields[i].readOnly = true;
            if(fields[i].value !=="" ){
                c_change+=1
                props.metadata[props.index].nguyenlieu[i-1].dinhluong= Number(fields[i].value)
                props.nguyenlieu[i-1].dinhluong= Number(fields[i].value)
            }
        }

        if(c_change!==0){
            let id= props.metadata[props.index]._id
            Axios({
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/update/mon/${id}`,
                data:props.metadata[props.index]
            });
            alert("Đã cập nhật")
        }
        if(img!==""){
            let ID= props.metadata[props.index].id //id_món
            Axios({
                method: 'get',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/list_mon/${ID}`,
            })
            .then((response) => {
                let res_data = response.data[0]
                res_data.img = img
                //console.log(res_data)

                try {
                    Axios({
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        url: `http://103.229.53.71:5000/update/list_mon/${ID}`,
                        data:res_data
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    //RESET STATE
                    document.getElementsByClassName('img_space')[0].classList.toggle("d-none")
                }
                
            })
            
        }

        let buttons= document.getElementsByClassName("bg-success")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('d-none')
        }
    }


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
                        key.map(i => i ==="dinhluong" ?
                            <td key={i}>
                                {item[i]}  
                                <input  className="border-0" type="Number" readOnly="true" />
                            </td>
                            :
                            <td key={i}>
                                {item[i]}    
                            </td>
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
                    <tr key="PRICE">
                        <td className="img_space d-none"> 
                        <input
                        onChange={convertToBase64}
                        type="file" className="form-control-file" accept="image/png, image/jpeg" />
                        <div
                            
                            style={
                                {
                                    width:'200px',
                                    height: '200px'
                                }
                            }
                        >
                        {img === '' || img===null ? '': <img class="h-100 img-thumbnail" src={img} alt="" />}
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer className="border-primary">
          <Button  className="bg-success d-none text-start" onClick={() =>CreateSize('M')}>+ Size M</Button>
          <Button  className="bg-success d-none text-start" onClick={() => CreateSize('L')}>+ Size L</Button>
          <Button  className="bg-success d-none" onClick={Save}>save</Button>
          <Button  className='' onClick={updateDinhluong}>Edit</Button>
          <Button  className="bg-danger" onClick={props.onHide}>Close</Button>
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
    const [index,setIndex] =useState();

    useEffect(() => {

        setTimeout( async () =>{

            setList(data)
            //console.log(data)
        },1000)
        return ;
    },[]);

    const handleClick = (e) => {
        e.preventDefault();
        let t ={
            tenmon:e.target.innerText,
            nguyenlieu:list[Number(e.target.attributes['in'].value)].nguyenlieu
        }
        setIndex(Number(e.target.attributes['in'].value))
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
                    metadata={data}
                    index={index}
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