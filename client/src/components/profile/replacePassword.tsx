import './style_replacePas.css';
import bClose from './img/bClose.svg'

function ReplacePassword() {
  return(
    <div id="root-replacePas">
    <div id="mainForm">
      <header id="header-replacePas">
        <h2>Изменение пароля</h2>
        <a href="/profile">
          <img src={bClose}/>
        </a>
      </header>
      <div className="textFields">
        <div className="repPas" id="el1">
          <label>Старый пароль</label>
          <input type="password"/>
        </div>
        <div className="repPas" id="el2">
          <label>Новый пароль</label>
          <input type="password"/>
        </div>
        <div className="repPas" id="el3">
          <label>Повторите пароль</label>
          <input type="password"/>
        </div>
      </div>
      <button id="bSave" type="button">Сохранить</button>
    </div>
  </div>
  )
}

export default ReplacePassword;