import React, { useState,useEffect } from 'react';
import Axios from "axios"
import LIST_MON from "./List_mon";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ClearIcon from '@mui/icons-material/Clear';


function Mon(){
    const [nguyenlieu,setNguyenlieu]=useState()
    const [mon,setMon] = useState()

    const [mon_ct,setMon_ct] =useState([])
    const [MON,setMON]= useState([])
    const [NGUYENLIEU,setNGUYENLIEU]= useState([])
    const [isLoading, setIsLoading] = useState(false);

    const [Index_Mon,setIndexMon] =useState(0)
    const [Index_NL,setIndexNL] =useState(0)


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
                //console.log(m_ct.data)
                setMON(m);
                setNGUYENLIEU(nl); 
                console.log(nl)
                setMon({
                    id:m[0]._id,
                    loai:m[0].nhomvattu,
                    tenmon:m[0].ten,
                    header:[],
                    nguyenlieu:[]
                })

                
                setNguyenlieu({
                    id:nl[0]._id,
                    ten:nl[0].ten,
                    donvi:nl[0].donvi,
                    loai:nl[0].nhomvattu,
                    dinhluong: 0
                })
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
            
        },1000)
        return ;
    },[]);
  

    const choosedMon =(e) =>{
        e.preventDefault();
        if(e!==undefined || e!==null)
        //e.target.classList.toggle("active_item");
        var ind= Number(e.target.options[e.target.selectedIndex].attributes['data_ind'].value)
        setIndexMon(ind)
        mon.id= MON[ind]._id
        mon.loai= MON[ind].nhomvattu
        mon.tenmon= MON[ind].ten
        setMon({...mon})
        //console.log(mon)
    }
    const choosedNL =(e) =>{
        e.preventDefault();
        if(e!==undefined || e!==null)
        var ind= Number(e.target.options[e.target.selectedIndex].attributes['data_ind'].value)

        setIndexNL(ind)
        let t= {
            id:NGUYENLIEU[ind]._id,
            ten: NGUYENLIEU[ind].ten,
            donvi: NGUYENLIEU[ind].donvi,
            loai: NGUYENLIEU[ind].nhomvattu
        }

        
        setNguyenlieu(t)
        
    }
    

    let mon_option= MON
    .map((item,index) => 
            <option key={item._id} data_ind={index} 
            
            >
                |{item.nhomvattu}|- {item.ten}- ({Number(item.soluong)>0? Number(item.soluong).toFixed(4):Number(item.soluong)} {item.donvi})
                </option>
        )

    let nguyenlieu_option= NGUYENLIEU
    .map((item,index) => 
        <option key={item._id} 
        data_ind={index}
     
        >
         |{item.nhomvattu}|- {item.ten} -( {Number(item.soluong)>0? Number(item.soluong).toFixed(4):Number(item.soluong) } {item.donvi})</option>
        )
  
    const handleAdd = (e )=>{
        e.preventDefault();
        
        mon.nguyenlieu.push(nguyenlieu)
        mon.header = Object.keys(mon.nguyenlieu[0])

        setMon({...mon})
        //console.log(mon)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            id: mon.id,
            loai:mon.loai,
            tenmon:mon.tenmon,
            nguyenlieu:mon.nguyenlieu
        }
        if(body.loai !=="Nguyên liệu tổng hợp")
            try {
                Axios.post('http://103.229.53.71:5000/themmon', body)
            } catch (error) {
                console.error(error);
            } finally {
                mon_ct.push(body)
                setMon_ct([...mon_ct])
                //console.log(body.id)
                //Reset
                alert(`đã thêm món ${mon.tenmon}`)
                mon.nguyenlieu=[]
                setMon({...mon})
            }
        else{
            try {
                Axios.post('http://103.229.53.71:5000/themmon', body)
            } catch (error) {
                console.error(error);
            } finally {
                //UPDATE vật tư
                body.nguyenlieu.forEach(el1 => {
                    //console.log(el1)
                    let t = NGUYENLIEU.filter(mn =>
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
                    setNGUYENLIEU([...NGUYENLIEU])
                    
                })

                mon_ct.push(body)
                setMon_ct([...mon_ct])
                //console.log(body.id)
                //Reset
                alert(`đã thêm món ${mon.tenmon}`)
                mon.nguyenlieu=[]
                setMon({...mon})
            }
        }
        
    }

    function delNL(i){
        mon.nguyenlieu.splice(i,1)
        setMon({...mon})
    }
    function ShowTable(){
        
        let title="Tên món"
        if(MON[Index_Mon] !== undefined) title=MON[Index_Mon].ten
        let head=["Tên","Đơn vị","Phân loại","Định lượng"]
        let data= mon===undefined ? [] : mon.nguyenlieu
        // console.log("+++++++++++++++++++")
        // console.log(nguyenlieu,mon.nguyenlieu)
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
            key.shift()
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
            <div className="row mt-4">
                <div className="col text-start">
                    <a href="/admin">
                    <button className="btn btn-primary"> Tạo vật tư</button>
                    </a>
                </div>  
            </div>
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
            <div className="row mt-4">
                <div className="col text-start">
                    <a href="/admin">
                    <button className="btn btn-primary"> Tạo vật tư</button>
                    </a>
                </div>    
            </div>
            <div className="container col-lg">
            <form id="form_data " className="container row" onSubmit={handleAdd}>
                <div className="col">
                
                    <div className="row m-1">
                        <label className="text-start col-5" >Tên món</label>
                        <select required className="col-7 border p-1 rounded-1" 
                        onChange={(e) => {
                            //setMon({...mon,tenmon:e.target.value});
                            choosedMon(e)
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
                        // onChange={ (e) =>{
                        //         let t ={
                        //         ten:e.target.value,
                        //         donvi:e.target
                        //         .options[e.target.selectedIndex]
                        //         .attributes['data_donvi']
                        //         .value,
                        //         loai:e.target
                        //         .options[e.target.selectedIndex]
                        //         .attributes['data_loai']
                        //         .value,
                        //         tonkho:e.target
                        //         .options[e.target.selectedIndex]
                        //         .attributes['data_tonkho']
                        //         .value,
                        //         dinhluong:0,
                        //     }
                        // setNguyenlieu(t)
                        // }}
                        onChange={(e) => {
                            //setMon({...mon,tenmon:e.target.value});
                            choosedNL(e)
                        }}
                        >
                            {nguyenlieu_option}
                        </select>
                    </div>
                    <div className="row m-1">
                        <label className="text-start col-5"> Định lượng nguyên liệu</label>
                        <input className="col-7 border p-1 rounded-1" type="number" min="0" step="any"
                        onChange={(e) => {
                            nguyenlieu.dinhluong= e.target.value
                            setNguyenlieu({...nguyenlieu})
                        }}

                        // onChange={(e) => {
                        //     if(e.target.value < nguyenlieu.tonkho)
                        //         setNguyenlieu({...nguyenlieu,dinhluong:e.target.value})
                        //     else {
                        //         alert("định lượng lớn hơn tồn kho")
                        //         e.target.value=0
                        //     }
                        // }}
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