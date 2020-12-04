const db = require('../../database');
const { getRoomResponse } = require('../../utils');

module.exports = (context, { id, guestName }) => {
  const { socket } = context;

  const room = db.get('rooms', id);
  if (!room) {
    socket.emit('unexistingRoom');
    return null;
  }

  socket.join(room.id);

  const isHost = socket.id === room.host.id;

  if (!isHost) {
    const newGuest = {
      id: socket.id,
      name: guestName,
      socket,
    };

    room.guests = [...room.guests, newGuest];
    db.update('rooms', room.id, room);
    socket.nsp.to(room.id).emit('guestJoined', getRoomResponse(room));
  }

  socket.nsp.to(room.id).emit('guestJoined', getRoomResponse(room));

  return room;
};
