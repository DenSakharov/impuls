import logo from "./logo.png"
import {Close} from '@mui/icons-material';
import {IconButton , Container, Button, TextField, FormControlLabel, 
  Checkbox, Link, Box, Grid, Typography} from '@mui/material';
import "./style.css";


export default function SignInSide() {
  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          <IconButton
            sx={{
              color: 'white',
              mr: '50'
            }}
            onClick={() => window.open('/main', '_self')}>
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
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2
                    }}
                  href="/main"
                  className="login-page-button"
                  style={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: 15,
                    fontSize: "18px",
                    color: '#157298',
                  }}
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
                    <Link href="#" underline="none" variant="body2">
                      Забыли пароль?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 1}}>
                © Impuls Teem 2024
              </Typography>
          </Box>
        </Box>
        
      </Box>
    </Container>
  );
}