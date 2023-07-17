import "./data_table.scss"
import { MaterialReactTable } from 'material-react-table';
import { useEffect,useCallback, useState } from "react"
import Axios from "axios"
import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    IconButton,
    Tooltip,
  } from '@mui/material';

function DATA_TABLE({title,head,label,data}){
    // set the initial state
    const [isLoading, setIsLoading] = useState(true);
    let [tableData, setTableData] = useState([]);
    
    const [DONVI,setDONVI]= useState([])
    const [NHOMVATTU,setNHOMVATTU]= useState([])
    const [validationErrors, setValidationErrors] = useState("")

    useEffect( ()=>{
        
        setTimeout(async () => {
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
    
                setTableData(data);
                let arr_dv=[];
                DV.data.map(item => {
                    arr_dv.push(item.ten);
                })
                setDONVI(arr_dv)
    
                let arr_nvt=[];
                NVT.data.map(item => {
                    arr_nvt.push(item.ten);
                })
                setNHOMVATTU(arr_nvt)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }

            
        },1000)

    },[data])

    
    let columns= []
    for (let index = 0; index < label.length; index++) {
        let t={}
        if(head[index]==="ID"||head[index]==="Ảnh"||head[index]==="Thời gian"){
            t = {
                header: head[index],
                accessorKey:label[index],
                enableEditing:false,
                size:50
            }
        }
        else
        if(head[index]==="Số Lượng"||head[index]==="Tiền"){
            t = {
                header: head[index],
                accessorKey:label[index],
                size:50,
                muiTableBodyCellEditTextFieldProps: {
                    type: 'number',
                    variant: 'outlined',
                    helperText: validationErrors, //show error message in helper text.
                    onChange: (event) => {
                        const value = event.target.value;
                        //validation logic
                        if ((head[index]==="Tiền") && (value % 1000 !== 0)) {
                        setValidationErrors('Giá tiền phải là bội số của 1000');
                        } else {
                            setValidationErrors('');
                        }
                    },
                  },
            }
        }
        else
        if(head[index]==="Đơn vị"){
            t = {
                header: head[index],
                accessorKey:label[index],
                size:50,
                editVariant:"select",
                editSelectOptions:DONVI
            }
        }
        else
        if(head[index]==="Loại Vật tư"){
            t = {
                header: head[index],
                accessorKey:label[index],
                size:50,
                editVariant:"select",
                editSelectOptions:NHOMVATTU
            }
        }
        else{
            t={
                header: head[index],
                accessorKey:label[index],
                size:50,
                
            }
        }
        columns.push(t);
    }


    
    const handleSaveRow = async ({ exitEditingMode, row, values }) => {
        //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
        if(values.tien%1000!==0) {
            window.alert("Giá tiền nhập vào phải là bội số của 1000")
            return;
        }
        else{
            let ID=values._id
            values.time= new Date().toISOString();
            tableData[row.index] = values;
            //send/receive api updates here
            setTableData([...tableData]);
            Axios({
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/update/list_mon/${ID}`,
                data:values
            });
        }
        
        exitEditingMode(); //required to exit editing mode
    };

    

    const handleDeleteRow = useCallback(
    (row) => {
        if (
        window.confirm(`Are you sure you want to delete ${tableData[row.index].ten}`)
        ) {
            const id =tableData[row.index]._id
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
            Axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `http://103.229.53.71:5000/delete/list_mon/${id}`,
            });
            return;
        }

        //send api delete request here, then refetch or update local table data for re-render
        
    },
    [tableData],
    );
    
    
    
    return (
        <div className="row">
            <h1 className="text-center">{title}</h1>
            <MaterialReactTable
            
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableEditing
                onEditingRowSave={handleSaveRow}
                enableStickyHeader
                muiTableBodyProps={{
                    sx: {
                      //stripe the rows, make odd rows a darker color
                        '& tr:nth-of-type(odd)': {
                            backgroundColor: '#f5f5f5',
                        },
                        '& td':{
                            padding:'0.5rem',
                            overflowX:'auto',
                            maxWidth:'160px !important'
                        },

                    },
                  }}
                muiTablePaperProps={{
                    elevation: 0, //change the mui box shadow
                    //customize paper styles
                    sx: {
                        borderRadius: '0',
                        border: '1px solid #e0e0e0',
                    },
                }}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="success" onClick={() =>handleDetail(row)}>
                          <VisibilityIcon/>
                        </IconButton>
                      </Tooltip> */}
                    </Box>
                  )}
                state={{ isLoading }}
                muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
            />

        </div>
    )


}

export default DATA_TABLE;