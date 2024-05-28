//import dos modulos da biblioteca do google
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  //permite o uso do .env para garantir a segurança da API
  require('dotenv').config();

  //recupera a API e instancia a IA
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const fs = require('fs');

  //informa o arquivo a ser lido
  const caminhoDoArquivo = 'instrucoes.txt';

  //le o arquivo e tenta retornar seu valor
  function lerArquivo(caminho) {
      try {
          const data = fs.readFileSync(caminho, 'utf8');
          return data;
      } catch (err) {
          console.error('Erro ao ler o arquivo:', err);
          return null;
      }
  }

  //salva as instruções em uma variavel
  const instrucoes = lerArquivo(caminhoDoArquivo);

  //informa o modelo de IA a ser utilizado e as instruções personalizadas 
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
  
  //filtra conteudo indesejado
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
  
  //inicializa o chatbot
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  //permite o uso do readline
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  //envia uma mensagem para o gemini e obtem uma resposta
  async function run() {
    //array para salvar mensagens
    let conversationHistory = [];

    //loop "infinito" com uma flag de saida
    while (true) {
      //salva a mensagem do usuario
      const userInput = await new Promise((resolve) => {
        rl.question("Digite sua mensagem: ", (userInput) => {
          resolve(userInput);
        });
      });

        //quebra o loop caso o usuario mande sair
      if (userInput.toLowerCase() === "sair") {
        break;
      }

      //envia a mensagem para o Gemini
      const result = await chatSession.sendMessage(userInput);

      //salva a mensagem no historico
      conversationHistory.push({ user: userInput, response: result.response.text() });

      //exibe a resposta do chatbot
      console.log("Chatbot: " + result.response.text());

      /*exibe o historico da conversa
      console.log("\nConversation History:");
      for (const entry of conversationHistory) {
        console.log(`User: ${entry.user}`);
        console.log(`Chatbot: ${entry.response}`);
      }*/
    }

    //encerra o codigo
    console.log("Chat finalizado.");
    process.exit();
  }

  
  run();