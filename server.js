const WebSocket = require('ws');

// Създаване на WebSocket сървър на порт 8080
const wss = new WebSocket.Server({ port: 8000 });

// Слушане за нови връзки
wss.on('connection', (ws, req) => {
    console.log(req.socket.remoteAddress);


  // Слушане за съобщения от клиента
  ws.on('message', (message) => {
    console.log(`Получено съобщение: ${message}`);

    // Изпращане на съобщение до всички свързани клиенти
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Слушане за затваряне на връзката
  ws.on('close', () => {
    console.log('Устройството се изключи.');
  });
});

console.log('WebSocket сървър работи на ws://localhost:8000');