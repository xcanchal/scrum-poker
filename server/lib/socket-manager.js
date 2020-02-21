const uuid = require('uuid/v4');

// Initial state
const rooms = {};

const getRoomResponse = (room) => ({
  ...room,
  guests: room.guests.map(({ id, name }) => ({ id, name })),
});

/**
 * Kick the guest out of all the rooms where is in
 * @param {Object} socket connection
 */
const leaveRooms = (socket) => {
  const emptyRoomIds = [];

  for (const [roomId, { guests }] of Object.entries(rooms)) {
    const guestInRoom = guests.find(({ id }) => id === socket.id);
    if (guestInRoom) {
      socket.leave(roomId);
      const room = rooms[roomId];
      room.guests = room.guests.filter(({ id }) => id !== socket.id);
      socket.broadcast.to(roomId).emit('guestLeft', getRoomResponse(room));

      if (![room.host, room.guests].length) {
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
const joinRoom = (socket, { roomId, guestName }, callback) => {
  console.log('joinRoom - socket, roomId', socket.id, roomId);
  console.log(rooms);
  const room = rooms[roomId];
  if (!room) {
    console.log('no room');
    socket.emit('unexistingRoom');
  } else {
    socket.join(roomId, () => {
      if (socket.id !== room.host.id) {
        room.guests.push({
          id: socket.id,
          name: guestName,
          socket,
        });
      }
      socket.broadcast.to(roomId).emit('guestJoined', getRoomResponse(room));
      if (callback) callback(getRoomResponse(room));
    });
  }
};

/**
 *
 * @param {Object} socket connection object
 * @param {String} roomName name of the room
 * @param {Function} callback function
 */
const createRoom = (socket, { hostName, roomName }, callback) => {
  const room = {
    id: uuid(),
    name: roomName,
    host: {
      id: socket.id,
      name: hostName,
    },
    guests: [],
  };
  rooms[room.id] = room;
  joinRoom(socket, { roomId: room.id, guestName: hostName }, callback);
  // if (callback) callback(room);
};

/**
 * Manages socket connections
 * @param {Object} io socket io app
 */
module.exports = (io) => {
  io.on('connect', (socket) => {
    // socket.id = uuid();
    socket.on('createRoom', (params, callback) => createRoom(socket, params, callback));
    socket.on('joinRoom', (params, callback) => joinRoom(socket, params, callback));
    socket.on('leaveRoom', () => leaveRooms(socket));
    socket.on('disconnect', () => leaveRooms(socket));
  });
};