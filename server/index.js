const app = require('express')();
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const socketManager = require('./lib/socket-manager');

dotenv.config();

(module.exports = async () => {

  const { HOST: host, PORT: port, CLIENT_PORT: clientPort } = process.env;
  const server = http.createServer(app);

  // middlewares
  app.options(`http://${host}:${clientPort}`, cors());
  app.use(cors({ origin: `http://${host}:${clientPort}`, credentials: true }));

  // routes
 /*  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  }); */

  // socket
  const io = require('socket.io').listen(server);
  io.set('origins', '*:*');
  socketManager(io);

  try {
    await server.listen(port);
    console.log(`server running on http://${host}:${port}`);
  } catch (error) {
    console.error('server error', error);
    process.exit(1);
  }
})();

