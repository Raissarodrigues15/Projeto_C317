# Chatbot IWS Sistemas

## Descrição
Este projeto implementa um site de chatbot para a empresa IWS Sistemas, utilizando a tecnologia Node.js em conjunto com a API do Gemini AI para a criação de um atendimento ao cliente automatizado.

## Pré-requisitos
Antes de rodar o projeto pela primeira vez, certifique-se de ter instalado o Node.js e npm (Node Package Manager).

### Instalação de Dependências
Para instalar as dependências necessárias, execute os seguintes comandos no terminal na raiz do projeto:

npm install @google/generative-ai
npm install dotenv

### Configuração da Chave da API do Gemini AI
1. Abra o arquivo `.env` em algum editor de texto
2. Substitua `"API_KEY"` no arquivo `.env` com a sua chave da API do Gemini AI. Resultando no seguinte:

API_KEY=suaChaveDoGemini

## Rodando o Projeto
Após instalar as dependências e configurar a chave da API, você pode iniciar o servidor utilizando o comando:

node BackEnd/cypress/server.js

Este comando irá iniciar o servidor backend do chatbot.

Após iniciar o servidor, você poderá acessar o chatbot através do navegador utilizando o utilizando o link http://localhost:3000.
