const { joinRoom } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'joinRoom',
  handler: async (socket, { id, guestName }) => {
    try {
      const room = await joinRoom(socket, { id, guestName });
      console.log('Joined room', {
        id,
        name: room.name,
        socketId: socket.id,
        guestName,
      });
    } catch (err) {
      console.log('Error joining room', err);
      throw internalError(err);
    }
  },
};
