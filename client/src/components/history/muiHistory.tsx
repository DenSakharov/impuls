// Кожевников СЮ
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Card, Typography, Box } from '@mui/material';
import { Container } from "@mui/material";

function History() {
  // const [appState, setAppState] = useState();  
  // useEffect(() => {
  //   const apiUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  //   axios.get(apiUrl).then((resp) => {
  //     const allPersons = resp.data;
  //     setAppState(allPersons);
  //   });
  // }, [setAppState]);

  return (
<Card >           
   <Box sx={{ width: 1 }} height={400} style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom> История изменений </Typography>
      <Container maxWidth="md" sx={{ mt: 5 }}>  

    
    <div className="app">
    
    </div>
  
      

      </Container>       
   </Box>
  </Card>

  );
}

export default History;