// Import dos módulos da biblioteca do Google
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  // Permite o uso do .env para garantir a segurança da API
  require('dotenv').config();
  
  // Recupera a API e instancia a IA
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const fs = require('fs');
  
  // Informa o arquivo a ser lido
  const caminhoDoArquivo = 'instrucoes.txt';
  
  // Lê o arquivo e tenta retornar seu valor
  function lerArquivo(caminho) {
      try {
          const data = fs.readFileSync(caminho, 'utf8');
          return data;
      } catch (err) {
          console.error('Erro ao ler o arquivo:', err);
          return null;
      }
  }
  
  // Salva as instruções em uma variável
  const instrucoes = lerArquivo(caminhoDoArquivo);
  
  // Informa o modelo de IA a ser utilizado e as instruções personalizadas 
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: instrucoes,
  });
  
  const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  // Filtra conteúdo indesejado
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  
  // Inicializa o chatbot
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });
  
  async function getBotResponse(userMessage) {
    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
  }
  
  module.exports = { getBotResponse };
  