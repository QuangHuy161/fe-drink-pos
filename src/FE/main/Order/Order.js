import "./Order.scss"
import React, { useState,useEffect } from 'react';
import Axios from "axios"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Order(){

    const [ind,setInd] =useState();
    const [price,setPrice] =useState();
    const [order,setOrder] = useState([])
    const [MENU,setMENU]= useState([])
    const [CT,setCT]= useState([])
    const [isLoading, setIsLoading] = useState(false);
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
    
    function Cal_Out(order){
        for (let index = 0; order < order.length; index++) {
            console.log(1)
            
        }
        return order;
    }
    
    const addMon= (e) =>{
        e.preventDefault();
        let t={
            tenmon:"",
            topping:[],
            gia:0
        }
        
        t.tenmon= e.target.innerText
        t.gia=Number(e.target.nextSibling.innerHTML)
        order.push(t)
        setOrder([...order])
    }
    
    const addTopping= (e) =>{
        e.preventDefault();
        
       
        if(order.length=== 0) return;
        let topp ={
            ten:"",
            gia:0
        }
        topp.ten= e.target.innerText;
        console.log("--------------------")
        console.log(order)
        topp.gia= Number(e.target.nextSibling.innerHTML)

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
        return<div className="price">
            {price}
        </div>;
        
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
                    <div className="m-1 rounded bd-highlight poit align-items-center" 
                    onClick={addMon} 
                    key={i}
                    >
                        <img  className=""
                        src={item.img} alt="" />
                        <p data={i} className=" h4">{item.ten}</p>
                        <p className=" h3">{item.tien}</p>
                    </div>
        )
        tdata_topping = tp.map( item =>
                    <div className=" m-1 rounded bd-highlight poit align-items-center" 
                    onClick ={addTopping}
                    data={item.ten} 
                    >
                            <img  className="" 
                             src={item.img} alt="" />
                        <p className=" h4">{item.ten}</p>
                        <p className=" h3">{item.tien}</p>
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
                <td >{item.gia}</td>
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
                        <td className={`pe ${index === ind ? "active_item" : ""}`} data={index}> {item.tenmon }</td>
                        <td className=""> {item.gia }</td>
                        <span className="pe link-danger" onClick={()=>delMon(index)}><DeleteForeverIcon/></span>
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
    var phoneno = /^\d{10}$/;
    if(phoneNum.match(phoneno)){
        return true;
    }
    else{
        alert("Vui lòng nhập lại số điện thoại khác")
        return false;
        }
    }

    const [order_info,setOrder_info]= useState({
        tenkhachhang:"",
        sdt:"0123456789",
        tiendua:0,
        gia:0,
        tienthoi:0,
        order:[],
        time:''
    })

    

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
        if( ! checknumber(order_info.sdt))
        {
            alert("Vui lòng nhập số điện thoại khác")
            return
        }
        order_info.gia=price;
        order_info.tienthoi=order_info.tiendua-order_info.gia
        order_info.time=new Date();

        setOrder_info({...order_info,order:order})
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

            //CAL_OUT
            order.forEach(element =>{
                let mon = CT.filter(item => item.tenmon === element.tenmon)[0]
                //console.log(mon)
                //console.log("=============")
    
                mon.nguyenlieu.forEach(el1 => {
                    //console.log(el1.ten,el1.donvi,el1.dinhluong)
                    let t = MENU.filter(mn =>
                         mn.ten===el1.ten && mn.nhomvattu===el1.loai
                        )[0]
                        t.soluong-=el1.dinhluong
                        setMENU([...MENU])
                        //console.log(t)
                        Axios({
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            url: `http://103.229.53.71:5000/update/list_mon/${t._id}`,
                            data:t
                        });
                })
            
                element.topping.forEach( el2 =>{
                    let topp= CT.filter(item => item.tenmon === el2.ten)[0]
                    console.log(topp)
                    topp.nguyenlieu.forEach(el_l => {
                        console.log(el_l.ten,el_l.loai,el_l.donvi,el_l.dinhluong)
                        let t = MENU.filter(mn =>
                             mn.ten===el_l.ten 
                             && mn.nhomvattu===el_l.loai
                            )[0]
                            t.soluong-=el_l.dinhluong
                            setMENU([...MENU])
                            //console.log(t)
                            Axios({
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                url: `http://103.229.53.71:5000/update/list_mon/${t._id}`,
                                data:t
                            });
                    })
    
                })
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
            <div className="row m-3 main_order">
                <div data-spy="scroll" className="col-sm-3  overflow-scroll m-2">
                    <div className="h3">Order</div>
                    <p className="border-bottom">Danh sách món</p>
                    <LoadOrder/>
                    <h4 className=""> Tổng tiền : <SumPrice/> VND</h4>
                </div>
                <div className="col-sm m-2 gx-0">
                    <div className="row">
                        <div className="col col-sm-7">
                            <span className=" text-dark h1">Menu</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch p-0 d-flex flex-wrap bd-highlight mb-3">
                                <LoadingSpinner/>
                            </div>
                        </div>
                        <div className="col col-sm-5 border-start">
                            <span className=" text-dark h1">Topping</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch p-0 d-flex flex-wrap bd-highlight mb-3">
                                <LoadingSpinner/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row order_info fixed-bottom border-top border-3 border-success p-3">
                <div className="col-sm-10 text-start m-1">
                    <form className="container m-0 info_order" >
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6" id="order_ten">Tên khách</span>
                            </div>
                            <input type="text" className="h5" 
                            onChange={(e) =>setOrder_info({...order_info,tenkhachhang:e.target.value})}
                            aria-describedby="order_ten" />
                        </div>

                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6" id="order_sdt">Số điện thoại</span>
                            </div>
                            <input type="Number" className="h5"  
                            onChange={(e) =>{
                                    setOrder_info({...order_info,sdt:e.target.value});
                            }}   
                            aria-describedby="order_sdt"/>
                        </div>
                       
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6">Tiền khách đưa</span>
                            </div>
                            <input type="Number" className="h5" 
                            onChange={(e) =>{
                                    setOrder_info({...order_info,tiendua:e.target.value * 1000})
                            }}
                            aria-label="Amount (to the nearest dollar)"/>
                            <div className="input-group-append">
                                <span className="input-group-text place-ho">.000 VND</span>
                            </div>
                        </div>
                       
                    </form>
                </div>
                <div className=" col-sm button_payment text-end">
                    <button onClick = {handleSubmit} className="bt btn rounded-1">Hoàn tất</button>
                </div>
            </div>
        </div>
        )
    }
    return(
        <div id="order">
            <div className="row m-3 main_order">
                <div data-spy="scroll" className="col-sm-3  overflow-scroll m-2">
                    <div className="h3">Order</div>
                    <p className="border-bottom">Danh sách món</p>
                    <LoadOrder/>
                    <h4 className=""> Tổng tiền : <SumPrice/> VND</h4>
                </div>
                <div className="col-sm m-2 gx-0">
                    <div className="row">
                        <div className="col col-sm-7">
                            <span className=" text-dark h1">Menu</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch p-0 d-flex flex-wrap bd-highlight mb-3">
                                {tdata_mon}
                            </div>
                        </div>
                        <div className="col col-sm-5 border-start">
                            <span className=" text-dark h1">Topping</span>
                            <div data-spy="scroll" 
                            className="par-poit align-items-stretch p-0 d-flex flex-wrap bd-highlight mb-3">
                                {tdata_topping}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row order_info fixed-bottom border-top border-3 border-success p-3">
                <div className="col-sm-10 text-start m-1">
                    <form className="container m-0 info_order" >
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6" id="order_ten">Tên khách</span>
                            </div>
                            <input type="text" className="h5" 
                            onChange={(e) =>setOrder_info({...order_info,tenkhachhang:e.target.value})}
                            aria-describedby="order_ten"/>
                        </div>

                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6" id="order_sdt">Số điện thoại</span>
                            </div>
                            <input type="Number" className="h5"  
                            onChange={(e) =>{
                                    setOrder_info({...order_info,sdt:e.target.value});
                                
                            }}
                            aria-describedby="order_sdt"/>
                        </div>
                       
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="form_label h6">Tiền khách đưa</span>
                            </div>
                            <input type="Number" className="h5" 
                            onChange={(e) =>setOrder_info({...order_info,tiendua:e.target.value * 1000})}
                            aria-label="Amount (to the nearest dollar)"/>
                            <div className="input-group-append">
                                <span className="input-group-text place-ho">.000 VND</span>
                            </div>
                        </div>
                       
                    </form>
                </div>
                <div className=" col-sm button_payment text-end">
                    <button onClick = {handleSubmit} className="bt btn rounded-1">Hoàn tất</button>
                </div>
            </div>
        </div>
    )
}

export default Order;