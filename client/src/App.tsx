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
import Testpage from './components/mainPage/testpage';
import { v4 as uuidV4 } from 'uuid';
import { JWToken } from './Context'
import MainNavBar from './components/mainPage/mainNavBar';
import Report from "./components/mainPage/report";
import Admin from "./components/mainPage/admin";
import Integration from "./components/mainPage/integration";
import Searchpage from "./components/mainPage/searchpage";
import FormDialog from './components/CordinationPage/FormDialog';
import CordinationPage from './components/CordinationPage/CordinationPage';

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
  } else if (currentPath === '/report') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/searchpage') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/documents') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/integration') {
    navbarComponent = <MainNavBar/>
  } else if (currentPath === '/admin') {
    navbarComponent = <MainNavBar/>
  }
  else {
    navbarComponent = null
  }

  const [token, setToken] = React.useState('')

  return (
    <JWToken.Provider value={{token, setToken}}>
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
          <Route path='/projects' Component={Projects}></Route>
          <Route path='/admin' Component={Admin}></Route>
          <Route path='/integration' Component={Integration}></Route>
          <Route path='/replace_password' Component={ReplacePassword}></Route>
          <Route path='/TableData' Component={TableData}> </Route>
          <Route path='/CordinationPage' Component={CordinationPage}></Route>
          <Route path='/FormDialog' Component={FormDialog}> </Route>
          <Route path="/documents" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path="/documents/:id" element ={<TextEditor />} />
          <Route path='/test' Component ={Testpage}> </Route>
        </Routes>
      </BrowserRouter>
    </JWToken.Provider>
  );
}

export default App;
