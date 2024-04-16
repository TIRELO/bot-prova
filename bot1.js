const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Token do seu bot gerado pelo BotFather
const token = '6621341744:AAF4ZrCzPur8xoM2SrRYvVtTSYxSsEgQQ_Y';

// Cria uma instância do bot
const bot = new TelegramBot(token, { polling: true });

// Manipulador de comandos "/start"
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Olá! Eu sou um bot do Telegram. Como posso ajudar?');
});

// Manipulador de mensagens de texto
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (isValidEmail(messageText))
  {
    // Salva o email
    saveEmail(msg.from.id, messageText);

    bot.sendMessage(chatId, 'Email salvo com sucesso!');
  } else {
    // Obtém a hora atual
  const horaAtual = new Date().toLocaleTimeString();
  if(horaAtual < '09:00' && horaAtual > '18:00')
  {
      bot.sendMessage(chatId, `https://uvv.br`);
  }
  else
  {
      bot.sendMessage(chatId, `Horário de funcionamento: 09:00 às 18:00`);
      bot.sendMessage(chatId, `E-mail: `);
  }
  }
  });

// Função para verificar se o email é válido
function isValidEmail(email) {
    // Esta é uma validação simples, pode não cobrir todos os casos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


// Função para salvar o email em um arquivo JSON
function saveEmail(userId, email) {
    // Carrega os dados existentes do arquivo
    let data = {};
    try {
      data = JSON.parse(fs.readFileSync('emails.json', 'utf8'));
    } catch (error) {
      // Se o arquivo não existir ou estiver vazio, não há necessidade de fazer nada
    }
  
    // Adiciona o email ao objeto de dados
    data[userId] = email;
  
    // Salva os dados atualizados no arquivo
    fs.writeFileSync('emails.json', JSON.stringify(data));
  }
