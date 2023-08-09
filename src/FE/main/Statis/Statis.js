import Axios from "axios"
import React, { useState,useEffect } from "react"
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import "react-datepicker/dist/react-datepicker.css";
//import Chart from "./Chart_Rev"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu theo ngày',
      },
    },
  };



function getDate(time){
    let month = time.getUTCMonth() + 1
    let day = time.getUTCDate()
    let year = time.getUTCFullYear()
    let Date = year + "-" + month + "-" + day
    return Date;
}
function Static(){
    const [pageStat,setPageStat] = useState('doanhso');
    const [startDate, setStartDate] = useState(new Date('2023-07-09'));
    const [endDate, setEndDate] = useState(new Date());
    const [data,setData] =useState([])
    const [revenue,setRevenue] =useState(0)
    const [modalShow, setModalShow] = useState(false);
    const [dataModal,setDataModal] =useState({})
    const [rev,setRev] = useState()
    useEffect(() => {
        setTimeout(async () =>{
            try {
                let rev_30= await Axios({
                    method: 'get',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'http://103.229.53.71:5000/reveune_30day',
                })
                setRev(rev_30.data)
                //console.log(rev_30.data)
            } catch (error) {
                console.error(error);
            } finally {
            }
            
        },1000)
        return ;
    },[]);

    let top_link=(
        <div className="container row">
            <div className="pe rounded p-2 m-1 col-sm bt text-white"
            onClick={() => setPageStat('doanhso')}
            >
                Đơn và doanh số
            </div>
            <div className="pe rounded p-2 m-1 col-sm bt text-white"
            onClick={ () => setPageStat('bieudo')}
            >
                Biểu đồ
            </div>
            
        </div> 
    )
    
    function MyVerticallyCenteredModal(props) {
        
        if(props.nguyenlieu[0]=== undefined) 
        return <></>
        const LoadTopping = ({topp}) =>{
            if( topp.length === 0) return <></>
            let t = topp.map( (item,i) => 
                <tr key={item.ten + i} className="text-start">
                    <td style={{width: "10vw"}}></td>
                    <td className="head-4 pe-4">{item.ten}</td>
                    <td className="head-4">{item.gia}</td>
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
    const ShowOrder = (item) =>{
        console.log(item)
        setModalShow(true)
        setDataModal(item)
    }


    function LoadOrder(){
        if (data[0]===undefined|| data[0]===null)
        return (<></>)
        
        let key = Object.keys(data[0])
        key.pop()
        let t = data.map((item,index) =>
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
                        onClick={() =>ShowOrder(item[el])} 
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
                    <tbody 
                    //dangerouslySetInnerHTML={{__html: t}}
                    >
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

    const SumPrice = () =>{
        let sum = 0
        data.map(el => sum +=el.gia)
        setRevenue(sum)
        return<span className="text-danger price">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum)}
        </span>;
    }
    const handleFilter = (e)=>{
        e.preventDefault();
        let Date_start = getDate(startDate)
        let Date_end = getDate(endDate)
        if(endDate<startDate)
        alert("Vui lòng chọn đúng mốc thời gian bắt đầu và kết thúc")
        else{
            Axios({
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/filter_order/${Date_start}_${Date_end}`,
            }).then((response) => 
                setData(response.data)
            )   
            
        }
    }
    

    let tg= <>từ ngày {startDate.toLocaleDateString('en-GB')} đến trước ngày {endDate.toLocaleDateString('en-GB')}</>
    
    const labels = rev === undefined ? [] :  rev.map( el => new Date(el.time).toLocaleString('en-GB'));

    const chart_data = {
        labels,
        datasets: [
          {
            label: 'Doanh thu',
            data:rev === undefined ? [] : rev.map((el) => el.doanhthu),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
   
          },
        ],
      };
    

    if(pageStat==="doanhso")
    return(
        <div className="container Stat">
            {top_link}
            <h1>Doanh số</h1>
            <div className="justify-content-center row" >
                <div className="row col" >
                    <label className="m-1 col col-sm" style={{width: "20vw"}}> Từ ngày </label>
                    <div className="col-7-sm">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        
                    />
                    </div>
                </div>
                <div className="row col" >
                    <label className="m-1 col col-sm" style={{width: "20vw"}}> đến trước ngày </label>
                    <div className="col-7-sm">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        
                    />
                    </div>
                </div>
            </div>
            <div className="justify-content-center m-4">
                    <button className="ms-1 border-0 bt text-white pe"
                    onClick={handleFilter}
                    >
                        Kết quả
                    </button>
                </div>
            <h4 className="mt-4 h4">Thống kê đơn hàng và doanh số</h4>
            <h4 className="mb-4 h4">{tg}</h4>
            <h5 className="mt-4 h3"> Doanh thu: <SumPrice/></h5>
            <LoadOrder/>
            
        </div>
    )
    else
    if(pageStat==="bieudo"){
        

        return(
            <div className="container Stat">
                {top_link}
                
                <div id="chart_rev30" className="">
                    <Line options={options} data={chart_data} />;
                </div>
            
            </div>
        )
    }
    
    
}

export default Static;