import Axios from "axios"
import React, { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    let top_link=(
        <div className="row">
            <div class="pe rounded p-2 m-1 col-sm bg-success text-white"
            onClick={() => setPageStat('doanhso')}
            >
                Đơn và doanh số
            </div>
            <div class="pe rounded p-2 m-1 col-sm bg-success text-white"
            onClick={ () => setPageStat('bieudo')}
            >
                Biểu đồ
            </div>
            
        </div> 
    )
    

    function ShowOrder(){
        let t=data.forEach

        return(
            <table>
                <thead>

                </thead>
                <tbody>
                    {t}
                </tbody>
            </table>
            
        )
    }


    function LoadOrder(){

        
        if (data[0]===undefined|| data[0]===null)
        return (<></>)
        
        let key = Object.keys(data[0])
        key.pop()
        let t = data.map((item,index) =>
            <tr data={index} key={index} className="border-bottom border-primary">
            {
                key.map((el,i) =>
                    <td key={i} data={el}> {(el!=='order') ? item[el]:JSON.stringify(item[el])}</td>
                )
            }
            </tr>
         )
            
        
        return(
            <div style={{
                height:"50vh",
                overflowY:"scroll"
                }}>
                <table className="w-100 border-1 table-striped table-bordered">
                    <thead className="thead-light ">
                        <th>ID</th>
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

                
            </div>
        )
    }

    const SumPrice = () =>{
        let sum = 0
        data.map(el => sum +=el.gia)
        setRevenue(sum)
        return<span className="text-danger price">
            {sum}
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
    

    let tg= <>từ ngày {getDate(startDate)} đến ngày {getDate(endDate)}</>
    
    if(pageStat==="doanhso")
    return(
        <div className="Stat">
            {top_link}
            <h1>Doanh số</h1>
            <div class="input-group mb-3">
                <label className="m-1"> Từ ngày </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    
                />
                <label className="m-1"> đến trước ngày </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    
                />
                <button className="ms-1 bg-success text-white border-0 pe"
                onClick={handleFilter}
                >
                    Kết quả
                </button>

                
            </div>
            <h4>Thống kê đơn hàng và doanh số</h4>
            <h4>{tg}</h4>

            
            <LoadOrder/>
            <h5> Doanh thu <SumPrice/> VND</h5>
        </div>
    )
    else
    if(pageStat==="bieudo")
    return(
        <div className="Stat">
            {top_link}
            <h1>Biểu đồ</h1>
        </div>
    )
    
}

export default Static;