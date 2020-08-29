const { createRoom, joinRoom, leaveRooms } = require('./methods/room');
const { vote, clearVotes } = require('./methods/vote');
const { startSession } = require('./methods/session');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('createRoom', (params, callback) => createRoom(socket, params, callback));
    socket.on('joinRoom', (params, callback) => joinRoom(socket, params, callback));
    socket.on('leaveRoom', () => leaveRooms(socket));
    socket.on('vote', (params) => vote(socket, params));
    socket.on('clearVotes', (roomId) => clearVotes(socket, roomId));
    socket.on('startSession', (roomId) => startSession(socket, roomId));
    socket.on('disconnect', () => leaveRooms(socket));
  });
};
