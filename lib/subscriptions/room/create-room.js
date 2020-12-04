const { createRoom } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'createRoom',
  handler: async (context, { name, host, cardsMode }) => {
    try {
      const room = await createRoom(context, { name, host, cardsMode });
      console.log('New room created', room);
    } catch (err) {
      console.log('Error creating room', err);
      throw internalError(err);
    }
  },
};
