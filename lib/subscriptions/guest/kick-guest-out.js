const { kickGuestOut } = require('../../methods/guest');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'kickGuestOut',
  handler: async (socket, { roomId, guestId }) => {
    try {
      const room = await kickGuestOut(socket, { roomId, guestId });
      console.log('Kicked out guest from room', { room, guestId });
    } catch (err) {
      console.log('Error kicking out guest', err);
      throw internalError(err);
    }
  },
};
