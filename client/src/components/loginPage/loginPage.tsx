import logo from "./logo.png"
import React, { useState } from 'react'
import {Close} from '@mui/icons-material';
import {IconButton , Container, Button, TextField, FormControlLabel, 
        Checkbox, Link, Box, Grid, Typography,
        Snackbar,
        Alert} from '@mui/material';
import "./style.css";
import axios, { AxiosError, AxiosResponse } from "axios";


export default function SignInSide() {
  const [userlogin, setUser] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [openSnackbarError, setOpenSnackbarError] = useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbarError(false)
  };


  function checkUser() {
    axios({
      method: 'post',
      url: `http://${window.location.hostname.toString()}:3010/auth/login`,
      data: {
        username: userlogin,
        password: password
      }
    }).then((response: AxiosResponse) => {
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('userlogin', response.data.userlogin)
      window.open('/main', "_self")
    }).catch((reason: AxiosError) => {
      console.log(reason)
      if(reason.message === "Request failed with status code 401") {
        setOpenSnackbarError(true);
      }
    })
  }

  return (
  
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          backgroundColor: 'white',
        }}>
        <Box height={50} sx={{
          backgroundColor: '#157298',
          mb: 3,
          display:'flex',
          justifyContent: 'flex-end'
        }}>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'white',
          }}>
          <img src={`${logo}`} width={200} alt="logo"/>
          <Box
              sx={{
                my: 4,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography component="h1" variant="h5">
                Авторизация
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  value={userlogin}
                  onKeyDown={(e) => e.key === "Enter" && checkUser()}
                  onChange={(e) => setUser(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="username"
                  autoComplete="username"
                  autoFocus                  
                />
                <TextField
                  value={password}
                  onKeyDown={(e) => e.key === "Enter" && checkUser()}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Запомнить меня"
                />
                <Button
                  
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2
                    }}
                  //href="/main"
                  className="login-page-button"
                  style={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: 15,
                    fontSize: "18px",
                    color: '#157298',
                  }}
                  onClick={checkUser}
                >
                  Войти
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/registration" underline="none" variant="body2">
                    Зарегистрироваться
                    </Link>
                  </Grid>
                  <Grid item>
                    {/*TODO переход на страницу восстановления пароля @RusDa256 */}
                    <Link href="/recovery_password" underline="none" variant="body2">
                      Забыли пароль?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 1}}>
                © Impulse Team 2024
              </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={4000}
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Неправильные Логин или Пароль!
          </Alert>
    </Snackbar>
    </Container>
  
  );
}