import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import EditPopup from './components/editPopup/editPopup';
import MainPage from './components/mainPage/mainPage';
import About from './components/about/about';
import LoginPage from './components/loginPage/loginPage';
import MuiPopup from './components/muiPopup/muiPopup';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='' Component={LoginPage}></Route>
          <Route path='/test' Component={TestPage}></Route>
          <Route path='/main' Component={MainPage}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/popup' element={EditPopup()}></Route>
          <Route path='/popup2' element={MuiPopup()}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
