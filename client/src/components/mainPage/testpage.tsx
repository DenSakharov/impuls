import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import About from '../about/about';
import Contacts from '../about/contacts_teem';

import data from '../editPopup/data';
import { Dialog } from '@mui/material';
import MuiPopup from '../muiPopup/muiPopup';
import { Container } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Box from '@mui/system/Box';



const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid #F5F5F5' ,
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'left',
}));

export default function Testpage() {
  const [popupData, setPopupData] = React.useState(data.object);
  const [projectData, setProjectData] = React.useState(data.tree[0]);
  const [formOpen, setFormOpen] = React.useState(false);

  const handleCloseForm = () => {
  setFormOpen(false);
    }
  const handleOpenForm = () => {
  setFormOpen(true);
    }


  return (
<div className="mainApp mainApp-push-bottom">

<MuiMenu changeState={setProjectData}/>

<Dialog  maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
  <MuiPopup {...popupData}/>
</Dialog>
<div className ="clear"/>

<main className='section'>
  <div className='container-app'>

    <div className="aside">
      <MuiButTree/>
   	  <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={setPopupData}/>
  	</div>

	  <div className="content">
      <div id="containerHeader">

      <div id="mainHeader">
			  <div className="content-text-block">
   			  <span> Рабочий стол </span>
			  </div>
    	</div>
       <Container fixed>
        <Box sx={{ bgcolor: '#F5F5F5', height: '10vh' }} >
        <div className="container-news">
        <h1 className="text-3xl font-bold underline"> Новости </h1>
         <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
          </Item>
        </Grid>
      </Grid>
    </Box>
       	    </div>
        </Box>
      </Container>

       <Container fixed>
        <Box sx={{ bgcolor: '#FFFFFF', height: '70vh' }} >
        <h1 className="text-3xl font-bold underline"> Ключевые показатели  </h1>
          <div className="container-kpi1">
           </div>
        </Box>
      </Container>

      <Container fixed>
        <Box sx={{ bgcolor: '#F5F5F5', height: '10vh'}} >
        <div className="container-proj">
        <h1 className="text-3xl font-bold underline"> Информация проекта</h1>
   	  </div>
        </Box>
      </Container>
    </div>
	</div>
  </div>
</main>

<div className ="clear"/>

<footer id="content">
    <div id='foot'>
      <p> <About/> | <Contacts/> </p>
      <p id="copyright"><a href="/" target="_blank" rel="noreferrer">© Impulse Team 2024</a></p>
    </div>
</footer>



</div>
);
}
