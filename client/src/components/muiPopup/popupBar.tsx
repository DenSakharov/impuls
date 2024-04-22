import React from 'react';
import { Typography, IconButton, Box, Toolbar, AppBar, Container } from '@mui/material';
import { ArrowDropUp, ArrowDropDown, Close, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight  } from '@mui/icons-material';
import data from '../editPopup/data';
import MuiChat from './muiChat';
import MuiHistChngs from './muiHistChngs';
import EditPopupProps from '../interfaces/editPopupProps';
import { closeDialog } from '../mainPage/mainPage';


export default function PopupBar(props: EditPopupProps = data.object) {
  const [smallMenu, setSmallMenu] = React.useState(false);
  const closeParentDialog = React.useContext(closeDialog)
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
          <Typography variant="h6" component="div" sx={{ml: 'auto', mr: 'auto', display:{xs: smallMenu ? 'none' : 'block' } }}>
            № {props.id}
          </Typography>
          <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ml:'auto', mr: 2, display:{md: 'none', xs: 'block'}}}
            onClick={() => setSmallMenu(!smallMenu)}    
            >
            {smallMenu ? <KeyboardDoubleArrowRight/> : <KeyboardDoubleArrowLeft/>}
          </IconButton>
          {/*@imk-student добавить анимацию при нажатии на стрелки */}
          <Container disableGutters sx={{ alignContent:'right', display:{md: 'contents', xs: smallMenu ? 'contents' : 'none'}}}>
            <MuiChat/>
            <MuiHistChngs/>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => window.location.pathname === '/main' ? closeParentDialog() : window.open('/main', '_self')}>
          
              <Close fontSize='large'/>
              </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
    
    
  );
}