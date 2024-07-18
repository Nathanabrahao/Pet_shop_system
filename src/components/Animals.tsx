import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default function AutoHeightGrid() {
  const [animals, setAnimals] = React.useState<Animal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetching data from the API
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('https://pethub-hml.cgtecnologia.com.br/api/v1/animal', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAnimals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleAddAnimal = () => {
    navigate('/registerAnimal');
  };

  const handleAnimalDetails = () => {
    navigate('/animalsDetails');
  };

  const handleEdit = (id: string) => {
    navigate(`/editAnimal/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://pethub-hml.cgtecnologia.com.br/api/v1/animal/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== id));
    } catch (error) {
      console.error('Erro ao excluir animal:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'nomeCientifico', headerName: 'Nome Científico', flex: 1 },
    { field: 'nomeEspecie', headerName: 'Espécie', flex: 1 },
    { field: 'cor', headerName: 'Cor', flex: 1 },
    { field: 'dataNascimento', headerName: 'Data de Nascimento', flex: 1 },
    { field: 'tamanhoPorte', headerName: 'Tamanho do Porte', flex: 1 },
    { field: 'peso', headerName: 'Peso (kg)', flex: 1 },
    { field: 'temperamento', headerName: 'Temperamento', flex: 1 },
    { field: 'foto', headerName: 'Foto', flex: 1, renderCell: (params) => (
      <img src={params.value} alt={params.row.nome} style={{ width: '100px', height: 'auto' }} />
    )},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEdit(params.row.id)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            onClick={() => handleDelete(params.row.id)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={handleAddAnimal}
        >
          Adicionar Animal
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="secondary" 
          onClick={handleAnimalDetails}
        >
          Detalhes de um Animal
        </Button>
      </Stack>
      <Box sx={{ height: 400, width: '100%', maxWidth: 1200 }}>
        <DataGrid autoHeight columns={columns} rows={animals} loading={loading} />
      </Box>
    </Box>
  );
}
