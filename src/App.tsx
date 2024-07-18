import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Animals from './components/Animals';
import RegisterAnimal from './components/RegisterAnimal';
import EditAnimals from './components/EditAnimals'
import setupAxiosInterceptors from './axiosConfig';
import axios from 'axios';
import AnimalsDetails from './components/AnimalsDetails';
import { Box } from '@mui/material';



setupAxiosInterceptors();

const App: React.FC = () => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/registerAnimal" element={<RegisterAnimal />} />
        <Route path="/editAnimal" element={<EditAnimals />} />
        <Route path="/animalsDetails" element={<AnimalsDetails />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </Box>
  );
};

export default App;
