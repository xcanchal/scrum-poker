const db = require('../../database');
const { getRoomResponse } = require('../../utils');

module.exports = async (context) => {
  const { socket } = context;

  const rooms = db.getAll('rooms');

  /* eslint-disable no-restricted-syntax */
  for (const room of Object.values(rooms)) {
    const isHost = room.host && room.host.id && room.host.id === socket.id;

    socket.leave(room.id);

    if (isHost) {
      db.delete('rooms', room.id);
      socket.nsp.to(room.id).emit('hostLeft');
    } else {
      room.guests = room.guests.filter(({ id }) => id !== socket.id);
      db.update('rooms', room.id, room);
      socket.nsp.to(room.id).emit('guestLeft', getRoomResponse(room));
    }
  }
};
