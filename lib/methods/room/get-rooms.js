module.exports = async ({ db }) => {
  const rooms = await db.get('rooms').value();
  if (!rooms) {
    return [];
  }
  return rooms;
};
