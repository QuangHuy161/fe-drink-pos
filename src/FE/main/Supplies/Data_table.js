import "./data_table.scss"
function Data_Table(obj){
    if(obj === null)
        return(
            <div></div>
        );

    let arr=JSON.parse(obj);
    const label=arr.head;
    const meta_data=arr.data;

    let th=`<th scope="col"></th>`;
    for (let index = 0; index < label.length; index++) {
        th+=`<th scope="col">${label[index]}</th>`
        
    }
    let thead=`
        <tr>
            ${th}
        </tr>
    `;

    let trow=``;
    for (let i = 0; i < meta_data.length; i++) {
        let m=`<th scope="row">${i}</th>`
        for (let j = 0; j < meta_data[i].length; j++) {
            const n =`<td>${meta_data[i][j]}</td>`;
            m+=n;
        }
        m=`
        <tr>
            ${m}
        </tr>
        `
        trow+=m;
    }

    return (
        <div id="data_list" class="data_table">
            <table class="table">
            <thead dangerouslySetInnerHTML={{__html:thead}}>
            </thead>
            <tbody  dangerouslySetInnerHTML={{__html:trow}}>
            </tbody>
            </table>

        </div>

    )


}

export default Data_Table;