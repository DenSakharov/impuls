import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import Profile from './components/profile/profile';
import ReplacePassword from './components/profile/replacePassword';
import MainPage from './components/mainPage/mainPage';
import About from './components/about/about';
import LoginPage from './components/loginPage/loginPage';
import MuiPopup from './components/muiPopup/muiPopup';
import TextEditor from './components/textEditor/TextEditor';
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path='' Component={LoginPage}></Route>
          <Route path='/test' Component={TestPage}></Route>
          <Route path='/main' Component={MainPage}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/popup' element={MuiPopup()}></Route>
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/replace_password' Component={ReplacePassword}></Route>
          <Route path="/documents" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path="/documents/:id" element ={<TextEditor />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
