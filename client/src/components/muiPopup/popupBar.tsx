import React from 'react';
import { Typography, IconButton, Box, Toolbar, AppBar } from '@mui/material';
import { ArrowDropUp, ArrowDropDown, Close } from '@mui/icons-material';
import data from '../editPopup/data';
import MuiChat from './muiChat';
import MuiHistChngs from './muiHistChngs';
import { useTheme } from '@emotion/react';


export default function PopupBar() {
  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ height: '30px'}}>
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