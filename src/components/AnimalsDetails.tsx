import * as React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

interface AnimalDetails {
  id: string;
  nome: string;
  nomeCientifico: string;
  nomeEspecie: string;
  cor: string;
  dataNascimento: string;
  tamanhoPorte: string;
  peso: number;
  temperamento: string;
  foto: string;
}

interface Animal {
  id: string;
  nome: string;
}

export default function AnimalDetails() {
  const [name, setName] = React.useState<string>('');
  const [animal, setAnimal] = React.useState<AnimalDetails | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [animalList, setAnimalList] = React.useState<Animal[]>([]);

 
  React.useEffect(() => {
    const fetchAnimalList = async () => {
      try {
        const response = await axios.get('https://pethub-hml.cgtecnologia.com.br/api/v1/animal', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAnimalList(response.data);
      } catch (error) {
        console.error('Erro ao buscar lista de animais:', error);
      }
    };

    fetchAnimalList();
  }, []);

  const fetchAnimalDetails = async (animalId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pethub-hml.cgtecnologia.com.br/api/v1/animal/${animalId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAnimal(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do animal:', error);
      setError('Não foi possível carregar os detalhes do animal.');
      setAnimal(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const animalFound = animalList.find(a => a.nome.toLowerCase() === name.toLowerCase());
    if (animalFound) {
      fetchAnimalDetails(animalFound.id);
    } else {
      setError('Animal não encontrado.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Nome do Animal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {animal && (
        <Card sx={{ maxWidth: 600, mt: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={animal.foto || 'https://via.placeholder.com/200'}
            alt={animal.nome}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {animal.nome}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Nome Científico: {animal.nomeCientifico}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Espécie: {animal.nomeEspecie}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Cor: {animal.cor}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Data de Nascimento: {animal.dataNascimento}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Tamanho do Porte: {animal.tamanhoPorte}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Peso: {animal.peso} kg
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Temperamento: {animal.temperamento}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
