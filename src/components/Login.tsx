import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate(); 
  const urlFix = 'https://pethub-hml.cgtecnologia.com.br';

  const userValidate = async (nome: string, cpf: string) => {
    try {
      const response = await axios.get(`${urlFix}/api/v1/usuario`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const user = response.data;
      if (user.nome === nome && user.cpf === cpf) {
        localStorage.setItem('nomeUser', user.nome);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get('nome') as string;
    const cpf = data.get('cpf') as string;

    try {
      const user = await userValidate(nome, cpf);
      if (user) {
        navigate('/animals');
      } else {
        alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      alert('Erro ao autenticar. Por favor, tente novamente.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpf"
              label="CPF"
              id="cpf"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/animals" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
