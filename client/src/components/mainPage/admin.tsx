import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container } from "@mui/material";

function Admin() {
  return (
<Card sx={{ padding: '20px', margin: '20px' }}>           
   <Box height={400} style={{ textAlign: 'center' }}>    
      <Typography variant="h5"  gutterBottom> Конфигурация</Typography>
      <Container maxWidth="md" sx={{ mt: 5 }}>
      
      </Container>       
   </Box>
  </Card>

  );
}

export default Admin;