import './style_replacePas.css';
import bClose from './img/bClose.svg'
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert, Snackbar } from '@mui/material';

function ReplacePassword() {

  const [oldPass, setOldPass] = useState('')
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
  const [openSnackbarError, setOpenSnackbarError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [isAuth, setIsAuth] = useState(false)
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
        userlogin: localStorage.getItem('userlogin'),
        oldPass: oldPass,
        newPass: newPass1
      },
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
    }).then((response: AxiosResponse) => {
      console.log(response)

      if(response.data === 'Old password is incorrect!') {
        setErrorText('Старый пароль неверный!')
        handleClickError()
      } else {
        handleClickSuccess()
      }
    }).catch((reason: AxiosError) => {
      console.log(reason)
    })
  }
  if(localStorage.getItem('token') == null) {
    window.open('/', "_self")
    return (<div></div>)
  }


  return(
    <div id="root-replacePas">
    <div id="mainForm">
      <header id="header-replacePas">
        <h2>Изменение пароля</h2>
        <a href="/userProfile">
          <img src={bClose} alt="Закрыть"/>
        </a>
      </header>
      <div className="textFields">
        <div className="repPas" id="el1">
          <label>Старый пароль</label>
          <input type="password" onChange={(e) => {setOldPass(e.target.value)}}/>
        </div>
        <div className="repPas" id="el2">
          <label>Новый пароль</label>
          <input type="password" onChange={(e) => {newPass1 = e.target.value}}/>
        </div>
        <div className="repPas" id="el3">
          <label>Повторите пароль</label>
          <input type="password" onChange={(e) => {newPass2 = e.target.value}}/>
        </div>
      </div>
      <button id="bSave" type="button" onClick={updatePassword}>Сохранить</button>
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

export default ReplacePassword;