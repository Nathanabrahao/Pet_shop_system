// No topo do seu arquivo
import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Agora você pode acessar as variáveis de ambiente normalmente
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const fetchToken = async () => {
  try {
    const response = await axios.post(AUTH_URL!, new URLSearchParams({
      grant_type: 'password',
      client_id: CLIENT_ID!,
      username: USERNAME!,
      password: PASSWORD!,
      client_secret: CLIENT_SECRET!,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : '*/*'
      },
    });

    const token = response.data.access_token;
    console.log('Token obtido:', token);
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    throw error;
  }
};
