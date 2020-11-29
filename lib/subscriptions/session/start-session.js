const { startSession } = require('../../methods/session');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'startSession',
  handler: async (socket, roomId) => {
    try {
      await startSession(socket, roomId);
      console.log('Session started', { roomId });
    } catch (err) {
      console.log('Error starting session', err);
      throw internalError(err);
    }
  },
};
