import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import About from './../about/about';
import data from '../editPopup/data';
import { Dialog } from '@mui/material';
import MuiPopup from '../muiPopup/muiPopup';

export default function MainPage() {
  const [popupData, setPopupData] = React.useState(data.object);
  const [projectData, setProjectData] = React.useState(data.tree[0]);
  const [formOpen, setFormOpen] = React.useState(false);

    
  const changePopupData = (value : any) => {
    setPopupData(value);
  }

  const handleCloseForm = () => {
  setFormOpen(false);
    }
  const handleOpenForm = () => {
  setFormOpen(true);
    }
  const changeState = (value : any) => {
    setProjectData(value)
    console.log(projectData)
  }

  return (
<div className="mainApp mainApp-push-bottom">

<MuiMenu changeState={changeState}/>

<Dialog  maxWidth="lg" open={formOpen} onClose={handleCloseForm}>
  <MuiPopup {...popupData}/>
</Dialog>
<div className ="clear"/>

<main className='section'>
  <div className='container-app'>

    <div className="aside">
      <MuiButTree/>
   	  <MuiTree data={projectData} handleOpenForm={handleOpenForm} setPopupData={changePopupData}/>
  	</div>

	  <div className="content">
      <div id="containerHeader">
	     <div id="mainHeader">
			  <div className="content-text-block">
   			  <p> Дашборд проекта</p>
			  </div>
    	 </div>

      <div id="container-news">
      <p>Новости</p>
      <div className="aside">

  	  </div>
   	  </div>

      <div id="container-kpi">
      <p>Ключевые показатели</p>
   	  </div>

      <div id="container-proj">
      <p>Информация проекта</p>
   	  </div>

    </div>
	</div>

  </div>
</main>

<div className ="clear"/>

<footer id="content">
    <div id='foot'>
      <p> <About/> | <a href="http://localhost:3000/about">Контакты </a> </p>
      <p id="copyright"><a href="http://localhost:3000/about">© Impuls Teem 2024</a></p>
    </div>

</footer>
</div>
);
}
