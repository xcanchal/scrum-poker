const uuid = require('uuid/v4');

/**
 * Handle the disconnection of a client
 * @param {Object} socket socket client connection
 */
/* const onDisconnect = (socket, io, roomId) => {
  socket.on('disconnect', () => {
    socket.broadcast.to(roomId).emit('clientLeft', socket.id);
    io.sockets.emit('clientsUpdated', Object.keys(io.sockets.connected));
  });
}; */

/**
 * Handle the connection of a client
 * @param {Object} socket socket client connection
 * @param {Object} io socket io
 */
/* const onConnect = (socket, io) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId, () => {
    socket.broadcast.to(roomId).emit('clientJoined', socket.id);
    io.sockets.emit('clientsUpdated', Object.keys(io.sockets.connected));

    // onClientLeftRoom(socket, roomId);
    onDisconnect(socket, io, roomId);
  });
}; */

// Initial state
const rooms = [];

/**
 * Kick the guest out of all the rooms where is in
 * @param {Object} socket connection
 */
const leaveRooms = (socket) => {
  const emptyRoomIds = [];

  for (const [roomId, { guests }] of Object.entries(rooms)) {
    if (guests.includes(socket.id)) {
      socket.leave(roomId);
      const room = rooms[roomId];
      room.guests = room.guests.filter((guest) => guest.id === socket.id);
      socket.broadcast.to(roomId).emit('clientLeft', socket.id);

      if (!room.guests.length) {
        emptyRoomIds.push(roomId);
      }
    }

    for (const emptyRoomId of emptyRoomIds) {
      delete rooms[emptyRoomId];
    }
  }
};

/**
 *
 * @param {Object} socket connection object
 * @param {String} roomName name of the room
 * @param {Function} callback function
 */
const joinRoom = (socket, roomId, callback) => {
  console.log('joinRoom - socket, roomId', socket.id, roomId);
  console.log(rooms);
  const room = rooms[roomId];
  if (!room) {
    socket.broadcast.to(roomId).emit('unexistingRoom');
  } else {
    socket.join(roomId, () => {
      if (socket.id !== room.host) {
        room.guests.push(socket.id);
      }
      socket.broadcast.to(roomId).emit('guestJoined', { guest: socket.id, room });
      if (callback) callback(room);
    });
  }
};

/**
 *
 * @param {Object} socket connection object
 * @param {String} roomName name of the room
 * @param {Function} callback function
 */
const createRoom = (socket, roomName, callback) => {
  const room = {
    id: uuid(),
    name: roomName,
    host: socket.id,
    guests: [],
  };
  rooms[room.id] = room;
  joinRoom(socket, room.id, callback);
  // if (callback) callback(room);
};

/**
 * Manages socket connections
 * @param {Object} io socket io app
 */
module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.id = uuid();
    socket.on('createRoom', (name, callback) => createRoom(socket, name, callback));
    socket.on('joinRoom', (roomId, callback) => joinRoom(socket, roomId, callback));
    socket.on('leaveRoom', () => leaveRooms(socket));
    socket.on('disconnect', () => leaveRooms(socket));
  });
};