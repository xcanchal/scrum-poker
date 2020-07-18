const getRooms = require('./get-rooms');
const { getRoomResponse } = require('../../utils');

module.exports = async ({ socket, db }) => {
  const rooms = await getRooms({ db });
  const emptyRoomIds = [];
  let updatedRooms = [];

  /* eslint-disable no-restricted-syntax */
  for (const [roomId, { guests, host }] of Object.entries(rooms)) {
    const guestInRoom = guests.find(({ id }) => id === socket.id);
    const hostInRoom = host.id === socket.id;

    if (guestInRoom || hostInRoom) {
      socket.leave(roomId);
    }

    const { [roomId]: room, ...otherRooms } = rooms;

    if (guestInRoom) {
      room.guests = room.guests.filter(({ id }) => id !== socket.id);
      socket.broadcast.to(roomId).emit('guestLeft', getRoomResponse(room));
    } else if (hostInRoom) {
      updatedRooms = otherRooms;
      socket.broadcast.to(roomId).emit('hostLeft');
    }

    if (![room.host, room.guests].length) {
      emptyRoomIds.push(roomId);
    }
  }

  for (const emptyRoomId of emptyRoomIds) {
    const { [emptyRoomId]: emptyRoom, ...nonEmptyRooms } = rooms;
    updatedRooms = nonEmptyRooms;
  }

  db.set('rooms', updatedRooms);
};
