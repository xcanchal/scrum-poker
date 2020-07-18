const { getRoomResponse } = require('../../utils');

module.exports = (socket, roomId) => {
  const room = rooms[roomId];
  if (!room) {
    socket.emit('unexistingRoom');
  } else {
    const { vote, ...hostData } = room.host;
    room.host = hostData;
    room.guests = room.guests.map(({ vote, ...guestData }) => guestData);
    socket.nsp.to(roomId).emit('votesCleared', getRoomResponse(/* socket,  */room));
  }
};
