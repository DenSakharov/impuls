import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, } from '@mui/x-data-grid';


// logId: UUID;
// datetime?: Date;
// author?: string;
// notes?: string;
// objectId?: number;
// logtype?: string;
// modules?: string;
// actions?: string;
// dateEdited?:Date;
const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns_: GridColDef[] = [
  { field: 'logId', headerName: 'Найденый объект', width: 150 },
  { field: 'notes', headerName: 'Ссылка', width: 150 },
];



const SearchResult= ({ data }) => {
    const { dataGridProps } = data();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            { field: 'logId', headerName: 'logId', Width: 30 },
            {
                field: 'datetime',
                headerName: 'datetime',
                minWidth: 150,
                flex: 1,            
            },
            {
                field: 'author',
                headerName: 'author',
                minWidth: 250,
            },
            {
                field: 'modules',
                headerName: 'modules',
                minWidth: 150,
            },
            {
                field: 'actions',
                headerName: 'actions',
                minWidth: 150,
            },
        ],
        []
    );
  return (
    <div style={{ height: 500, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} /> */}
      <DataGrid
          {...dataGridProps} 
          checkboxSelection
          disableSelectionOnClick
          columns={columns} 
          autoHeight 
        />

    </div>
  );
}

export default SearchResult;