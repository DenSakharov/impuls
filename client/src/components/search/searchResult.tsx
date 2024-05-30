import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'logId', headerName: 'Найденый объект', width: 150 },
  { field: 'notes', headerName: 'Ссылка', width: 150 },
];

const SearchResult= ({ data }) => {
  return (
    <div style={{ height: 300, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} /> */}
      <DataGrid
          {...data} 
          columns={columns} 
          autoHeight 
        />

    </div>
  );
}

export default SearchResult;