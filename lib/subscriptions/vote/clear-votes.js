const { clearVotes } = require('../../methods/vote');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'clearVotes',
  handler: async (context, roomId) => {
    try {
      await clearVotes(context, roomId);
      console.log('Votes cleared', { roomId });
    } catch (err) {
      console.log('Error clearing votes', err);
      throw internalError(err);
    }
  },
};
