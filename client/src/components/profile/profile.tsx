import './style_profile.css';
import bBack from './img/bBack.svg'
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Value } from 'sass';

function Profile() {

  var [userID, setUserID] = useState('');
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
    let url_getUser = 'http://localhost:3010/users/' + localStorage.getItem('userlogin') 
    axios({
      method: 'get',
      url: url_getUser,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
    }).then((response: AxiosResponse) => {

      var User = response.data
      setUserID(User.userid)
      setUserLogin(User.userlogin)
      setUserSurname(User.surname)
      setUserFirstname(User.firstname)
      setUserEmail(User.userEmail)
      setUserDepartment(User.department)
    }).catch((reason: AxiosError) => {
      console.log(reason)
    })
  }

  useEffect(() => {
    let userReceived = false;
    if (!userReceived) {
      getUser()
    } 
    return () => { userReceived = true; }
  },[]);

  function updateUser() {
    setUserLogin((document.getElementById('el1_input') as HTMLInputElement).value)
    setUserEmail((document.getElementById('el2_input') as HTMLInputElement).value)
    setUserSurname((document.getElementById('el3_input') as HTMLInputElement).value)
    setUserFirstname((document.getElementById('el5_input') as HTMLInputElement).value)

    let urlForUpdate = 'http://localhost:3010/users/' + localStorage.getItem('userlogin') + '/update'
    axios({
      method: 'post',
      url: urlForUpdate, 
      data: {
        userid: userID,
        userlogin: userLogin,
        userEmail: userEmail,
        firstname: userFirstname,
        surname: userSurname
      },
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
    }).then((response: AxiosResponse) => {
      console.log(response)
      handleClick()
    }).catch((reason: AxiosError) => {
      console.log(reason)
    })
  }

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
              <input defaultValue={userLogin} type="text" id="el1_input"/>
            </div>
            <div className="infoUserValues" id="el2">
              <label>Email</label>
              <input defaultValue={userEmail} type="text" id="el2_input"/>
            </div>
            <div className="infoUserValues" id="el3">
              <label>Фамилия</label>
              <input defaultValue={userSurname} type="text" id="el3_input"/>
            </div>
            <div className="infoUserValues" id="el4">
              <label>Телефон</label>
              <input type="text"/>
            </div>
            <div className="infoUserValues" id="el5">
              <label>Имя</label>
              <input defaultValue={userFirstname} type="text" id="el5_input"/>
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
              <button onClick={() => {updateUser()}}id="bSave" type="button">Сохранить</button>
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