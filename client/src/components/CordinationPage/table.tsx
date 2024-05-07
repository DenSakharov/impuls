import React, { useState } from 'react';
import CordinationForm from './CordinationPage';
import jsonData from './data.json';
import { Alert, Button, Collapse, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { RecordI, records } from './data';
import CloseIcon from '@mui/icons-material/Close'
 
/*function TableData() {
  const [ProjectData, setProjectData] = useState(jsonData);
 
    const tableRows = ProjectData.map((info) => {
        return (
            <tr>
                <td>{info.id}</td>
                <td>{info.name}</td>
                <td>{info.DataCreate}</td>
                <td>{info.DataCordination}</td>
                <td>{info.Autohr}</td>
                <td>{info.Cordinator}</td>
                <td>{info.Status}</td>
            </tr>
        );
    });
 
    const addRows = (data:any) => {
        const totalProject = ProjectData.length;
        data.id = totalProject + 1;
        const updatedProjectData = [...ProjectData];
        updatedProjectData.push(data);
        setProjectData(updatedProjectData);
    };
 
    return (
        <div>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Sr.NO</th>
                        <th>Name</th>
                        <th>DataCreate</th>
                        <th>DataCordination</th>
                        <th>Autohr</th>
                        <th>Cordinator</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            <CordinationForm func={addRows} />
        </div>
    );
}
 
export default TableData;*/

function TableData() {
    //const newRow = document.createElement('TableRow');
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [rows, setRows] = useState<RecordI[]>([...records])
    const [value, setValue] = useState<boolean>(false)
    const removeRecord = (id:number) =>{
        const arr = [...rows]
        arr.forEach((el:RecordI, i:number)=>{
            if(el.id ===id) arr.splice(i, 1)
        })
        setRows([...arr])
        setValue(true)
    }
   return (
        <Container sx={{marginTop:'20px'}} maxWidth='lg'>
            <Button onClick={()=>setIsOpen(prev => !prev)} sx={{
                width:'140px', 
                height:'40px', 
                background:'red', 
                color:'black',
                '&:hover':{
                    background:'blue'
                }
            }
            }>
                {isOpen? 'Закрыть':'Открыть '}
            </Button>
            <Collapse sx={{width:'50px'}} in={isOpen}>
            
            <Table  sx={{ width:'100%', marginTop:'30px' }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ height:'40px', background:'black'}}>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Рег. №
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Наименование
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Дата создания
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Автор документа
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Дата согласования
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Согласующий
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Статус
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody id='Table1'>
                    {rows.map(el => 
                        <TableRow sx={{borderBottom:'solid 2px black'}}>
                            <TableCell>{el.id}</TableCell>
                            <TableCell>{el.name}</TableCell>
                            <TableCell>{el.DataCreate}</TableCell>
                            <TableCell>{el.Autohr}</TableCell>
                            <TableCell>{el.DataCordination}</TableCell>
                            <TableCell>{el.Cordinator}</TableCell>
                            <TableCell sx={{display:'flex', width:'100%',alignItems:'center', justifyContent:'space-between'}}>
                                {el.Status}
                                    <IconButton onClick={()=> removeRecord(el.id)}>
                                        <CloseIcon color='error'/>

                                    </IconButton>
                            </TableCell>
                        
                        </TableRow>
                    ) }
                 
                </TableBody>
                <Tooltip title="Добавить согласующего" >
                    <Button onClick={() => 
                    {
                        const newRow = document.createElement('tr');
                        // Ячейки
                        const CellId = document.createElement('td');
                        const Cellname = document.createElement('td');
                        const CellDataCreate = document.createElement('td');
                        const CellAutohr = document.createElement('td');
                        const CellDataCordination = document.createElement('td');
                        const CellCordinator = document.createElement('td');
                        //данные для ячейки
                        const CellIdText = document.createTextNode('1');
                        const CellnameText = document.createTextNode('2');
                        const CellDataCreateText = document.createTextNode('3');
                        const CellAutohrText = document.createTextNode('ййй');
                        const CellDataCordinationText = document.createTextNode('1');
                        const CellCordinatorText = document.createTextNode('1');

                        CellId.appendChild(CellIdText);
                        Cellname.appendChild(CellnameText);
                        CellDataCreate.appendChild(CellDataCreateText);
                        CellAutohr.appendChild(CellAutohrText);
                       
                        CellDataCordination.appendChild(CellDataCordinationText);
                        CellCordinator.appendChild(CellCordinatorText)

                        
                        newRow.appendChild(CellId);
                        newRow.appendChild(Cellname);
                        newRow.appendChild(CellDataCreate);
                        newRow.appendChild(CellAutohr);
                        newRow.appendChild(CellDataCordination);
                        newRow.appendChild(CellCordinator);
                        document.getElementById('Table1')?.appendChild(newRow);
                       

                    }
                    
                    }>Добавить</Button>
                </Tooltip>
                 

                <Tooltip title="Удалить согласующего" >
                    <Button>Удалить</Button>
                </Tooltip>
                
            </Table>
            </Collapse>

        </Container>
    //    ? <Alert onClose={()=>setValue(false)} > Запись удалена </Alert>;
   )
  }
   
  export default TableData;