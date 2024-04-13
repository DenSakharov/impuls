import './style_replacePas.css';
import bClose from './img/bClose.svg'

function ReplacePassword() {
  return(
    <div id="page-replacePassword">
      <div id="mainForm">
        <header id="header-replacePassword">
          <h2>Изменение пароля</h2>
          <a href="/profile">
            <img src={bClose} alt="Вернуться"/>
          </a>
        </header>
        <div className="repPas-textFields">
          <div className="repPas" id="repPas-el1">
            <label>Старый пароль</label>
            <input type="password"/>
          </div>
          <div className="repPas" id="repPas-el2">
            <label>Новый пароль</label>
            <input type="password"/>
          </div>
          <div className="repPas" id="repPas-el3">
            <label>Повторите пароль</label>
            <input type="password"/>
          </div>
        </div>
        <button id="bSave-replacePassword" type="button">Сохранить</button>
      </div>
    </div>
  )
}

export default ReplacePassword;