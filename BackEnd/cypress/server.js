const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getBotResponse } = require('./src/chatbot.js');

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
  console.log('Mensagem do usuário recebida:', userMessage);  // Log para verificar a mensagem recebida
  try {
    const botResponse = await getBotResponse(userMessage);
    console.log('Resposta do bot:', botResponse);  // Log para verificar a resposta do bot
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Erro ao obter a resposta do bot:', error);  // Log para erros
    res.status(500).json({ error: 'Erro ao obter a resposta do bot.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});