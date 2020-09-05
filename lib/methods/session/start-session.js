module.exports = (socket, roomId) => {
  socket.nsp.to(roomId).emit('sessionStarted');
};
