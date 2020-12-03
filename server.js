const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');
const cors = require('cors');

const registerSubscriptions = require('./lib/subscriptions');

const port = process.env.PORT || 3000;

const allowedOrigins = ['https://the-scrum-poker.online', 'https://www.the-scrum-poker.online'];
const handleCors = (req, callback) => {
  callback(null, {
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH'],
    origin: process.env.NODE_ENV !== 'production' || allowedOrigins.includes(req.origin),
  });
};

(async () => {
  const app = express();
  const server = http.Server(app);
  const io = socketIo(server, { cors: handleCors });
  io.on('connection', (socket) => {
    registerSubscriptions(socket);
  });

  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  app.get('*', (req, res) => nextHandle(req, res));

  await server.listen(port);
  console.log(`> App running on http://localhost:${port}`); // eslint-disable-line no-console
})();
