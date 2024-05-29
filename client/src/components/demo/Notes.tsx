// import React from 'react';

// const Notes = ({ data }) => {
//   return (
//     <div>
//       <ul>
//         {data && data.map((item, index) => 
//         <li key={index}>{index} | {item.name} | {item.notes} | {item.status}</li>
        
//         )}
//       </ul>
//     </div>
//   );
// };
// export default Notes;

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const Notes = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Список проектов">
        <TableHead>
          <TableRow>
            <TableCell> Название проекта </TableCell>
            <TableCell align="right"> Статус </TableCell>
            <TableCell align="right"> Описание </TableCell>            
          </TableRow>
        </TableHead>

        <TableBody>
          {data && data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {item.name}</TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right">{item.notes}</TableCell>    
              <TableCell align="right">Edit</TableCell> 
              <TableCell align="right">Del</TableCell>           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Notes;