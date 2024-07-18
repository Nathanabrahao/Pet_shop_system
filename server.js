const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

// Configurar CORS para permitir todas as origens
app.use(cors());

// Rota para proxy de criação de usuário
app.post('/api/proxy/usuario', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = await axios.post('https://pethub-hml.cgtecnologia.com.br/api/v1/usuario', req.body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ message: error.message });
  }
});

// Rota para proxy de envio de foto
app.post('/api/proxy/arquivo', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = await axios.post('https://pethub-hml.cgtecnologia.com.br/api/v1/arquivo', req.body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
