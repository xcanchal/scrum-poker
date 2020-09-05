const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');
// const cors = require('cors');

const socketManager = require('./lib/socket-manager');

const port = process.env.PORT || 3000;

(async () => {
  // Express + Socket.io server
  const app = express();
  const server = http.Server(app);
  const io = socketIo(server);
  socketManager(io);

  // NextJS app
  const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  /*  server.use(cors({ origin: '*' }));
  io.set('origins', '*:*'); */

  // Request handler
  app.get('*', (req, res) => nextHandle(req, res));

  await server.listen(port);
  console.log(`> App running on http://localhost:${port}`); // eslint-disable-line no-console
})();
