const { vote } = require('../../methods/vote');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'vote',
  handler: async (socket, { roomId, value }) => {
    try {
      const room = await vote(socket, { roomId, value });
      console.log('Voted successfully', { room });
      return room;
    } catch (err) {
      console.log('Error voting', err);
      throw internalError(err);
    }
  },
};
