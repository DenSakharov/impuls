// Кожевников СЮ  таблица всех проектов

import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import EditProjectsModal from './editProjects';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns = [
  { field: 'id', headerName: 'UUID', width: 250 },
  { field: 'name', headerName: 'Название проекта', width: 250 },
  { field: 'status', headerName: 'Статус', width: 50 },
]

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'UUID', width: 250 },
//   { field: 'name', headerName: 'Название проекта', width: 250 },
//   { field: 'status', headerName: 'Статус', width: 50 },
// ];


const ListProjects = ({ dataProject }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);


  // Edit Projects
  const handleCloseModalEdit = () => {
      setShowModalEdit(false);
  };
      useEffect(() => {
        // console.log(dataProject)
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((data) => data.json())
          .then((data) => setTableData(data))
          // setTableData(dataProject)

      }, [])
      console.log(tableData)
      const [selectedRows, setSelectedRows] = React.useState([]);
  return (

    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     checkboxSelection
    //     onSelectionModelChange={(ids) => {
    //       const selectedIDs = new Set(ids);
    //       const selectedRows = dataProject.rows.filter((row) =>
    //         selectedIDs.has(row.id),
    //       );

    //       setSelectedRows(selectedRows);
    //     }}
    //     {...dataProject}
    //   />
    //   <pre style={{ fontSize: 10 }}>
    //     {JSON.stringify(selectedRows, null, 4)}
    //   </pre>
    // </div>
    <TableContainer component={Paper} >
      <Table
        aria-labelledby="tableTitle"
        size='small'>
        <TableHead>
          <TableRow>
            <TableCell> UUID </TableCell>
            <TableCell> Название проекта </TableCell>
            <TableCell align="center"> Статус </TableCell>
            {/* <TableCell align="left"> Описание </TableCell>     */}
            <TableCell align="center"> Действия </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataProject && dataProject.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              // onSelectionChange={(newSelection) => {setSelection(newSelection.rows) }}
            >
              <TableCell component="th" scope="row"> {item.projectId}</TableCell>
              <TableCell component="th" scope="row"> {item.name}</TableCell>
              <TableCell align="center">{item.status}</TableCell>
              {/* <TableCell align="left">{item.notes}</TableCell> */}
              <TableCell align="center">
                <div><Button variant="text" onClick={() => setShowModalEdit(true)}> Изменить </Button>

                <Button variant="text" onClick={() => {}}> Удалить  </Button></div>
                {showModalEdit && <EditProjectsModal open  projectsItem={item.projectId} onClose={handleCloseModalEdit} />}


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default ListProjects;

