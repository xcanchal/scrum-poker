const db = require('../../database');
const { getRoomResponse } = require('../../utils');

module.exports = (socket, { roomId, value }) => {
  const room = db.get('rooms', roomId);
  if (!room) {
    socket.emit('unexistingRoom');
    return null;
  }

  const isHost = socket.id === room.host.id;
  if (isHost) {
    room.host.vote = value;
  } else {
    const guest = room.guests.find(({ id }) => id === socket.id);
    guest.vote = value;
  }
  socket.nsp.to(room.id).emit('voted', getRoomResponse(room));

  return room;
};
