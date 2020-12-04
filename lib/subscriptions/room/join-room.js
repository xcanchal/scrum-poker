const { joinRoom } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'joinRoom',
  handler: async (context, { id, guestName }) => {
    try {
      const room = await joinRoom(context, { id, guestName });
      console.log('Joined room', room);
    } catch (err) {
      console.log('Error joining room', err);
      throw internalError(err);
    }
  },
};
