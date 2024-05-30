// Кожевников СЮ Страница для расширенного поиска

import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {DataGrid} from '@mui/x-data-grid';

const columns = [
	{field: 'id', headerName: 'ID', width: 90, headerClassName: 'orange'},
	{
		field: 'userId',
		headerName: 'User ID',
		headerClassName: 'orange',

		editable: true,
		resizable: false,
		align: 'center'
	},
	{
		field: 'title',
		headerName: 'Title',
		width: 350,
		editable: true,
		headerClassName: 'orange'
	},
	{
		field: 'completed',
		headerName: 'Completed',
		width: 110,
		editable: true,
		headerClassName: 'orange'
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 350,
		valueGetter: (params) =>
			`${params.row.id || ''} ${params.row.title || ''}`,
		headerClassName: 'orange'
	}
];

function Searchpage({rows}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (

  <Card sx={{ padding: '20px', margin: '20px' }}>           
   <Box height={400} style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom> Расширенный поиск</Typography>
      <Container maxWidth="md" sx={{ mt: 5 }}>

      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}        
        onChange={handleChange}
        sx={{ width: 300 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />
      </Container>     

      <Container maxWidth="md" sx={{ mt: 5 }}>

      {/* <div style={{width: '80%', margin: 'auto', marginTop: '2rem'}}>
			<DataGrid
				rows={rows}
				 columns={columns}
				 pageSize={20}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
				autoHeight={true}
				sx={{
					'& .orange': {
						backgroundColor: '#ff943975'
					}
				}}
				getCellClassName={(params) => {
					return params.row.completed === true ? 'orange' : '';
				}}
				density="comfortable"
			/>
		</div> */}

      </Container>     

   </Box>
  </Card>
  );
}
export const getStaticProps = async () => {
	const rows = await fetch(
		'https://jsonplaceholder.typicode.com/todos/'
	).then((res) => res.json());
	return {
		props: {rows}
	};
};

export default Searchpage;