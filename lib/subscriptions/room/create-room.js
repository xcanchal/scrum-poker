const { createRoom } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'createRoom',
  handler: async (socket, { name, host, cardsMode }) => {
    try {
      const room = await createRoom(socket, { name, host, cardsMode });
      console.log('New room created', room);
    } catch (err) {
      console.log('Error creating room', err);
      throw internalError(err);
    }
  },
};
