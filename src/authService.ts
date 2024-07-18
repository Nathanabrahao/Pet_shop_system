import axios from 'axios';

const AUTH_URL = 'https://acesso.cgtecnologia.com.br/realms/pethub/protocol/openid-connect/token';  
const CLIENT_ID = 'pethub-api';
const USERNAME = 'nathan.abrahao';
const PASSWORD = '1gQvy3tjIqs=';
const CLIENT_SECRET = 'ORghXmmumTN11vqZP1a6tQcbp0V86Cfe';

export const fetchToken = async () => {
  try {
    const response = await axios.post(AUTH_URL, new URLSearchParams({
      grant_type: 'password',
      client_id: CLIENT_ID,
      username: USERNAME,
      password: PASSWORD,
      client_secret: CLIENT_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : '*/*'
      },
    });

    const token = response.data.access_token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    throw error;
  }
};