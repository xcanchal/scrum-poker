const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');

const registerSubscriptions = require('./lib/subscriptions');

const port = process.env.PORT || 3000;

(async () => {
  const app = express();
  const server = http.Server(app);

  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://the-scrum-poker.online', 'https://www.the-scrum-poker.online']
    : '*';

  const io = socketIo(server, { cors: { origin: allowedOrigins } });
  io.on('connection', (socket) => {
    const context = { io, socket };
    registerSubscriptions(context);
  });

  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  app.get('*', (req, res) => nextHandle(req, res));

  await server.listen(port);
  console.log(`> App running on http://localhost:${port}`); // eslint-disable-line no-console
})();
