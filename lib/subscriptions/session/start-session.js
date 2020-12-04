const { startSession } = require('../../methods/session');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'startSession',
  handler: async (context, roomId) => {
    try {
      await startSession(context, roomId);
      console.log('Session started', { roomId });
    } catch (err) {
      console.log('Error starting session', err);
      throw internalError(err);
    }
  },
};
