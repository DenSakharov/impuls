import React from 'react';
import './about.css';

function mainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='./img/logo.png' className="App-logo1" alt="logo" />
        <h1> О программе!</h1>
        <h2>Проект IMS "Импульс" (Information Managment System)</h2>
<p> Система управления информацией “Импульс” — это платформа для совместной работы,
  обеспечивает взаимодействие между архитектором и стейкхолдерами,
  которые вносят свой вклад в модель данных проекта и заинтересованы в доступе к информации
  о важнейших бизнес-процессах, архитектуре программного обеспечения и ИТ-архитектуре предприятия.
  Потребители используют информацию, полученную из модели данных, для долгосрочного планирования,
  принятия решений, управления, авторизации и многого другого.
</p>
    <a
          className="App-link"
          href="http://localhost:3000/main"
          target=""
          rel="noopener noreferrer"
        >
          Закрыть
        </a>
      </header>
    </div>
  );
}

export default mainPage;
