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
import TableData from './components/CordinationPage/table1';
import { v4 as uuidV4 } from 'uuid';
import MainNavBar from './components/mainPage/mainNavBar';

function App() {

  // условие для отображения navbarComponent
  const currentPath = window.location.pathname;
  let navbarComponent;   
  if (currentPath === '/main') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/projects') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/TableData') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/documents') {
    navbarComponent = <MainNavBar/>
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
          <Route path='/popup' element={MuiPopup()}></Route>
          <Route path='/userProfile' Component={Profile}></Route>
          <Route path='/projects' Component={Projects}></Route>
          <Route path='/replace_password' Component={ReplacePassword}></Route>
          <Route path='/TableData' Component={TableData}> </Route>
          <Route path="/documents" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path="/documents/:id" element ={<TextEditor />} />

          <Route></Route>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
