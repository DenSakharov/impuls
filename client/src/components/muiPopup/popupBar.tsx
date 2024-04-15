import React from 'react';
import { Typography, IconButton, Box, Toolbar, AppBar, Container, Menu, MenuItem } from '@mui/material';
import { ArrowDropUp, ArrowDropDown, Close, MoreVert } from '@mui/icons-material';
import data from '../editPopup/data';
import MuiChat from './muiChat';
import MuiHistChngs from './muiHistChngs';
import { useTheme } from '@emotion/react';


export default function PopupBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{flexGrow: 0}}>
      <AppBar  position="static">
        <Toolbar sx={{display:'flex', height: '30px'}}>
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
          <IconButton 
            
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display:{md: 'none', xs: 'block'}}}    
          onClick={handleHover}>
            <MoreVert/>
          </IconButton>

          <Container sx={{display:{md: 'contents', xs: 'none'}}}>
            <MuiChat />
            <MuiHistChngs/>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
              <Close fontSize='large'/>
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu 
      id='basic-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{width: 'justifyContent'}}
      >
        <MenuItem onClick={handleClose}><MuiChat/></MenuItem>
        <MenuItem onClick={handleClose}><MuiHistChngs/></MenuItem>
        <MenuItem onClick={handleClose}><IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
              <Close fontSize='large'/> 
              <Typography sx={{ml: 2}}>Закрыть</Typography>
      </IconButton>
      </MenuItem>   
    </Menu>
    </Box>
    
    
  );
}