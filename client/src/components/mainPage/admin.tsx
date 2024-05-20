import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container } from "@mui/material";
import MuiSidebarAdmin from "./muiSidebarAdmin";

function Admin() {
  return (
  <Card sx={{ padding: '20px', margin: '20px' }}>           
   <Box  style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom sx={{ mt: 5 }}> Администрирование </Typography>
      <Container maxWidth="md" sx={{ mt: 0 }}>

      <MuiSidebarAdmin /> 
      
      </Container>       
   </Box>
  </Card>

  );
}

export default Admin;