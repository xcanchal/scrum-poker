module.exports = (context, roomId) => {
  const { socket } = context;
  socket.nsp.to(roomId).emit('sessionStarted');
};
