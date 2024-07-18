import axios, { AxiosInstance } from 'axios';

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: '',  // Defina a baseURL, se aplicável
    timeout: 10000,  // Tempo limite da solicitação em milissegundos
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
  });
};