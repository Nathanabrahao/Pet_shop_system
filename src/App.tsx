import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import setupAxiosInterceptors from './axiosConfig';
import axios from 'axios';

const testAPIConnection = async () => {
  try {
    const response = await axios.get('/api/v1/usuario');
    console.log('API Test Response:', response.data);
  } catch (error) {
    console.error('Erro ao testar conexão com a API:', error);
  }
};

setupAxiosInterceptors();

const App: React.FC = () => {
  React.useEffect (() => {
    testAPIConnection();
    console.log(testAPIConnection)
  })
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pets" />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
