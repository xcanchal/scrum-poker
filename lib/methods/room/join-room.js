const getRoom = require('./get-room');
const { getRoomResponse } = require('../../utils');

module.exports = ({ socket, db }, { roomId, guestName }, callback) => {
  const room = getRoom({ db }, roomId);

  if (!room) {
    console.log('unexisting room');
    socket.emit('unexistingRoom');
  } else {
    console.log('joining room', room);
    socket.join(room.id, () => {
      if (socket.id !== room.host.id) {
        room.guests.push({
          id: socket.id,
          name: guestName,
          socket,
        });
      }
      socket.broadcast.to(roomId).emit('guestJoined', getRoomResponse(room));
      if (callback) {
        callback(getRoomResponse(room));
      }
    });
  }
};
