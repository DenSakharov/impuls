import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/profile/profile';
import Projects from './components/projects/projects';
import ReplacePassword from './components/profile/replacePassword';
import MainPage from './components/mainPage/mainPage';
import Main from './components/mainPage/main';
import About from './components/about/about';
import LoginPage from './components/loginPage/loginPage';
import MuiPopup from './components/muiPopup/muiPopup';
import TextEditor from './components/textEditor/TextEditor';
import Registration from './components/registrationPage/registrationPage';
import TableData from './components/CordinationPage/table';
import Testpage from './components/mainPage/testpage';
import { v4 as uuidV4 } from 'uuid';
import MainNavBar from './components/mainPage/mainNavBar';
import Report from "./components/mainPage/muiReport";
import Admin from "./components/admin/admin";
import Integration from "./components/mainPage/integration";
import Searchpage from "./components/mainPage/muiSearchpage";
import History from './components/history/muiHistory';
import muiAllProjects from './components/mainPage/projects/muiAllProjects';
import MuiNews from './components/mainPage/muiNews';

function App() {
  //Кожевников СЮ
  // условие для отображения navbarComponent
  const currentPath = window.location.pathname;
    //console.log(currentPath); // currentPathDoc
    // const currentPathDoc: string = currentPath.slice(0, 36).concat('');
    //console.log(currentPathDoc); // currentPathDoc
  const { Example } = require("./components/excelEditor/Collabration.stories");

  let navbarComponent;
  if (currentPath === '/main') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/project') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/TableData') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/report') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/searchpage') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath.includes('/documents'))  {  
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/integration') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/admin') {
    // navbarComponent = <MainNavBar/>
    navbarComponent = null
  }
  else {
    navbarComponent = null
  }

  return (
      <BrowserRouter>
        {navbarComponent}
        <Routes>
          <Route path='' Component={LoginPage}></Route>
          <Route path='/registration' Component={Registration}></Route>
          <Route path='/main' Component ={Main}> </Route>
          <Route path='/mainPage' Component={MainPage}>  </Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/report' Component={Report}></Route>
          <Route path='/searchpage' Component={Searchpage}></Route>          
          <Route path='/popup' element={MuiPopup()}></Route>
          <Route path='/userProfile' Component={Profile}></Route>
          <Route path='/project' Component={Projects}></Route>
          <Route path='/history' Component={History}></Route>
          <Route path='/allprojects' Component={muiAllProjects}></Route>
          <Route path='/admin' Component={Admin}></Route>
          <Route path='/allnews' Component={MuiNews}></Route>
          <Route path='/integration' Component={Integration}></Route>
          <Route path='/replace_password' Component={ReplacePassword}></Route>
          <Route path='/TableData' Component={TableData}> </Route>
          <Route path="/documents" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path="/documents/:id" element ={<TextEditor />} />
          <Route path="/worksheet" element={ <Example />} />
          <Route path='/test' Component ={Testpage}> </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
