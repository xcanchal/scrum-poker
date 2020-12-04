const { kickGuestOut } = require('../../methods/guest');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'kickGuestOut',
  handler: async (context, { roomId, guestId }) => {
    try {
      const room = await kickGuestOut(context, { roomId, guestId });
      console.log('Kicked out guest from room', { room, guestId });
    } catch (err) {
      console.log('Error kicking out guest', err);
      throw internalError(err);
    }
  },
};
