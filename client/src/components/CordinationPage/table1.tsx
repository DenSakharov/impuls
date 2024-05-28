import React, { useState } from 'react';
import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
//import { RecordI } from './data';
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
 

function TableData() {
    const [rows, setRows] = useState( [{id: 0,
        Cordinator: 'Пихтовников',
        DataCordination: '24-12-2023',
        Comment: 'Можно применять в работе',
        Status: false,
        Approved: false }])
    const [value, setValue] = useState<boolean>(false)
    console.log(value)
    const removeRecord = (id:number) =>{
        const arr = [...rows]
        arr.forEach((rows, i:number)=>{
            if(rows.id ===id) arr.splice(i, 1)
        })
        setRows([...arr])
        setValue(true)
   
    }

    const addRecord = (id:number) =>{
        const arr = [...rows]
        arr.forEach((rows, i:number)=>{
            if(rows.id ===id) arr.splice(i, 0)
        })
        setRows([...arr])
        setValue(true)
   
    }
  
   return (
        
        <Container sx={{marginTop:'20px'}} maxWidth='lg'>
            {/*TODO @VladimirPikhtovnikov Предлагаю сбросить цветовые настройки, и поместить форму в диалоговое окно с небольшим меню и добавить кнопку на muiPopup для вызова этого компонента*/}
            
                      
            <Table sx={{ width:'100%', marginTop:'30px' }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ height:'40px', background:'black'}}>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Рег. №
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Согласующий
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Дата согласования
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Комментарий
                        </TableCell>
                        <TableCell sx={{color:'white', fontWeight:600, fontSize:14}}>
                            Статус согл.
                        </TableCell>                   

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(el => 
                        <TableRow sx={{borderBottom:'solid 2px black'}}>
                            <TableCell>{el.id}</TableCell>
                            <TableCell>{el.Cordinator}</TableCell>
                            <TableCell>{el.DataCordination}</TableCell>
                            <TableCell>{el.Comment}</TableCell>
                            <TableCell>{el.Status}</TableCell>
                            <TableCell>{el.Approved}</TableCell>
                            <TableCell sx={{display:'flex', width:'100%',alignItems:'center', justifyContent:'space-between'}}>
                                {el.Status}
                                    <IconButton onClick={()=> removeRecord(el.id)}>
                                        <CloseIcon color='error'/>
                                    </IconButton>
                            </TableCell>

                        </TableRow>
                    ) }
                </TableBody>
                
            </Table>
           
        </Container>
      // { value? <Alert onClose={()=>setValue(false)} > Запись удалена </Alert>};
   )
  }
   
  export default TableData;