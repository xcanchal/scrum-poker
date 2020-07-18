const { v4: uuid } = require('uuid');

const joinRoom = require('./join-room');

module.exports = ({ socket, db }, { hostName, roomName, cardsMode }, callback) => {
  const room = {
    id: uuid(),
    name: roomName,
    cardsMode,
    host: {
      id: socket.id,
      name: hostName,
    },
    guests: [],
  };
  db.get('rooms').push(room).write();

  console.log('created room', room.id);
  console.log('rooms', db.get('rooms').value());

  joinRoom({ socket, db }, { roomId: room.id, guestName: hostName }, callback);
};
