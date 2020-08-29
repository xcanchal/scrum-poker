const db = require('../../database');

module.exports = async () => {
  const rooms = await db.getAll('rooms');
  if (!rooms) {
    return [];
  }
  return rooms;
};
