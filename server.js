const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');

const socketManager = require('./lib/socket-manager');

const port = process.env.PORT || 3000;

(async () => {
  const app = express();
  const server = http.Server(app);

  const io = socketIo(server);
  socketManager(io, { reconnectionAttempts: 3 });

  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  app.get('*', (req, res) => nextHandle(req, res));

  await server.listen(port);
  console.log(`> App running on http://localhost:${port}`); // eslint-disable-line no-console
})();
