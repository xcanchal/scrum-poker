const getRoom = require('../../../lib/methods/room/get-room');
// const db = require('../../../lib/database');

export default async function roomsHandler({ query, method }, res) {
  if (method === 'GET') {
    const room = getRoom(query.id);
    /* console.log('client db', db);
    const room = db.get('rooms', query.id); */
    // const room = await getRoom({ db }, query.id);
    res.status(200).json(room);
  }
}
