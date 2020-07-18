const { getRoomResponse } = require('../../utils');

module.exports = (socket, { roomId, value }) => {
  const room = rooms[roomId];
  if (!room) {
    socket.emit('unexistingRoom');
  } else {
    if (socket.id === room.host.id) {
      room.host.vote = value;
    } else {
      const guest = room.guests.find(({ id }) => id === socket.id);
      guest.vote = value;
    }
    socket.nsp.to(roomId).emit('voted', getRoomResponse(/* socket,  */room));
  }
};
