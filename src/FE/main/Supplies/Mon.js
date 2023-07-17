import React, { useState,useEffect } from 'react';
import Axios from "axios"
import LIST_MON from "./List_mon";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ClearIcon from '@mui/icons-material/Clear';


function Mon(){
    const [nguyenlieu,setNguyenlieu]=useState(
        {
            ten:'Nguyên liệu',
            donvi:'Kilogram',
            dinhluong:0,
            loai:""
        }
    )
    const [mon,setMon] = useState({
        tenmon:"",
        header:[],
        nguyenlieu:[]
    })
    const [mon_ct,setMon_ct] =useState([])
    const [MON,setMON]= useState([])
    const [NGUYENLIEU,setNGUYENLIEU]= useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(async () =>{
            setIsLoading(true);
            try {
                let L_M= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/list_mon',
                })
                let m_ct= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/mon',
                })

                let m = [];
                let nl = [];
                L_M.data.map((items) =>{
                    if( items.nhomvattu ==="Món" || items.nhomvattu ==="Topping")
                    m.push(items)
                    else
                    if(items.nhomvattu ==="Nguyên liệu tổng hợp")
                    {
                        m.push(items)
                        nl.push(items)
                    }
                    else{
                        nl.push(items)
                    }
                    
                })
                setMon_ct(m_ct.data)
                setMON(m);
                setMon({...mon, tenmon : m[0].ten})
                setNGUYENLIEU(nl); 
                //console.log(nl[0].ten)
                setNguyenlieu({...nguyenlieu, ten:nl[0].ten}); 
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            
        },1000)
        return ;
    },[]);
  

    
    
    let mon_option= MON
    .map(item => 
            <option key={item._id} value={item.ten} >
                |{item.nhomvattu}| {item.ten} ({item.soluong} {item.donvi})
                </option>
        )

    let nguyenlieu_option= NGUYENLIEU
    .map( item => 
        <option key={item._id} 
        data_donvi={item.donvi} 
        data_loai={item.nhomvattu} 
        value={item.ten} 
        >
         |{item.nhomvattu}| {item.ten} ({item.soluong} {item.donvi})</option>
        )
  
    const handleAdd = (e )=>{
        e.preventDefault();
        mon.nguyenlieu.push(nguyenlieu)
        mon.header = Object.keys(mon.nguyenlieu[0])
        setMon({...mon})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            tenmon:mon.tenmon,
            nguyenlieu:mon.nguyenlieu
        }
        try {
            Axios.post('http://103.229.53.71:5000/themmon', body)
        } catch (error) {
            console.error(error);
        } finally {
            mon_ct.push(body)
            setMon_ct([...mon_ct])
            alert(`đã thêm món ${mon.tenmon}`)
            //Reset
            mon.nguyenlieu=[]
            setMon({...mon})
        }
        
        
    }

    function delNL(i){
        mon.nguyenlieu.splice(i,1)
        setMon({...mon})
    }
    function ShowTable(){
        let title=mon.tenmon
        let head=["Tên","Đơn vị","Phân loại","Định lượng"]
        let data=mon.nguyenlieu
        let thead = head.map( item =>
            <th scope="col" key={item}>{item}</th>
        )
        let tdata;
        if(title==='' || title === undefined) return(<div></div>)
        if(data[0]=== undefined) 
        tdata=
            <></>
        else{
            let key = Object.keys(data[0])
             tdata = data.map( (item,i) =>
                <tr  key={item.ten}>
                    {
                        key.map(i =>
                            <td key={i}>{item[i]}</td>
                        )
                    }
                    <td>
                    <span className="pe link-danger" onClick={()=>delNL(i)}><ClearIcon/></span>
                    </td>
                </tr>
                )
        }
            
        return (
            <div>
                <h1 className="h1">{title}</h1>
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
            </div>
        )
    }

    if(isLoading)
    return(
        <div> 
            <div className="container col-lg">
            <form id="form_data " className="container row" onSubmit={handleAdd}>
                <LoadingSpinner/> 
                <button className="bt btn mb-3" onClick={handleAdd}> 
                    Thêm nguyên liệu 
                </button>
                <ShowTable/>
                <input onClick={handleSubmit} className="btn btn-success mb-2" value='Hoàn tất'/>
            </form>
            
            </div>
            <LoadingSpinner/>         
        </div>
    )

    return(
        <div> 
            <div className="container col-lg">
            <form id="form_data " className="container row" onSubmit={handleAdd}>
                <div className="col">
                
                    <div className="row m-1">
                        <label className="text-start col-5" >Tên món</label>
                        <select required className="col-7 border p-1 rounded-1" 
                        onChange={(e) => {
                            setMon({...mon,tenmon:e.target.value});
                        }}
                        >
                            {mon_option}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="row m-1">
                        <label className="text-start col-5" >Nguyên liệu</label>
                        <select required className="col-7 border p-1 rounded-1" 
                        onChange={ (e) =>{
                                let t ={
                                ten:e.target.value,
                                donvi:e.target
                                .options[e.target.selectedIndex]
                                .attributes['data_donvi']
                                .value,
                                loai:e.target
                                .options[e.target.selectedIndex]
                                .attributes['data_loai']
                                .value,
                                dinhluong:0,
                            }
                        setNguyenlieu(t)
                        }}
                        >
                            {nguyenlieu_option}
                        </select>
                    </div>
                    <div className="row m-1">
                        <label className="text-start col-5"> Định lượng nguyên liệu</label>
                        <input className="col-7 border p-1 rounded-1" type="number" min="0" step="any"
                        onChange={(e) => {
                            setNguyenlieu({...nguyenlieu,dinhluong:e.target.value})
                        }}
                        /> 
                    </div>
                </div>
                
                <button className="bt btn mb-3" onClick={handleAdd}> 
                    Thêm nguyên liệu 
                </button>
                <ShowTable
                 />
                <input onClick={handleSubmit} className="btn btn-success mb-2" value='Hoàn tất'/>
            </form>
            
            </div>
            <LIST_MON
                data={mon_ct}
            />           
        </div>
    )
}


export default Mon;