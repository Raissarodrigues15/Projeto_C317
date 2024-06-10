 // cypress/unit/chatbot.test.js
 
 // funcionamento correto da função getBotResponse.
 const { getBotResponse } = require('../../src/chatbot');

 // cenário de testes unitários
 describe('Chatbot de Testes Unitários', () => {
   it('Retorno de uma resposta para uma entrada válida', async () => {
    // chatbot retorna resposta da mensagem do usuário
    /* variáveis 'usserMessage' e 'expectedResponse', 
       contém a informação do usuário e a resposta esperada.
    */
     const userMessage = 'Olá, chatbot!';
     const expectedResponse = 'Olá! Como posso ajudar?';

     /* Simulação de uma chamada API, feita pela função 
     'fetch' e a substituição do objeto 'window' pela ('stub')
     A função é configurada para interceptar uma requisição POST 
     para o endpoint 'http://localhost:3000/chatbot' com um corpo 
     contendo a mensagem do usuário. A resposta simulada indica 
     que a requisição foi bem-sucedida (ok: true) e fornece a 
     resposta esperada.
     */
     cy.stub(window, 'fetch')
       .withArgs('http://localhost:3000/chatbot', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ message: userMessage }),
       })
       .resolves({
         ok: true,
         json: () => Promise.resolve({ response: expectedResponse }),
       });

       /*
        A função getBotResponse é chamada com a mensagem do usuário,
        e o teste verifica se a resposta retornada é igual à 
        resposta esperada.
       */
     const response = await getBotResponse(userMessage);
     expect(response).to.equal(expectedResponse);
   });

   /*
    O segundo teste verifica se a função getBotResponse lida corretamente 
    com um erro do servidor. A variável userMessage contém a mensagem do 
    usuário que deve causar um erro.
   */
   it('Tratamento de erros Back-End', async () => {
     const userMessage = 'Test error handling';

     /*
     Aqui, a função fetch é configurada para simular 
     uma rejeição com uma mensagem de erro 'Erro no servidor'.
     */
     cy.stub(window, 'fetch')
       .withArgs('http://localhost:3000/chatbot', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ message: userMessage }),
       })
       .rejects(new Error('Erro no servidor'));

     /*
       A função getBotResponse é chamada 
       com a mensagem do usuário. Se a 
       função lançar um erro, o teste 
       verifica se a mensagem de erro 
       é igual a 'Erro no servidor'.
     */  
     try {
       await getBotResponse(userMessage);
     } catch (error) {
       expect(error.message).to.equal('Erro no servidor');
     }
   });
 });
