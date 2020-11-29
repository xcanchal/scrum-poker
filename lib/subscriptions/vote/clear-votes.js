const { clearVotes } = require('../../methods/vote');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'clearVotes',
  handler: async (socket, roomId) => {
    try {
      await clearVotes(socket, roomId);
      console.log('Votes cleared', { roomId });
    } catch (err) {
      console.log('Error clearing votes', err);
      throw internalError(err);
    }
  },
};
