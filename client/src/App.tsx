import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import EditPopup from './components/editPopup/editPopup';
import Profile from './components/profile/profile';
import ReplacePassword from './components/profile/replacePassword';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='' Component={TestPage}></Route>
          <Route path='/popup' Component={EditPopup}></Route>
          <Route path='/popup' Component={Profile}></Route>
          <Route path='/popup' Component={ReplacePassword}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
