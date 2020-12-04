const db = require('../../database');
const { getRoomResponse } = require('../../utils');

module.exports = (context, roomId) => {
  const { socket } = context;

  const room = db.get('rooms', roomId);
  if (!room) {
    socket.emit('unexistingRoom');
    return null;
  }

  const { vote: hostVote, ...hostData } = room.host;
  room.host = hostData;
  room.guests = room.guests.map(({ vote: guestVote, ...guestData }) => guestData);
  socket.nsp.to(room.id).emit('votesCleared', getRoomResponse(room));

  return room;
};
