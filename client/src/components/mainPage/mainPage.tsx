import React from 'react';
import './stylesMainPage.css';
import MuiMenu from './muiMenu';
import MuiTree from './muiTree';
import data from '../editPopup/data';

function MainPage() {

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
   	 <MuiTree projectData={projectData}/>
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
      <p> <a className="App-link" href="http://localhost:3000/about"
          target="" rel="noopener noreferrer">
          О проекте </a> | <a href="">Контакты </a> </p>
      <p id="copyright"><a href="">© Impuls Teem 2024</a></p>
    </div>

</footer>

</div>


);
}

export default MainPage;
