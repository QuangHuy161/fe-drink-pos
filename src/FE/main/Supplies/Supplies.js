import Data_Table from "./Data_table";
function Supplies(){

    let el=[
        {type:'text',label:"ID",id:"id",required:"yes"},
        {type:'text',label:"Tên",id:"ten",required:"yes"},
        {type:'text',label:"Nguồn gốc",id:"nguongoc",required:"yes"},
        {type:'dropdown',label:"Đơn vị",id:"donvi",required:"yes"},
        {type:'dropdown',label:"Loại",id:"loai",required:"yes"},
        {type:'img',label:"Chọn ảnh",id:"img",required:"yes"}
    ]

    let d_el_data=["a","b","c","d"]
    let T1='';
    for (let index = 0; index < el.length; index++) {
        let temp=''
        if(el[index].type=="text"){
            temp=`
            <div class="row m-1">
                <label class="text-start col-5" for=${el[index].id}>${el[index].label} </label>
                <input class="col-7" type="text" id=${el[index].id}> 
            </div>
            `
        }

        if(el[index].type=="dropdown"){
            let d_el='';
            for(let index=0; index <d_el_data.length; index++){
                d_el+= ` <option value=${d_el_data[index]}>${d_el_data[index]}</option>`
            }
            temp=`
                <div class="row m-1">
                    <label class="text-start col-5" for=${el[index].id}>${el[index].label}</label>
                    <select class="col-7" id=${el[index].id}>
                        ${d_el}
                    </select>
                </div>
             `
        }

        if(el[index].type=="img"){
            temp=`
            <div class="row m-1">
                <input  id=${el[index].id} type="file" class="form-control-file" accept="image/png, image/jpeg" />
            </div>
            `
        }
        T1+=temp;
    }
    let T =`
            <div class="d-grid justify-content-start row w-75 m-1  form-group">
                ${T1}
            </div>
            <input type="submit" class="btn btn-submit text-white mb-2"></input>
    `
    let data=[]
    let m_data={};

    function ValidForm(e){
        e.preventDefault();
        let arr=[]
        let label=[]
        el.filter((k)=>{
            let t=k.id;
            label.push(k.label);
            arr.push(document.getElementById(t).value);
        })
        if(window.localStorage.getItem("m_data")!== null)
            data=JSON.parse(window.localStorage.getItem("m_data")).data;
        data.push(arr);
        m_data.head=label;
        m_data.data=data;

        window.localStorage.setItem("m_data",JSON.stringify(m_data));

        console.log(m_data)
    }
    return(
        <div>
            <form onSubmit={ValidForm} id="form_data "method="get" dangerouslySetInnerHTML={{__html: T}}>
            </form>
            {Data_Table(window.localStorage.getItem("m_data"))}
        </div>
    );

}
export  default Supplies;