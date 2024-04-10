import React from 'react';
import './stylesMainPage.css';

function mainPage() {
  return (
<div className="mainApp mainApp-push-bottom">

<header className="header">

    <nav id="cssmenu">
		<ul>
			<li>
          <img src='./img/logo.png' className="mainApp-logo" alt="logo" width="50" height="50" />
			</li>
      <li>
        <div>
         <p id="h3">IMS Impuls </p>
         <p>Project №1</p>
        </div>
			</li>
			<li>
      <a href='' target=""><span>Home</span></a>
			</li>
			<li>
				<a href='' target=""><span>Меню1</span></a>
			</li>
			<li className='active has-sub'><a href='#'><span>Меню2</span></a>
				<ul>
					<li className='has-sub'><a href='' target=""><span>под меню21</span></a></li>
					<li className='has-sub'><a href='' target=""><span>под меню22</span></a></li>
					<li className='has-sub'><a href='' target=""><span>под меню23</span></a></li>
					<li className='has-sub'><a href='' target=""><span>под меню24</span></a></li>
				</ul>
			</li>
			<li className='last'><a href='' target=""><span>Меню3</span></a>
			</li>
      <li className='last'><a href='' target=""><span>Меню4</span></a>
			</li>
      <li className='last'><a href='' target=""><span>|</span></a>
			</li>
      <li className='last'>
      <a
          className="App-link"
          href="http://localhost:3000"
          target=""
          rel="noopener noreferrer"
        >
          Сменить пользователя
        </a>
       </li>
       <li className='last'><a
          className="App-link"
          href="http://localhost:3000/about"
          target=""
          rel="noopener noreferrer"
        >
          Профиль
          </a>
			</li>
       <li className='last'>
			</li>
		</ul>
  </nav>

</header>

<div className ="clear"/>

<main className='section'>
  <div className='container-app'>

    <div className="aside">
   	Left side
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

export default mainPage;
