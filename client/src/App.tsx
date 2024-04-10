import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import MainPage from './components/mainPage/mainPage';
import About from './components/about/about';
import LoginPage from './components/loginPage/loginPage';
import MuiPopup from './components/muiPopup/muiPopup';
import MainFormBar from './components/mainPage/muiMenu';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='' Component={LoginPage}></Route>
          <Route path='/test' Component={TestPage}></Route>
          <Route path='/main' Component={MainPage}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/popup' element={MuiPopup()}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
