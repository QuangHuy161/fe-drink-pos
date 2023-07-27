import Top from "../Top/Top";
import React, { useState,useEffect } from "react"
import Axios from "axios"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import {genID} from "../function/function";

Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
function Create(props ){

    const [vatlieu,setVatlieu] = useState({
        ten:"",
        donvi:"",
        nhomvattu:"",
        soluong:0,
        tien:0,
        img:''
    })
    const [donvi,setDonvi] = useState(
        {
            ten:"",
            tenphu:"",
    })
    const [nhomvattu,setNhomvattu] = useState(
        {
            ten:"",
            tenphu:"",
    })
    
    let [pageMode, setPageMode] = useState("donvi")
    const [list,setList] = useState({head:[],data:[]});
    const [isLoading, setIsLoading] = useState(false);
    const [DONVI,setDONVI]= useState([])
    const [NHOMVATTU,setNHOMVATTU]= useState([])

    function convertToBase64(e){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () =>{
            setVatlieu({...vatlieu,img:reader.result})
        }
        reader.onerror = error =>{
            console.log("Error",error);
        }
    }
    useEffect(() => {
        setTimeout( async() =>{
            setIsLoading(true);
            try {
                let DV= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/donvi',
                })
    
                let NVT= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/nhomvattu',
                })
                let L_M= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/list_mon',
                })
    
    
                setDONVI(DV.data)
                setNHOMVATTU(NVT.data)
                let head=Object.keys(L_M.data[1]);
                head.splice(head.indexOf("_v")-1,1);
                setList({head:head,data:L_M.data})
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            
            
        },1000)
        
        return ;
    },[]);
    
    let donvi_option= DONVI.map(item => <option key={item._id} value={item.ten} >{item.ten}</option>);
    let nhomvattu_option = NHOMVATTU.map(item => <option key={item._id} value={item.ten} >{item.ten}</option>);

    let t= (<div id="menu" className="col col-sm-2 " >
                <div className="row m-1">
                    <a href="/admin" className="p-0">
                    <button  className=" bt btn btn-menu rounded-1 w-100"  >
                        <span className="nav-link">
                            Home
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
                                Tạo mới
                        </Dropdown.Toggle>
                        <Dropdown.Menu
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
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                
            </div>
        )

        const handleSubmit_vattu = (e) => {
            e.preventDefault();
            vatlieu.time = new Date();
            try{
                Axios.post('http://103.229.53.71:5000/add_data', vatlieu )
            } 
            catch (error) {
                console.error(error);
            } finally {
                alert(`Đã thêm vật tư ${vatlieu.ten}`)
                setVatlieu({
                    ten:"",
                    donvi:"",
                    nhomvattu:"",
                    soluong:0,
                    tien:0,
                    img:'',
                })
                
            }
            
            
        }

        const handleSubmit_donvi = (e) => {
            e.preventDefault();
            Axios.post('http://103.229.53.71:5000/add_donvi', {
                _id: 'dv'+donvi.tenphu,
                ten: donvi.ten,
                tenphu:donvi.tenphu
            })
            alert(`Đã thêm đơn vị ${donvi.ten}`)
        }
        const handleSubmit_nhomvattu = (e) => {
            e.preventDefault();
            Axios.post('http://103.229.53.71:5000/add_nhomvattu', {
            _id: 'nvt'+nhomvattu.tenphu,
            ten: nhomvattu.ten,
            tenphu:nhomvattu.tenphu
        })
            alert(`Đã thêm đơn vị ${donvi.ten}`)
        }
    if(isLoading)
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className=" col col-sm-10">
                    <LoadingSpinner/>
                </div>
            </div>
        </div>
    )
    else
    if(pageMode==="nhomvattu")
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className=" col col-sm-10">
                <div className="h3">Tạo mới loại vật tư</div>
                <Form 
                className='text-left container w-50'
                onSubmit={handleSubmit_nhomvattu}>
                    <Form.Group className="mb-3" >
                        <Form.Label > Tên</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Nhập tên loại" 
                        onChange={(e) => {setNhomvattu({...nhomvattu,ten:e.target.value})}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label> Tên rút gọn</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Nhập tên rút gọn của loại vật tư" 
                        onChange={(e) => {setNhomvattu({...nhomvattu,tenphu:e.target.value})}}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>

                </div>
            </div>
        </div>
    )
    else
    if(pageMode==="donvi")
    return(
        <div  >
            <div className="row">
                <Top/>
            </div>
            <div className="row">
                {t}
                <div className=" col col-sm-10">
                <div className="h3">Tạo mới đơn vị</div>
                <Form 
                className='text-left container w-50'
                onSubmit={handleSubmit_donvi}>
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

                </div>
            </div>
        </div>
    )
    // else
    // if(pageMode==="vattu")
    // return(
    //     <div  >
    //         <div className="row">
    //             <Top/>
    //         </div>
    //         <div className="row">
    //             {t}
    //             <div className=" col col-sm-10">
    //             <form id="form_data" className="container" onSubmit={handleSubmit_vattu}>
    //                 <div className="row m-1">
    //                     <label className="text-start col-5"> Tên *</label>
    //                     <input required className="col-7 border p-1 rounded-1" type="text"
    //                     placeholder="VD: vật tư A"
    //                     onChange={(e) => {setVatlieu({...vatlieu,ten:e.target.value})}}
    //                     /> 
    //                 </div>
    //                 <div className="row m-1">
    //                     <label className="text-start col-5" >Đơn vị</label>
    //                     <select required className="col-7 border p-1 rounded-1" 
    //                     onChange={(e) => {setVatlieu({...vatlieu,donvi:e.target.value})}}
    //                     >
    //                         {donvi_option}
    //                     </select>
    //                 </div>
    //                 <div className="row m-1">
    //                     <label className="text-start col-5" > Loại vật tư</label>
    //                     <select required className="col-7 border p-1 rounded-1" 
    //                     onChange={(e) => {setVatlieu({...vatlieu,nhomvattu:e.target.value})}}>
    //                         {nhomvattu_option}
    //                     </select>
    //                 </div>
    //                 <div className="row m-1">
    //                     <label className="text-start col-5"> Số Lượng(định theo đơn vị)</label>
    //                     <input className="col-7 border p-1 rounded-1" type="number" min="0" step="any"
    //                     placeholder="VD:50Ly"
    //                     onChange={(e) => {setVatlieu({...vatlieu,soluong:e.target.value})}}/> 
    //                 </div>
    //                 <div className="row m-1">
    //                     <label className="text-start col-5">Giá vốn</label>
    //                     <input className="col-7 border p-1 rounded-1" min="0" step="100"
    //                     type="number"
    //                     placeholder="VNĐ 1,234,567"
    //                     onChange={(e) => {setVatlieu({...vatlieu,tien:e.target.value})}}/> 
    //                 </div>
    //                 <div className="row m-1">
    //                     <input
    //                     onChange={convertToBase64}
    //                     type="file" className="form-control-file" accept="image/png, image/jpeg" />
    //                     <div
    //                         style={
    //                             {
    //                                 width:'200px',
    //                                 height: '200px'
    //                             }
    //                         }
    //                     >
    //                     {vatlieu.img === '' || vatlieu.img===null ? '': <img class="img-thumbnail" src={vatlieu.img} alt="" />}
    //                     </div>
                    
    //                 </div>
    //                 <input type="submit" className="bt btn btn-submit text-white mb-2"></input>
    //             </form>
    //             </div>
    //         </div>
    //     </div>
    // )

}

export default Create;