/**
 * Handle the disconnection of a client
 * @param {Object} socket socket client connection
 */
const handleDisconnect = (socket) => {
  socket.on('disconnect', () => {
    console.log(`client "${socket.id}" disconnected`);
  });
};

/**
 * Handle the connection of a client
 * @param {Object} socket socket client connection
 * @param {Object} io socket io
 */
const handleConnect = (socket, io) => {
  const { room: roomId } = socket.handshake.query;
  socket.join(roomId, () => {
    socket.broadcast.to(roomId).emit('clientJoined', socket.id);
    socket.broadcast.to(roomId).emit('clientsUpdated', Object.keys(io.sockets.connected));
  });

  /* socket.leave(roomId, () => {
    socket.broadcast.to(roomId).emit('clientLeft', { id: socket.id });
  }); */

  handleDisconnect(socket);
};

/**
 * Manages socket connections
 * @param {Object} io socket io app
 */
module.exports = (io) => {
  io.on('connect', (socket) => handleConnect(socket, io));
};