import './style_profile.css';
import bBack from './img/bBack.svg'
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { read_cookie } from 'sfcookies';

function Profile() {

  var [userLogin, setUserLogin] = useState('');
  var [userSurname, setUserSurname] = useState('');
  var [userFirstname, setUserFirstname] = useState('');
  var [userEmail, setUserEmail] = useState('');
  var [userDepartment, setUserDepartment] = useState('');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  function getUser() {
    axios({
      method: 'get',
      url: url_getUser,
      headers: { Authorization: 'Bearer ' + token}
    }).then((response: AxiosResponse) => {

      var User = response.data
      setUserLogin(User.userlogin)
      setUserSurname(User.surname)
      setUserFirstname(User.firstname)
      setUserEmail(User.userEmail)
      setUserDepartment(User.department)
    }).catch((reason: AxiosError) => {
      console.log(reason)
    })
  }

  const cookie_key = 'namedOFCookie'
  const cookie_token = 'token'

  var userLoginFromCookie: string
  var url_getUser: string
  var token: string

  useEffect(() => {
    let userReceived = false;
    
    if (!userReceived) {
      userLoginFromCookie = read_cookie(cookie_key)
      token = read_cookie(cookie_token)
      url_getUser = 'http://localhost:3010/users/' + userLoginFromCookie
      getUser()
    } 
    return () => { userReceived = true; }
    },[]);

  return(
    <div id="page-profile">
      <header id="header-profile">
        <div id="header-left_site">
          <a id="profile-bBack" href="/main">
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
        {/* img строчный элемент, возможно стоит обернуть в div чтобы кнопки под картинку уехали @RusDa256*/}
        <div id="editPhoto">
          <img src="/img/UserImage.png" alt="Аватар пользователя" id="userImage"/>
          <div id="infoProfile-editPhoto-buttons">
            <label className="input-file">
              <input type="file" name="file"/>		
              <span>Загрузить фото</span>
            </label>
            <button id="bDelImg" type="button">Удалить</button>
          </div>
        </div>

        <div id='infoUserAndSave'>
          <div id="infoUser">
            <div className="infoUserValues" id="el1">
              <label>Логин</label>
              <input defaultValue={userLogin} type="text"/>
            </div>
            <div className="infoUserValues" id="el2">
              <label>Email</label>
              <input defaultValue={userEmail} type="text"/>
            </div>
            <div className="infoUserValues" id="el3">
              <label>Фамилия</label>
              <input defaultValue={userSurname} type="text"/>
            </div>
            <div className="infoUserValues" id="el4">
              <label>Телефон</label>
              <input type="text"/>
            </div>
            <div className="infoUserValues" id="el5">
              <label>Имя</label>
              <input defaultValue={userFirstname} type="text"/>
            </div>
            <div className="infoUserValues" id="el6">
              <label>Должность</label>
              <input defaultValue={userDepartment} type="text"/>
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
          </div>
          
          <div id="replacePas_Save">
              {/* что думаешь насчет диалогового окна @RusDa256? */}
              <a href="/replace_password" id="bReplacePas">Изменить пароль</a>
              <button onClick={() => {handleClick()}}id="bSave" type="button">Сохранить</button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Изменения успешно сохранены!
          </Alert>
        </Snackbar>\
    </div>
  )
}

export default Profile;