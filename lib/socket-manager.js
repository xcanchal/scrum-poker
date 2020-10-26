const roomMethods = require('./methods/room');
const voteMethods = require('./methods/vote');
const sessionMethods = require('./methods/session');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('createRoom', (params, callback) => roomMethods.createRoom(socket, params, callback));
    socket.on('joinRoom', (params, callback) => roomMethods.joinRoom(socket, params, callback));
    socket.on('leaveRoom', () => roomMethods.leaveRooms(socket));
    socket.on('vote', (params) => voteMethods.vote(socket, params));
    socket.on('clearVotes', (roomId) => voteMethods.clearVotes(socket, roomId));
    socket.on('startSession', (roomId) => sessionMethods.startSession(socket, roomId));
    socket.on('reconnect_failed', () => roomMethods.leaveRooms(socket));
  });
};
