import './style_profile.css';
import bBack from './img/bBack.svg'
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Value } from 'sass';
import Photo from './img/defaultPhoto.png'

function Profile() {

  var [userID, setUserID] = useState('');
  var [userLogin, setUserLogin] = useState('');
  var [userSurname, setUserSurname] = useState('');
  var [userFirstname, setUserFirstname] = useState('');
  var [userEmail, setUserEmail] = useState('');
  var [userDepartment, setUserDepartment] = useState('');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState<Blob>()
  const [imgData, setImgData] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  const handleChangeImage = async (e) => {
    console.log(e.target.files[0])

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await axios.post(
      `http://${window.location.hostname.toString()}:3010/users/loadphoto`,
      formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
      }
    );
    setImgData('data:image/png;base64,' + res.data)

  }

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
    let url_getUser = `http://${window.location.hostname.toString()}:3010/users/` + localStorage.getItem('userlogin')
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


  function updateUser() {
    let urlForUpdate = `http://${window.location.hostname.toString()}:3010/users/` + localStorage.getItem('userlogin') + '/update'
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
      localStorage.setItem('userlogin', userLogin)
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
          <p>{userFirstname} {userSurname}</p>
          <p>пользователь/админ</p>
        </div>
      </header>
      <div id="infoProfile">
        {/* img строчный элемент, возможно стоит обернуть в div чтобы кнопки под картинку уехали @RusDa256*/}
        <div id="editPhoto">
          <img src={imgData} alt="Аватар пользователя" id="userImage"/>
          <div id="infoProfile-editPhoto-buttons">
            <label className="input-file">
              <input type="file" name="file" onChange={handleChangeImage}/>		
              <span>Загрузить фото</span>
            </label>
            <button id="bDelImg" type="button">Удалить</button>
          </div>
        </div>

        <div id='infoUserAndSave'>
          <div id="infoUser">
            <div className="infoUserValues" id="el1">
              <label>Логин</label>
              <input defaultValue={userLogin} type="text" onChange={(e) => {setUserLogin(e.target.value)}}/>
            </div>
            <div className="infoUserValues" id="el2">
              <label>Email</label>
              <input defaultValue={userEmail} type="text" onChange={(e) => {setUserEmail(e.target.value)}}/>
            </div>
            <div className="infoUserValues" id="el3">
              <label>Фамилия</label>
              <input defaultValue={userSurname} type="text" onChange={(e) => {setUserSurname(e.target.value)}}/>
            </div>
            <div className="infoUserValues" id="el4">
              <label>Телефон</label>
              <input type="text"/>
            </div>
            <div className="infoUserValues" id="el5">
              <label>Имя</label>
              <input defaultValue={userFirstname} type="text" onChange={(e) => {setUserFirstname(e.target.value)}}/>
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
        autoHideDuration={4000}
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Изменения успешно сохранены!
          </Alert>
        </Snackbar>
    </div>
  )
}

export default Profile;