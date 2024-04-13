import './style_profile.css';
import bBack from './img/bBack.svg'

function Profile() {
  return(
    <div id="page-profile">
      <header id="header-profile">
        <div id="header-left_site">
          <a id="bBack" href="http://localhost:3000/main">
            <img src={bBack} alt="Вернуться"/>
          </a>
          <h1>Мой профиль</h1>
        </div>
        <div id="header-mainInfo">
          <p>Имя Фамилия</p>
          <p>пользователь/админ</p>
        </div>
      </header>
      <div id="infoProfile">
        <div id="editPhoto">
          <img src="/img/UserImage.png" alt="Аватар пользователя" id="userImage"/>
          <div id="infoProfile-editPhoto-buttons">
            <button id="bLoadImg" type="button">Загрузить фото</button>
            <button id="bDelImg" type="button">Удалить</button>
          </div>
        </div>

        <div id="infoUser">
          <div className="infoUserValues" id="el1">
            <label>Логин</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el2">
            <label>Email</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el3">
            <label>Фамилия</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el4">
            <label>Телефон</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el5">
            <label>Имя</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el6">
            <label>Должность</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el7">
            <label>Отчество</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el8">
            <label>Город</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el9">
            <label>Роль</label>
            <input type="text"/>
          </div>
          <div className="infoUserValues" id="el10">
            <label>Пол</label>
            <input type="text"/>
          </div>
          <div id="replacePas_Save">
            <a href="/replace_password" id="bReplacePas">Изменить пароль</a>
            <button id="bSave" type="button">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;