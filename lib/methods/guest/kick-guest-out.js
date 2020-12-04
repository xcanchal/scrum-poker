const db = require('../../database');
const { getRoomResponse } = require('../../utils');
const { notFoundError } = require('../../errors');

module.exports = (context, { roomId, guestId }) => {
  const { socket } = context;

  const room = db.get('rooms', roomId);
  if (!room) {
    throw notFoundError(`Room "${roomId}" not found`);
  }

  const guest = room.guests.find(({ id }) => id === guestId);
  if (!guest) {
    throw notFoundError(`Guest "${guestId}" not found in room`);
  }

  const updatedRoom = db.update('rooms', roomId, {
    guests: room.guests.filter(({ id }) => id !== guestId),
  });

  socket.nsp.to(room.id).emit('guestKickedOut', {
    guestId,
    room: getRoomResponse(updatedRoom),
  });

  guest.socket.leave(roomId);

  return updatedRoom;
};
