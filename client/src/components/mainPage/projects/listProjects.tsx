// Кожевников СЮ  таблица проектов

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const ListProjects = ({ data }) => {
  return (
    // <Dialog open fullWidth maxWidth="sm">
    // <DialogTitle>Список проектов</DialogTitle>
    // <DialogContent>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell> Название проекта </TableCell>
            <TableCell align="center"> Статус </TableCell>
            <TableCell align="left"> Описание </TableCell>    
            <TableCell align="center"> Действия </TableCell>         
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {item.name}</TableCell>
              <TableCell align="center">{item.status}</TableCell>
              <TableCell align="left">{item.notes}</TableCell>
              <TableCell align="center">
                <div><Button variant="text"> Изменить </Button> "|"
                <Button variant="text"> Удалить  </Button></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  //   </DialogContent>

  //   <DialogActions>
  //       <Button> Закрыть </Button> 
  //       <Button color="primary"> Создать </Button>       
  //   </DialogActions>
  // </Dialog>
  );
}

export default ListProjects;