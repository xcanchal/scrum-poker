const { createRoom, joinRoom, leaveRooms } = require('./methods/room');
const { vote, clearVotes } = require('./methods/vote');
const { startSession } = require('./methods/session');

module.exports = (io, db) => {
  io.on('connect', (socket) => {
    const context = { socket, db };
    socket.on('createRoom', (params, callback) => createRoom(context, params, callback));
    socket.on('joinRoom', (params, callback) => joinRoom(context, params, callback));
    socket.on('leaveRoom', () => leaveRooms(context, socket));
    socket.on('vote', (params) => vote(context, params));
    socket.on('clearVotes', (roomId) => clearVotes(context, roomId));
    socket.on('startSession', (roomId) => startSession(context, roomId));
    socket.on('disconnect', () => leaveRooms(context));
  });
};
