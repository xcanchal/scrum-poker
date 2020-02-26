const app = require('express')();
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const socketManager = require('./lib/socket-manager');

dotenv.config();

(module.exports = async () => {

  const { PORT: port = 9000 } = process.env;
  const server = http.createServer(app);

  // middlewares
  app.use(cors(/* { origin: '*' } */));

  // routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // socket
  const io = require('socket.io').listen(server);
  io.set('origins', '*:*');
  socketManager(io);

  try {
    await server.listen(port);
    console.log(`server running on port ${port}`);
  } catch (error) {
    console.error('server error', error);
    process.exit(1);
  }
})();

