import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Stack } from '@mui/material';

interface Animal {
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

const EditAnimal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`https://pethub-hml.cgtecnologia.com.br/api/v1/animal?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAnimal(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar animal:', error);
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value } as Animal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`https://pethub-hml.cgtecnologia.com.br/api/v1/animal?id=${id}`, animal, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/'); // Navega de volta para a lista de animais após a edição
    } catch (error) {
      console.error('Erro ao editar animal:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          name="nome"
          value={animal?.nome || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Nome Científico"
          name="nomeCientifico"
          value={animal?.nomeCientifico || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Nome da Espécie"
          name="nomeEspecie"
          value={animal?.nomeEspecie || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Cor"
          name="cor"
          value={animal?.cor || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Data de Nascimento"
          name="dataNascimento"
          type="date"
          value={animal?.dataNascimento || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Tamanho do Porte"
          name="tamanhoPorte"
          value={animal?.tamanhoPorte || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Peso"
          name="peso"
          type="number"
          value={animal?.peso || 0}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Temperamento"
          name="temperamento"
          value={animal?.temperamento || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Foto"
          name="foto"
          value={animal?.foto || ''}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};

export default EditAnimal;
