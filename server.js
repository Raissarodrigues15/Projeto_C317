const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatbot = require('./chatbot');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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
