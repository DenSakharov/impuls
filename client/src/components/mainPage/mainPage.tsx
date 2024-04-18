import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import MuiButTree from './muiButTree';
import About from './../about/about';
import Contacts from '../about/contacts_teem';
import data from '../editPopup/data';

export default function MainPage() {

  const [projectData, setProjectData] = React.useState(data.tree[0]);

  const changeState = (value : any) => {
    setProjectData(value)
    console.log(projectData)
  }

  return (
<div className="mainApp mainApp-push-bottom">

<MuiMenu changeState={changeState}/>

<div className ="clear"/>

<main className='section'>
  <div className='container-app'>

    <div className="aside">
      <MuiButTree/>
   	  <MuiTree projectData={projectData}/>
  	</div>

	  <div className="content">
      <div id="containerHeader">
	     <div id="mainHeader">
			  <div className="content-text-block">
   			  <span> Рабочий стол </span>
			  </div>
    	 </div>

      <div id="container-news">
      Новости
      <div className="aside">

  	  </div>
   	  </div>

      <div id="container-kpi">
      Ключевые показатели
   	  </div>

      <div id="container-proj">
        Информация проекта
   	  </div>

    </div>
	</div>

  </div>
</main>

<div className ="clear"/>

<footer id="content">
    <div id='foot'>
      <p> <About/> | <Contacts/> </p>
      <p id="copyright"><a href="">© Impuls Teem 2024</a></p>
    </div>

</footer>
</div>
);
}
