import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowDropUp, ArrowDropDown, Close } from '@mui/icons-material';
import data from '../editPopup/data';
import MuiChat from './muiChat';
import MuiHistChngs from './muiHistChngs';


export default function PopupBar() {
  return (
    <Box sx={{ flexGrow: 0, backgroundColor: '#157298'}}>
      <AppBar position="static" sx={{backgroundColor: '#147298'}}>
        <Toolbar>
          <IconButton        
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowDropUp fontSize='large'/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
            <ArrowDropDown fontSize='large'/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            № {data.object.id}
          </Typography>
          <MuiChat/>
          <MuiHistChngs/>
          <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
            <Close fontSize='large'/>
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}