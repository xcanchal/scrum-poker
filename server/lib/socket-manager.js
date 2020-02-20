/**
 * Handle the disconnection of a client
 * @param {Object} socket socket client connection
 */
const onDisconnect = (socket, io, roomId) => {
  socket.on('disconnect', () => {
    socket.broadcast.to(roomId).emit('clientLeft', socket.id);
    io.sockets.emit('clientsUpdated', Object.keys(io.sockets.connected));
  });
};

/**
 * Handle the connection of a client
 * @param {Object} socket socket client connection
 * @param {Object} io socket io
 */
const onConnect = (socket, io) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId, () => {
    socket.broadcast.to(roomId).emit('clientJoined', socket.id);
    io.sockets.emit('clientsUpdated', Object.keys(io.sockets.connected));

    // onClientLeftRoom(socket, roomId);
    onDisconnect(socket, io, roomId);
  });
};

/**
 * Manages socket connections
 * @param {Object} io socket io app
 */
module.exports = (io) => {
  io.on('connect', (socket) => onConnect(socket, io));
};