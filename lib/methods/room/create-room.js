const { v4: uuid } = require('uuid');

const { getRoomResponse } = require('../../utils');
const db = require('../../database');

module.exports = (socket, { name, host, cardsMode }) => {
  const room = {
    id: uuid(),
    name,
    cardsMode,
    host: {
      id: socket.id,
      name: host.name,
    },
    guests: [],
  };

  db.insert('rooms', room);
  socket.emit('roomCreated', getRoomResponse(room));

  return room;
};
