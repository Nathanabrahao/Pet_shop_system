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

const RegisterAnimal: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>('');
  const [nomeCientifico, setNomeCientifico] = useState<string>('');
  const [nomeEspecie, setNomeEspecie] = useState<string>('');
  const [cor, setCor] = useState<string>('');
  const [codigoChip, setCodigoChip] = useState<string>('');
  const [codigoTatuagem, setCodigoTatuagem] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [tamanhoPorte, setTamanhoPorte] = useState<string>('');
  const [peso, setPeso] = useState<number>(0);
  const [temperamento, setTemperamento] = useState<string>('');
  const [raca, setRaca] = useState<string>('');
  const [foto, setFoto] = useState<string>('');

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      nome,
      nomeCientifico,
      nomeEspecie,
      cor,
      codigoChip,
      codigoTatuagem,
      dataNascimento,
      tamanhoPorte,
      peso,
      temperamento,
      raca,
      foto
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://pethub-hml.cgtecnologia.com.br/api/v1/animal', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('Animal cadastrado com sucesso!');
      navigate('/animals');
    } catch (error) {
      console.error('Erro ao cadastrar animal:', error);
      alert('Erro ao cadastrar animal!');
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
            Cadastro de Animal
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nomeCientifico"
              label="Nome Científico"
              name="nomeCientifico"
              autoComplete="nomeCientifico"
              value={nomeCientifico}
              onChange={(e) => setNomeCientifico(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nomeEspecie"
              label="Nome da Espécie"
              name="nomeEspecie"
              autoComplete="nomeEspecie"
              value={nomeEspecie}
              onChange={(e) => setNomeEspecie(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cor"
              label="Cor"
              name="cor"
              autoComplete="cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="codigoChip"
              label="Código do Chip"
              name="codigoChip"
              autoComplete="codigoChip"
              value={codigoChip}
              onChange={(e) => setCodigoChip(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="codigoTatuagem"
              label="Código da Tatuagem"
              name="codigoTatuagem"
              autoComplete="codigoTatuagem"
              value={codigoTatuagem}
              onChange={(e) => setCodigoTatuagem(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dataNascimento"
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              autoComplete="dataNascimento"
              InputLabelProps={{
                shrink: true,
              }}
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="tamanhoPorte"
              label="Tamanho do Porte"
              name="tamanhoPorte"
              autoComplete="tamanhoPorte"
              value={tamanhoPorte}
              onChange={(e) => setTamanhoPorte(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="peso"
              label="Peso"
              name="peso"
              type="number"
              autoComplete="peso"
              value={peso}
              onChange={(e) => setPeso(Number(e.target.value))}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="temperamento"
              label="Temperamento"
              name="temperamento"
              autoComplete="temperamento"
              value={temperamento}
              onChange={(e) => setTemperamento(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="raca"
              label="Raça"
              name="raca"
              autoComplete="raca"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="foto"
              label="Foto"
              name="foto"
              autoComplete="foto"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar Animal
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterAnimal;
