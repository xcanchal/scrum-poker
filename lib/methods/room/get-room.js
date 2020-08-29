const db = require('../../database');

module.exports = (id) => {
  const room = db.get('rooms', id);
  console.log('get room method', db, room);
  return room;
};
