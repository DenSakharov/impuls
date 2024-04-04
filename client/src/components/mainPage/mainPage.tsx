import React from 'react';
import './mainPage.css';


function mainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='./img/logo.png' className="App-logo1" alt="logo" />
        <p>
          Добро пожаловать в приложение "Импульс"
        </p>
    <h1>Проект IMS</h1>
    <a
          className="App-link"
          href="http://localhost:3000"
          target=""
          rel="noopener noreferrer"
        >
          Сменить пользователя
        </a>
        <a
          className="App-link"
          href="http://localhost:3000/about"
          target=""
          rel="noopener noreferrer"
        >
          О программе
        </a>
      </header>
    </div>
  );
}

export default mainPage;
