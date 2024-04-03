import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './components/testPage/testPage';
import EditPopup from './components/editPopup/editPopup';

function App() {
  const popupObj = {
    id: 10000,
    name: "Документ под названием “Объект 1.2”",
    desc: "Описание документа 10000 для создания папапа при создании документа",
    author: "Красненков Илья",
    status: "В разработке",
    date_created: new Date("2024-01-01"),
    date_changed: new Date("2024-03-01"),
    type: "Основной документ",
    priority: "Наивысший",
    path: "S://impuls/client/src/components/testPage/testPage.tsx",
    link: ["https://learn.javascript.ru/","https://google.com"],
    tags: [{ key: "Тэг1", value: "Значение тэга" }, { key: "Тэг2", value: 2 }],
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
