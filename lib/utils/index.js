module.exports.getRoomResponse = (room) => ({
  ...room,
  guests: room.guests.map(({ socket, ...guestData }) => guestData),
});
