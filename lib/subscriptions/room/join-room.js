const { joinRoom } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'joinRoom',
  handler: async (socket, { id, guestName }) => {
    try {
      const room = await joinRoom(socket, { id, guestName });
      console.log('Joined room', room);
    } catch (err) {
      console.log('Error joining room', err);
      throw internalError(err);
    }
  },
};
