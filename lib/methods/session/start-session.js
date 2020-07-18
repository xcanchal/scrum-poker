module.exports = ({ socket }, roomId) => {
  console.log('start session');
  console.log('socket', socket);
  console.log('roomId', roomId);
  socket.nsp.to(roomId).emit('sessionStarted');
};
