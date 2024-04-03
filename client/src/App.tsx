import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import EditPopup from './components/editPopup/editPopup';

function App() {
  const popupObj = {
    id: 10000,
    name: "string",
    desc: "string",
    author: "string",
    status: "string",
    date_created: new Date("2024-01-01"),
    date_changed: new Date("2024-03-01"),
    type: "string",
    priority: "string",
    path: "string",
    link: "string",
    tags: [{ key: "tag1", value: "string" }, { key: "tag2", value: "string" }],
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path='' Component={TestPage}></Route>
          <Route path='/popup' element={EditPopup(popupObj)}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
