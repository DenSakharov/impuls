import './style_recoveryPass.css';
import bClose from './img/bClose.svg'
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert, Snackbar } from '@mui/material';

function RecoveryPassword() {

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
  const [openSnackbarError, setOpenSnackbarError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [userLogin, setUserLogin] = useState('')


  var newPass1: string
  var newPass2: string

  const handleClickSuccess = () => {
    setOpenSnackbarSuccess(true);
  };
  const handleClickError = () => {
    setOpenSnackbarError(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarSuccess(false)
    setOpenSnackbarError(false)
  };

  const updatePassword = () => {
    if(!(newPass1 === newPass2)) {
      setErrorText('Пароли не совпадают!')
      return handleClickError()
    }
    axios({
      method: 'post',
      url: 'http://localhost:3010/users/replacepassword', 
      data: {
        userlogin: userLogin,
        userName: userName,
        userSurname: userSurname,
        newPass: newPass1
      }
    }).then((response: AxiosResponse) => {
      console.log(response)

      if(response.data === 'User data is incorrect!') {
        setErrorText('Введённые данные пользователя неверные!')
        handleClickError()
      } else {
        handleClickSuccess()
      }
    }).catch((reason: AxiosError) => {
      console.log(reason)
    })
  }

  return(
    <div id="root-recoveryPas">
    <div id="recoveryPas-mainForm">
      <header id="header-recoveryPas">
        <h2>Восстановление пароля</h2>
        <a href="/">
          <img src={bClose} alt="Закрыть"/>
        </a>
      </header>
      <div className="textFields">
      <div className="recoveryPas" id="el1">
          <label>Login</label>
          <input type="text" onChange={(e) => {setUserLogin(e.target.value)}}/>
        </div>
        <div className="recoveryPas" id="el2">
          <label>Фамилия</label>
          <input type="text" onChange={(e) => {setUserSurname(e.target.value)}}/>
        </div>
        <div className="recoveryPas" id="el3">
          <label>Имя</label>
          <input type="text" onChange={(e) => {setUserName(e.target.value)}}/>
        </div>
        <div className="recoveryPas" id="el4">
          <label>Новый пароль</label>
          <input type="password" onChange={(e) => {newPass1 = e.target.value}}/>
        </div>
        <div className="recoveryPas" id="el5">
          <label>Повторите пароль</label>
          <input type="password" onChange={(e) => {newPass2 = e.target.value}}/>
        </div>
      </div>
      <p>Введите <b>Фамилию</b> и <b>Имя</b> своего профиля. <br/>Это нужно, чтобы доказать, что Вы являетесь владельцем аккаунта.</p>
      <button id="bSave" type="button" onClick={updatePassword}>Отправить</button>
    </div>
    <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={2000}
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Пароль успешно изменён! 
          </Alert>
    </Snackbar>
    <Snackbar
        open={openSnackbarError}
        autoHideDuration={2000}
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorText}
          </Alert>
    </Snackbar>
  </div>
  )
}

export default RecoveryPassword;