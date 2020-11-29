const assertCollectionExists = (db, collection) => {
  if (!db[collection]) {
    throw new Error(`Collection ${collection} does not exist`);
  }
};

class Database {
  constructor() {
    this.rooms = {};
  }

  get(collection, id) {
    assertCollectionExists(this, collection);
    return this[collection][id];
  }

  getAll(collection) {
    assertCollectionExists(this, collection);
    return this[collection];
  }

  insert(collection, data) {
    assertCollectionExists(this, collection);
    this[collection][data.id] = data;
    return this[collection][data.id];
  }

  update(collection, id, data) {
    assertCollectionExists(this, collection);
    this[collection][id] = { ...this[collection][id], ...data };
    return this[collection][id];
  }

  delete(collection, id) {
    assertCollectionExists(this, collection);
    const { [id]: roomToDelete, ...otherRooms } = this.rooms;
    this.rooms = otherRooms;
    return roomToDelete;
  }
}

const db = new Database();

module.exports = db;
