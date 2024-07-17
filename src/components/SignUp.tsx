import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
//  const UrlFix = 'https://pethub-hml.cgtecnologia.com.br'


  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sending request to:', `/api/v1/usuario`); // Adicione este log
    const payload = {
      nome,
      cpf,
      dataNascimento,
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/v1/usuario`, payload, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.data;
      console.log('Response:', data);
  
      if (!response) {
        alert('Usuário criado com sucesso!');
        navigate('/login');
      } else {
        alert(`Falha ao criar usuário: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário!');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="name"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dataNascimento"
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              autoComplete="bday"
              InputLabelProps={{
                shrink: true,
              }}
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
