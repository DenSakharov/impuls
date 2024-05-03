import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import logo from "./logo_reg.png"
import {Close} from '@mui/icons-material';
import { IconButton} from '@mui/material';
//TODO см loginpage
import "./style.css";


export default function Registration() {
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
                onSubmit={handleSubmit}
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
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Повторите пароль"
                  type="password"
                  id="password_repeat"
                />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  className="req-page-button"
                  sx={{ 
                    mt: 3, 
                    mb: 2
                  }}
                  href="/main"
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
                © Impuls Teem 2024
              </Typography>
          </Box>
        </Box>
        
      </Box>
    </Container>
  );
}