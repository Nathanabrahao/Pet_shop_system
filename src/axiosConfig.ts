// axiosConfig.ts
import axios from 'axios';
import { fetchToken } from './authService';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem('token');
      
      if (!token) {
        token = await fetchToken();
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
