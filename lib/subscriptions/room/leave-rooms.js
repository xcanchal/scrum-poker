const { leaveRooms } = require('../../methods/room');
const { internalError } = require('../../errors');

module.exports = {
  eventName: 'leaveRoom',
  handler: async (socket) => {
    try {
      await leaveRooms(socket);
      console.log('Left rooms');
    } catch (err) {
      console.log('Error leaving rooms', err);
      throw internalError(err);
    }
  },
};
