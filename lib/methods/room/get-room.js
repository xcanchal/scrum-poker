module.exports = ({ db }, id) => {
  const room = db.get('rooms').find({ id }).value();
  if (room) {
    return room;
  }
  return null;
};
