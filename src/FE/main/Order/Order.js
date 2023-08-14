import "./Order.scss"
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Order(){

    
    const [price,setPrice] =useState();
    const [order,setOrder] = useState([])
    const [MENU,setMENU]= useState([])
    const [CT,setCT]= useState([])
    const [ind,setInd] =useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [tempShow, setTempShow] = useState(true);
    const [dataModal,setDataModal] =useState({})
    useEffect(() => {
        setTimeout(async () =>{
            setIsLoading(true);
            try {
                let MN= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/list_mon',
                })
                let ct= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/mon',
                })
                
                setMENU(MN.data)
                setCT(ct.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            
        },1000)
        return ;
    },[]);

    function mon(item) {
        return item.nhomvattu ==="Món";
    }
    function topping(item) {
        return item.nhomvattu ==="Topping";
    }
    
    function MyVerticallyCenteredModal(props) {
        
        if(props.nguyenlieu[0]=== undefined) 
        return <></>
        const LoadTopping = ({topp}) =>{
            if( topp.length === 0) return <></>
            let t = topp.map( (item,i) => 
                <tr key={item.ten + i} className="text-start">
                    <td style={{width: "10vw"}}></td>
                    <td className="head-4 pe-4">{item.ten}</td>
                    <td className="head-4" >{item.gia}</td>
                </tr>
            )

            return <tr className="border-0">{t}</tr>
        }
        
        if (props.nguyenlieu[0]===undefined|| props.nguyenlieu[0]===null)
        return (<></>)
        let tdata=props.nguyenlieu.map((item,index) =>
        <tr key={item.tenmon + index} >
            <td>
                <tr>
                <td className="w-75 h4" data={index}> {item.tenmon }</td>
                <td className="w-100"></td>
                <td className="h4 text-end"> {item.gia }</td>
                </tr>
                <LoadTopping
                topp={item.topping ===undefined ? []: item.topping}/>
            </td>
        </tr>
        )
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="border-primary" closeButton>
              <Modal.Title id="contained-modal-title-vcenter" >
                Chi tiết Order
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
              <Button className="bt" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    const ShowDetail = (item) => {
        setModalShow(true)
        setDataModal(item)
    }
    const closeTemp = (e) =>{
        e.preventDefault();
        setTempShow(true);
    }

    const CalRevune = (order) =>{
        //e.preventDefault();
        
        if(typeof(order[0])=== 'undefined' ) return order.gia;
        else{
            let sum = 0;
            order.forEach( el =>{
                sum+= el.gia;
            })
            return sum;
        }
    }
    function CalOut({onHide,order}){
        function LoadOrder(){
            let key,t;
            if (order===null)
            return (<></>)
            if(typeof(order[0])=== 'undefined' ){
                if(new Date(order.time).getDate()!== new Date().getDate() ){
                    window.onload = ()=>{
                        Axios.post("http://103.229.53.71:5000/reveune_day",
                        {
                            doanhthu: CalRevune(order),
                            time: new Date()
                        }
                        )
                        //console.log("loaded 1")
                        localStorage.removeItem('temp_order_info')
                    }
                    
                }
                key= Object.keys(order)
                t= key.map((el,i) => {
                    // if((el === "_id")){
                    //     return <></>
                    // }
                    // else
                    if((el === "tenkhachhang")){
                        return <td className="ps-2 text-start" key={i} data={el}> {order[el]}</td>
                    }
                    else
                    if((el === "tiendua"||el === "tienthoi"||el === "gia")){
                        return <td 
                            key={i} 
                            data={el}
                           className="text-end pe-2"
                            > 
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order[el])}
                        </td>
                    }
                    else
                    if((el === "time")){
                        return <td key={i} data={el}> {new Date(order[el]).toLocaleString('en-GB')}</td>
                    }
                    else
                    if(el === "order")
                        return <td className="pe colorDetail" 
                        key={i} 
                        data={el}
                        onClick={() =>ShowDetail(order[el])} 
                        > 
                            Chi tiết
                        </td>
                        
                    else{
                        return <td key={i} data={el}> {order[el]}</td>
                    }
                })
                t=<tr key="">{t}</tr>
            }
            else{
                if(new Date(order[0].time).getDate()!== new Date().getDate() ){
                    window.onload = ()=>{
                        Axios.post("http://103.229.53.71:5000/reveune_day",
                        {
                            doanhthu: CalRevune(order),
                            time: new Date()
                        }
                        )
                        //console.log("loaded 2")

                        localStorage.removeItem('temp_order_info')
                    }
                }
                
                key= Object.keys(order[0])
                t = order.map((item,index) =>
                <tr data={index} key={index} className="border-bottom border-primary">
                {    
                    key.map((el,i) => {
                        if((el === "_id")){
                            return <></>
                        }
                        else
                        if((el === "tenkhachhang")){
                            return <td className="ps-2 text-start" key={i} data={el}> {item[el]}</td>
                        }
                        else
                        if((el === "tiendua"||el === "tienthoi"||el === "gia")){
                            return <td 
                                key={i} 
                                data={el}
                                className="text-end pe-2"
                                > 
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item[el])}
                            </td>
                        }
                        else
                        if((el === "time")){
                            return <td key={i} data={el}> {new Date(item[el]).toLocaleString('en-GB')}</td>
                        }
                        else
                        if(el === "order")
                            return <td className="pe colorDetail" 
                            key={i} 
                            data={el}
                            onClick={() =>ShowDetail(item[el])} 
                            > 
                                Chi tiết
                            </td>
                        else{
                            return <td key={i} data={el}> {item[el]}</td>
                        }
                    })
                }
                </tr>
                )
            }
            
            return(
                <div style={{
                    height:"50vh",
                    overflowY:"scroll"
                    }}
                    className="m-3"
                    >
                    <table className="w-100 border-1 table-striped table-bordered">
                        <thead className="thead-light">
                            <th>Tên khách</th>
                            <th>SDT</th>
                            <th>Tiền đưa</th>
                            <th>Giá bill</th>
                            <th>Tiền thối</th>
                            <th>Đơn</th>
                            <th>Thời gian</th>
                        </thead>
                        <tbody>
                            {t}
                        </tbody>
                    </table>
    
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        nguyenlieu={dataModal}
                        onHide={() => setModalShow(false)}
                    />   
                </div>
            )
        }
        return (
            <div className={`show-temp-order shadow rounded-3 ${onHide ? "d-none" : ""}`}>
                <div className="text-end m-2">
                    <span 
                    onClick={closeTemp}  
                    className="price h3 pe">X</span>
                </div>
                <div className="h4">
                    Danh sách hóa đơn
                </div>
                <LoadOrder/>
            </div>
        )
    }
    
    const addMon= (e) =>{
        e.preventDefault();
        let t={
            id:"",
            tenmon:"",
            topping:[],
            gia:0
        }
        t.id= e.target.attributes["data-id"].value
        t.tenmon= e.target.innerText
        t.gia=Number(e.target.attributes["data-price"].value)
        order.push(t)
        setOrder([...order])
    }
    
    const addTopping= (e) =>{
        e.preventDefault();
        
       
        if(order.length=== 0) return;
        let topp ={
            id:"",
            ten:"",
            gia:0
        }
        topp.id= e.target.attributes["data-id"].value
        topp.ten= e.target.innerText;
        //console.log (e)
        topp.gia=Number(e.target.attributes["data-price"].value)

        order.at(ind).topping.push(topp)
        setOrder([...order])

        
    }

    const choosedMon =(e) =>{
        e.preventDefault();
        if(e!==undefined || e!==null)
        //e.target.classList.toggle("active_item");
        setInd(Number(e.target.attributes["data"].value))
    }
    
   
    const SumPrice = () =>{
        
        if(order.length===0 ) return <div className="price">0</div>;
        let sum = 0;
        for (let index = 0; index < order.length; index++) {
            const element = order[index];
            for (let j = 0; j < element.topping.length; j++) {
                const e = element.topping[j];
                sum+=e.gia
            }
            sum+=element.gia
        }
        setPrice(sum)
        return<span className="price h4">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </span>;
        
    }

    const ChangPrice = ()=>{
       return <span className="price h4">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order_info.tiendua - price)}
        </span>;
    }

    
    let tdata_mon;
    let tdata_topping;
    if(MENU[0]=== undefined) 
    tdata_mon=
        <>
        </>
    else{
        let m =MENU.filter(mon)
        let tp =MENU.filter(topping)
        tdata_mon = m.map( (item,i) =>
                <div  className="m-1 bd-highlightalign-items-center" >
                    <div className=" rounded poit "
                    onClick={addMon} 
                    key={i}
                    >
                        <p data={i} data-id={item._id} data-price={item.tien} className=" h4">{item.ten}</p>
                        <img  className=""
                        src={item.img} alt="" />
                        
                        
                    </div>
                    <p className="h4">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tien)}</p>
                </div>
        )
        tdata_topping = tp.map( item =>
                <div  className=" m-1 bd-highlight align-items-center" >
                    <div className="rounded  poit"
                    onClick ={addTopping}
                    data={item.ten} 
                    >
                        <p data-id={item._id} data-price={item.tien} className=" h4" >{item.ten}</p>
                        <img  className="" 
                        src={item.img} alt="" />
                    </div>
                    <p className="h4">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tien)}</p>
                </div>
        )
    }

    function delTopp(i){
        order.at(ind).topping.splice(i, 1)
        setOrder([...order])
    }
    function delMon(i){
        order.splice(i, 1)
        setOrder([...order])
       // console.log(order)
    }
    function LoadOrder(){

        const LoadTopping = ({topp}) =>{
            if( topp.length === 0) return <></>
            let t = topp.map( (item,i) => <tr key={item.ten + i} className="text-end">
                <td >{item.ten}</td>
                <td >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</td>
                <span className="pe link-danger" onClick={()=>delTopp(i)}><ClearIcon/></span>
            </tr>)

            return <table className="w-100">{t}</table>
        }
        
        if (order[0]===undefined|| order[0]===null)
        return (<></>)
        let t = 
        order.map((item,index) =>
            <tr key={item.tenmon + index} className="border-bottom ">
                <tr className="h5" key={item.tenmon} onClick={choosedMon}>
                        <td className={`pe text-start ${index === ind ? "active_item" : ""}`} data={index}> {item.tenmon }</td>
                        <td className=""> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</td>
                        <span className="pe  text-end link-danger" onClick={()=>delMon(index)}><DeleteForeverIcon/></span>
                </tr>
                <LoadTopping
                topp={item.topping}/>
            </tr>
        )
        
        return(
            <div style={{
                height:"50vh",
                overflowY:"scroll"
                }}>
                <table className="w-100">
                    <tbody>
                        {t}
                    </tbody>
                </table>

                
            </div>
        )
    }

    function checknumber(phoneNum)
    {
        if(phoneNum ==="") return true;
        var phoneno = /^\d{10}$/;
        if(phoneNum.match(phoneno)){
            return true;
        }
        else
            return false;
        }

    const [order_info,setOrder_info]= useState({
        tenkhachhang:"",
        sdt:"",
        tiendua:0,
        gia:0,
        tienthoi:0,
        order:[],
        time:''
    })

    const handleSave = (e) => {
        e.preventDefault();
        setTempShow(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(order.length===0) return;

        if(order_info.tenkhachhang ==="" || order_info.tenkhachhang ===null)
        {
            alert("Vui lòng nhập tên khách hàng")
            return
        }

        if(order_info.tiendua < price )
        {
            alert("Vui lòng nhập đúng số tiền khách đưa")
            return
        }
        if(!checknumber(order_info.sdt))
        {
            alert("Vui lòng nhập số điện thoại khác")
            return
        }
        order_info.gia=price;
        order_info.tienthoi=order_info.tiendua-order_info.gia
        order_info.time=new Date();
        order_info.order= order
        setOrder_info({...order_info})


        // LƯU TẠM CỦA NGÀY
        if(localStorage.getItem("temp_order_info")===undefined
            || localStorage.getItem("temp_order_info")===null){
            localStorage.setItem("temp_order_info",JSON.stringify(order_info));
        }
        else{
            let arr= [];
            let t = JSON.parse(localStorage.getItem("temp_order_info"))
            //console.log(t)
            if(t.length ===undefined){
                arr.push(JSON.parse(localStorage.getItem("temp_order_info")))
                arr.push((order_info))
                localStorage.setItem("temp_order_info",JSON.stringify(arr));
                //console.log(JSON.parse(localStorage.getItem("temp_order_info")))
            }
            else{
                arr= JSON.parse(localStorage.getItem("temp_order_info"))
                arr.push(order_info)
                localStorage.setItem("temp_order_info",JSON.stringify(arr));
                //console.log(JSON.parse(localStorage.getItem("temp_order_info")))
            }
        }
        //CHECK OFFLINE +++++++++++++++++++
        if(navigator.onLine){
            if(localStorage.getItem("order_info")!==null){
                let arr= [];
                let t = JSON.parse(localStorage.getItem("order_info"))
                if(t.length ===undefined){
                    Axios.post("http://103.229.53.71:5000/add_order_detail",
                        JSON.parse(localStorage.getItem("order_info"))
                    )
                    localStorage.removeItem("order_info")
                }
                else{
                    arr= JSON.parse(localStorage.getItem("order_info"))
                    for (let index = 0; index < arr.length; index++) {
                        const element = arr[index];
                        Axios.post("http://103.229.53.71:5000/add_order_detail",
                            element
                        )
                    }
                    localStorage.removeItem("order_info")
                }
            }
            
            Axios.post("http://103.229.53.71:5000/add_order_detail",
                order_info
            )
            //console.log(order_info)
            //CAL_OUT
            order.forEach(element =>{
                //console.log(element)
                let mon = CT.filter(item => item.id === element.id)[0]
                //console.log(mon)
                //console.log("=============")
                if(mon!==undefined){
                    mon.nguyenlieu.forEach(el1 => {
                        //console.log(el1)
                        let t = MENU.filter(mn =>
                            mn._id===el1.id
                            )[0]
                        //console.log(t)
                        
                        if(t === undefined) alert(`${el1.ten} không có trong kho`)
                        else{
                            t.soluong-=el1.dinhluong
                            let ID= t._id
                            console.log(t)
                            Axios({
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                url: `http://103.229.53.71:5000/update/list_mon/${ID}`,
                                data:t
                            });
                        }
                        setMENU([...MENU])
                        
                    })
                    //console.log("++++++++++++++++++++++++++++")
                    element.topping.forEach( el2 =>{
                        //console.log(el2)
                        let topp= CT.filter(item => item.id === el2.id)[0]
                        //console.log(topp)
                        //console.log("=============")
                        if(topp!== undefined){
                            topp.nguyenlieu.forEach(el_l => {
                                //console.log(el_l.ten,el_l.loai,el_l.donvi,el_l.dinhluong)
                                let t = MENU.filter(mn =>
                                    mn._id===el_l.id 
                                    )[0]
                                //console.log(t)
                                
                                if(t === undefined) alert(`${el_l.ten} không có trong kho`) 
                                else{
                                    t.soluong-=el_l.dinhluong
                                    let ID= t._id
                                    Axios({
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        url: `http://103.229.53.71:5000/update/list_mon/${ID}`,
                                        data:t
                                    });
                                    alert("Đã update")
                                }
                                setMENU([...MENU])
                                
                                //console.log(t)
                                
                                    //alert("Đã tạo đơn hàng")
                            })
                        }
                    })
                }
            })
            
        }
        else{
            if(localStorage.getItem("order_info")===undefined
                || localStorage.getItem("order_info")===null){
                localStorage.setItem("order_info",JSON.stringify(order_info));
            }
            else{
                let arr= [];
                let t = JSON.parse(localStorage.getItem("order_info"))
                if(t.length ===undefined){
                    arr.push(JSON.parse(localStorage.getItem("order_info")))
                    arr.push((order_info))
                    localStorage.setItem("order_info",JSON.stringify(arr));
                }
                else{
                    arr= JSON.parse(localStorage.getItem("order_info"))
                    arr.push(order_info)
                    localStorage.setItem("order_info",JSON.stringify(arr));
                }
            }
        }
        alert("Đã tạo đơn hàng")
        //RESET
        setInd(null)
        setPrice(0)
        setOrder([])
    }

    if (isLoading) {
        return (
        <div id="order">
            <div className="row main_order">
                <div data-spy="scroll" className="col-sm-3  overflow-scroll m-0">
                    <div className="h3 m-0">Order</div>
                    <p className="border-bottom m-0">Danh sách món</p>
                    <LoadOrder/>
                    <h5 className=""> Tổng tiền : <SumPrice/> VND</h5>
                </div>
                <div className="col-sm m-0">
                    <div className="row">
                        <div className="col col-sm-7 p-0">
                            <span className=" text-dark h3">Món</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch d-flex flex-wrap bd-highlight mb-3">
                                <LoadingSpinner/>
                            </div>
                        </div>
                        <div className="col col-sm-5 p-0 border-start">
                            <span className=" text-dark h3">Topping</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch d-flex flex-wrap bd-highlight mb-3">
                                <LoadingSpinner/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row order_info  border-top border-3 border-success ">
                <div className="col-8 border-right-3 m-1">
                    <form className="row m-0 info_order" >
                        <div className="col col-3">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6" id="order_ten" >Khách lẻ</span>
                                </div>
                                <input type="text" placeholder="Anh A" className="h6 m-0" 
                                onChange={(e) =>setOrder_info({...order_info,tenkhachhang:e.target.value})}
                                aria-describedby="order_ten" />
                            </div>

                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6" id="order_sdt">Số điện thoại</span>
                                </div>
                                <input type="Number" className="h6 m-0"
                                placeholder="0123456789"  
                                onChange={(e) =>{
                                        setOrder_info({...order_info,sdt:e.target.value});
                                }}   
                                aria-describedby="order_sdt"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6">Tiền khách đưa</span>
                                </div>
                                <input type="Number" className="h4 m-0" 
                                placeholder="500"
                                onChange={(e) =>{
                                        setOrder_info({...order_info,tiendua:e.target.value * 1000})
                                }}
                                aria-label="Amount (to the nearest dollar)"/>
                                <div className="input-group-append">
                                    <span className="input-group-text place-ho">.000 VND</span>
                                </div>
                            </div>
                            <div>
                                <span className="form_label h4">Tiền thối</span>
                                <ChangPrice/>
                            </div>
                        </div>
                       
                    </form>
                </div>
                <div className="col row button_payment align-self-center">
                    <div className="col">
                        <button onClick = {handleSave} className="bt btn btn-warning rounded-1 p-3">Hóa đơn</button>
                    </div>
                    <div className="col">
                        <button onClick = {handleSubmit} className="bt btn rounded-1 p-3">Hoàn tất</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    return(
        <div id="order">
            <div className="row main_order">
                <div data-spy="scroll" className="col-sm-3  overflow-scroll m-0">
                    <div className="h3 m-0">Order</div>
                    <p className="border-bottom m-0">Danh sách món</p>
                    <LoadOrder/>
                    <h5 className=""> Tổng tiền : <SumPrice/> VND</h5>
                </div>
                <div className="col-sm m-0">
                    <div className="row">
                        <div className="col col-sm-7 p-0">
                            <span className=" text-dark h3">Món</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch d-flex flex-wrap bd-highlight mb-3">
                                {tdata_mon}
                            </div>
                        </div>
                        <div className="col col-sm-5 p-0 border-start">
                            <span className=" text-dark h3">Topping</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch d-flex flex-wrap bd-highlight mb-3">
                                {tdata_topping}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row order_info  border-top border-3 border-success">
                <div className="col-8 border-right-3 m-1">
                    <form className="row m-0 info_order" >
                        <div className="col col-3">
                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6" id="order_ten">Khách lẻ</span>
                                </div>
                                <input type="text" placeholder="Anh A" className="h6 m-0" 
                                onChange={(e) =>setOrder_info({...order_info,tenkhachhang:e.target.value})}
                                aria-describedby="order_ten"/>
                            </div>

                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6" id="order_sdt">Số điện thoại</span>
                                </div>
                                <input type="Number" className="h6 m-0"  
                                placeholder="0123456789"
                                onChange={(e) =>{
                                        setOrder_info({...order_info,sdt:e.target.value});
                                    
                                }}
                                aria-describedby="order_sdt"/>
                            </div>
                        </div>
                        <div className="col">  
                            <div className="input-group mb-1">
                                <div className="input-group-prepend text-start">
                                    <span className="form_label h6">Tiền khách đưa</span>
                                </div>
                                <input type="Number" className="h4 m-0" 
                                placeholder="500"
                                required
                                onChange={(e) =>setOrder_info({...order_info,tiendua:e.target.value * 1000})}
                                aria-label="Amount (to the nearest dollar)"/>
                                <div className="input-group-append">
                                    <span className="input-group-text place-ho">.000 VND</span>
                                </div>
                            </div>
                            <div>
                                <span className="form_label h4">Tiền thối</span>
                                <ChangPrice/>
                            </div>
                        </div>
                       
                    </form>
                </div>
                <div className="col row button_payment align-self-center">
                    <div className="col">
                        <button onClick = {handleSave} className="bt btn btn-warning rounded-1 p-3">Hóa đơn</button>
                    </div>
                    <div className="col">
                        <button onClick = {handleSubmit} className="bt btn rounded-1 p-3">Hoàn tất</button>
                    </div>
                </div>
            </div>

            <CalOut 
                onHide={tempShow}
                order={JSON.parse(localStorage.getItem('temp_order_info'))}
            />
        </div>
    )
}

export default Order;