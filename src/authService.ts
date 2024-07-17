import axios from 'axios';

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const fetchToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', CLIENT_ID || '');
    params.append('username', USERNAME || '');
    params.append('password', PASSWORD || '');
    params.append('client_secret', CLIENT_SECRET || '');

    const response = await axios.post(AUTH_URL!, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
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
