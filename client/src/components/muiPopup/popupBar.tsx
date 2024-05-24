import React from 'react';
import './animations/animations.css'
import { Typography, IconButton, Box, Toolbar, AppBar, Container } from '@mui/material';
import { ArrowDropUp, ArrowDropDown, Close, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight  } from '@mui/icons-material';
import MuiChat from './muiChat';
import MuiHistChngs from './muiHistChngs';
import { closeDialog } from '../mainPage/main';


export default function PopupBar(props: {id:string, updateCallback: Function} = {id: 'null', updateCallback: () => {}}) {
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
          <Typography variant="h6" component="div" sx={{ml: 'auto', mr: 'auto', display:{xs: smallMenu ? 'none' : 'flex' } }}>
            № {props.id}
          </Typography>
          <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ml:'auto', mr: 2, display:{md: 'none', xs: 'flex'}}}
            onClick={() => setSmallMenu(!smallMenu)}    
            >
            {smallMenu ? <KeyboardDoubleArrowRight className='roll-in-left'/> : <KeyboardDoubleArrowLeft />}
          </IconButton>
          <Container disableGutters sx={{ alignContent:'right', display:{md: 'contents', xs: smallMenu ? 'contents' : 'none'}}}>
            <MuiChat/>
            <MuiHistChngs/>
            <IconButton
            className='fade-in'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              if (window.location.pathname === '/main') {
                props.updateCallback()
                closeParentDialog()
              } else {
                closeParentDialog()
                window.open('/main', '_self')
              }
            }}>
          
              <Close fontSize='large'/>
              </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
    
    
  );
}