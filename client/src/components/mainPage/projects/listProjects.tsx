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
import { tProjectAttributes } from '#/dtos';
import MuiDeleteElement from '../muiDeleteElement';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// const columns = [
//   { field: 'id', headerName: 'UUID', width: 250 },
//   { field: 'name', headerName: 'Название проекта', width: 250 },
//   { field: 'status', headerName: 'Статус', width: 50 },
// ]

export type ListProjectsProps = {
  projects: tProjectAttributes[];
  reload: () => void;
}
const ListProjects = ({ projects, reload }: ListProjectsProps) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  
  const openModalDelete = () => setShowModalDelete(true);
  const closeModalDelete = () => setShowModalDelete(false);

  //const [tableData, setTableData] = useState([])
  const [selectedItem, setSelectedItem] = useState<tProjectAttributes|null>(null);
  //const [rows, setRows] = useState(tableData);
  //const [deletedRows, setDeletedRows] = useState([]);


  // Edit Projects
  const handleCloseModalEdit = () => {
      setShowModalEdit(false);
  };

  //const [selectedRows, setSelectedRows] = React.useState([]);
  const editClickHandler = (item: tProjectAttributes) => {
    setSelectedItem(item);
    setShowModalEdit(true);    
  }
  const deleteClickHandler = (item: tProjectAttributes) => {
    setSelectedItem(item);
    openModalDelete();
  }

  return (
    <>
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
            {projects && projects.map((item, index) => (
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
                  <div><Button variant="text" onClick={() => editClickHandler(item)}> Изменить </Button>

                  <Button variant="text" onClick={() => deleteClickHandler(item)}> Удалить  </Button></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          {showModalEdit && selectedItem && <EditProjectsModal projectsItem={selectedItem} onClose={handleCloseModalEdit} onSuccessCallback={reload}/>}
      </TableContainer>
      {selectedItem && <MuiDeleteElement
          title="Удалить проект" 
          element={selectedItem}
          projectId={""}
          onSuccessCallback={reload}
          isOpen={showModalDelete}
          onClose={closeModalDelete}
      />}
    </>
);
}

export default ListProjects;

