const db = require('../../database');
const { getRoomResponse } = require('../../utils');

module.exports = (socket, { id, guestName }) => {
  const room = db.get('rooms', id);

  if (!room) {
    socket.emit('unexistingRoom');
  } else {
    const isHost = socket.id === room.host.id;

    socket.join(room.id, () => {
      if (!isHost) {
        const newGuest = {
          id: socket.id,
          name: guestName,
          socket,
        };

        room.guests = [...room.guests, newGuest];
        db.update('rooms', room.id, room);
      }

      socket.nsp.to(room.id).emit('guestJoined', getRoomResponse(room));
    });
  }
};
