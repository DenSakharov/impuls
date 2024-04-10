import React from 'react';
import './App.css';

function TestPage() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Пройдите авторизацию
        </p>
        <p>
          Введите <code>логин</code> и <code>пароль</code>
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/main"
          target=""
          rel="noopener noreferrer"
        >
          Войти
        </a>
      </header>
    </div>
  );
}

export default TestPage;
