import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import EditPopup from './components/editPopup/editPopup';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='' Component={TestPage}></Route>
          <Route path='/popup' Component={EditPopup}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
