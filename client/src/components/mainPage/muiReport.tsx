// Кожевников СЮ страница Отчеты
import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Container } from "@mui/material";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'ReqReport',
    label: 'Спецификация требований',
  },
  {
    value: 'GlossaryReport',
    label: 'Глоссарий',
  },      
  {
    value: 'ArchReport',
    label: 'Архитектура',
  },    
  
];

function Report() {
  return (
<Card sx={{ padding: '20px', margin: '20px' }}>
   <Box height={400} style={{ textAlign: 'center' }}>
      <Typography variant="h5"  gutterBottom>Отчеты</Typography>
      <Container maxWidth="md" sx={{ mt: 5 }}>
    

      <TextField
          id="projects-select-status"
          focused
          select
          label="Список отчетов"
          margin="dense"
          fullWidth
          // onChange={(e) => setStatus(e.target.value)}
          // value ={}
          helperText="Выберите отчет из списка"
          sx={{ mb: 2 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div> <Button > Просморт</Button> </div>  
        <div> <Button color="primary"> Печать </Button>  </div>  
        

        </Container>
   </Box>
  </Card>

  );
}

export default Report;