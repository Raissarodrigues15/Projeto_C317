const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatbot = require('./src/chatbot.js');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo index.html quando a raiz for acessada
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../FrontEnd/public', 'index.html'));
});


// Rota para o chatbot
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const botResponse = await chatbot.getBotResponse(userMessage);
    res.json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a resposta do bot.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});