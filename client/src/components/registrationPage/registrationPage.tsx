import { Alert, AlertTitle, Collapse, Container, IconButton, Button, TextField, Box, Typography} from "@mui/material";
import logo from "./logo_reg.png"
import {Close} from '@mui/icons-material';
import "./style.css";
import {useState} from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";

export default function Registration() {

  const backend = axios.create({ baseURL: `http://${window.location.hostname.toString()}:3010` });
  
  const [loginInput, setLoginInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleClose = () => {
    setError(false);
    setRegSuccess(false);
  };

  const checkPassword = () => {
    if(passwordInput === "") {
      setErrorMessage('Заполните пароль!')
    }else if(passwordInput !== passwordRepeatInput) {
      setErrorMessage('Пароли должны совпадать! Проверьте ещё раз.')
      setError(true);
      setTimeout(handleClose, 2000);
    } else {
      console.log('password=OK')
      return true      
    }
    return false
  }
  const checkEmail = () => {
    if(emailInput === "") {
      setErrorMessage('Заполните адрес электронной почты!')
      setError(true);
      setTimeout(handleClose, 2000);
      return false
    }
    return true
  }
  const redirect = () => {
    window.open("/main", "_self");
  }

  const registrationUser = () => {
    if(checkPassword() && checkEmail()) {
      backend.post('/users', {
        userlogin: loginInput,
        userEmail: emailInput,
        password: passwordInput,
        firstname: 'defaultName',
        surname: 'defaultSurname'        
      }).then((response: AxiosResponse) => {
        const data = response.data
        if(data?.status === 201){
          setRegSuccess(true);
          setTimeout(handleClose, 2000);
          setTimeout(redirect, 2000);
        }else{
          throw new AxiosError('Что-то пошло не так!')          
        }
      }).catch((error: AxiosError) => {       
        let message = ""
        if(error.response?.status === 409) {
          message = 'Данный login уже занят!'   
        }else{
          message = error.message
        }
        setErrorMessage(message)
        setError(true);
        setTimeout(handleClose, 2000);
      });
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          backgroundColor: 'white'
        }}>
        <Box height={50}
        sx={{
          backgroundColor: '#157298',
          mb: 2,
          display:'flex',
          justifyContent: 'flex-end'
        }}>
          <IconButton
            sx={{
              color: 'white',
              mr: '50'
            }}
            onClick={() => window.open('/', '_self')}>
              <Close fontSize='large'/>
            </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'white',
          }}>
          <img src={`${logo}`} width={300} alt="logo"/>
          <Box
              sx={{
                my: 4,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography component="h1" variant="h5">
                Для регистрации заполните все поля
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="login"
                  autoFocus
                  onChange={(newLogin) => setLoginInput(newLogin.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(newEmail) => setEmailInput(newEmail.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  onChange={(newPassword) => setPasswordInput(newPassword.target.value)}
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Повторите пароль"
                  type="password"
                  id="password_repeat"
                  onChange={(newPasswordRepeat) => setPasswordRepeatInput(newPasswordRepeat.target.value)}
                />
                </Box>

                <Collapse in={error}>
                  <Alert severity="error"> 
                      <AlertTitle>Error</AlertTitle> 
                      {errorMessage}
                  </Alert>
                </Collapse>

                <Collapse in={regSuccess}>
                  <Alert severity="success"> 
                      <AlertTitle>Success</AlertTitle> 
                      Регистрация успешно завершена! Через 2 секунды Вы перейдёте на главную страницу
                  </Alert>
                </Collapse>
                
                <Button
                  type="submit"
                  variant="contained"
                  className="req-page-button"
                  onClick={registrationUser}    
                  sx={{ 
                    mt: 3, 
                    mb: 2
                  }}
                  //href="/main"
                  style={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: 15,
                    fontSize: "18px",
                    color: '#157298',
                  }}
                >
                  Отправить
                </Button>

              <Box 
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                color='#147298'>
                <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 0}}>
                Требования к паролю
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0}}>
                  Требования к длине пароля и символам, которые участвуют в его формировании, определяются политиками безопасности компании. В некоторых случаях нужно учитывать требования регуляторов. Вот необходимый минимум:
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 2, mb: 0, ml: 3}}>
                - Пароль должен содержать не менее 8 символов.
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0, ml: 3}}>
                - Ограничение на максимальную длину пароля должно быть не менее 64 символов.
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0, ml: 3}}>
                - Как минимум одна заглавная и одна строчная буква.
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0, ml: 3}}>
                - Должна быть как минимум 1 цифра.
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0, ml: 3}}>
                - Допускается наличие следующих символов: ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } {">"} {"<"} / \ | " ' . , :
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ mt: 0, mb: 0, ml: 3}}>
                - Пароль не должен включать в себя легко вычисляемые сочетания символов (имена, фамилии и т. д.), а также общепринятые сокращения (USER, ADMIN, ALEX и т. д.), пароли от скомпрометированных ресурсов, словарные слова, состоящие из повторяющихся или последовательных символов, контекстно-зависимые слова (имя службы, имя пользователя и производные от него).
                </Typography>
              </Box>
              <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 1}}>
                © Impulse Team 2024
              </Typography>
          </Box>
        </Box>
        
      </Box>
    </Container>
  );
}