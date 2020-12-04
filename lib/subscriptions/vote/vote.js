const { vote } = require('../../methods/vote');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'vote',
  handler: async (context, { roomId, value }) => {
    try {
      const room = await vote(context, { roomId, value });
      console.dir('Voted successfully', { room });
      return room;
    } catch (err) {
      console.log('Error voting', err);
      throw internalError(err);
    }
  },
};
