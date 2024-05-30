// Кожевников СЮ  таблица системных событий

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
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// logId: UUID;
// datetime?: Date;
// author?: string;
// notes?: string;
// objectId?: number;
// logtype?: string;
// modules?: string;
// actions?: string;
// dateEdited?:Date;

const ListHistory = ({ data }) => {
  // const [tableData, setTableData] = useState([])

  return (

    <TableContainer component={Paper}>
      <Table
        // style={{ width: 100 }}
        aria-labelledby="tableTitle"        
        size='small'>
        <TableHead>
          <TableRow>
            {/* <TableCell> logId </TableCell> */}
            <TableCell> datetime </TableCell>
            <TableCell align="center"> author </TableCell>
            {/* <TableCell align="left"> notes </TableCell>     */}
            {/* <TableCell align="center"> objectId </TableCell> */}
            {/* <TableCell align="left"> logtype </TableCell>     */}
            <TableCell align="left"> modules </TableCell>    
            <TableCell align="left"> actions </TableCell> 
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}              
            >
              {/* <TableCell component="th" scope="row"> {item.logId}</TableCell> */}
              <TableCell component="th" scope="row"> {item.datetime}</TableCell>
              <TableCell align="left">{item.author}</TableCell>
              {/* <TableCell align="left" style={{ width: 100 }}>{item.notes}</TableCell> */}
              {/* <TableCell align="left">{item.objectId}</TableCell> */}
              {/* <TableCell align="left">{item.logtype}</TableCell> */}
              <TableCell align="left">{item.modules}</TableCell>
              <TableCell align="left">{item.actions}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default ListHistory;

