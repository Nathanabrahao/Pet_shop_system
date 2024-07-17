import axios from 'axios';
import { fetchToken } from './authService';

fetchToken();

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem('token');
      
      if (!token) {
        token = await fetchToken();

        if (token) {
          localStorage.setItem('token', token);
          console.log(token)
        }
      }

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;