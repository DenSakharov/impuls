// Кожевников СЮ Страница для расширенного поиска

import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Searchpage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (

  <Card sx={{ padding: '20px', margin: '20px' }}>           
   <Box height={400} style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom>Расширенный поиск</Typography>
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
   </Box>
  </Card>
  );
}

export default Searchpage;