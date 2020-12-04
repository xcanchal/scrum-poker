const { leaveRooms } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'leaveRoom',
  handler: async (context) => {
    try {
      await leaveRooms(context);
      console.log('Left rooms', { socketId: context.socket.id });
    } catch (err) {
      console.log('Error leaving rooms', err);
      throw internalError(err);
    }
  },
};
