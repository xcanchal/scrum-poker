const db = require('../../database');

module.exports = (id) => {
  const room = db.get('rooms', id);
  return room;
};
