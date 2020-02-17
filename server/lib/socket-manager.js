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
 */
const handleConnect = (socket) => {
  const { room: roomId } = socket.handshake.query;
  socket.join(roomId, () => {
    console.log(`client "${socket.id}" connected to room: "${roomId}"`);
    handleDisconnect(socket);
  });
};

/**
 * Manages socket connections
 * @param {Object} io socket io app
 */
module.exports = (io) => {
  io.on('connect', handleConnect);
};