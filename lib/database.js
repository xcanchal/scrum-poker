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
  }

  update(collection, id, data) {
    assertCollectionExists(this, collection);
    this[collection][id] = { ...this[collection][id], ...data };
    return this[collection][id];
  }

  updateAll(collection, dataSet) {
    assertCollectionExists(this, collection);
    while (this.rooms.length) {
      this.rooms.pop();
    }
    for (data of Object.entries(dataSet)) { // todo review this arrray/object
      this.rooms.push(dataSet);
    }
    // this[collection] = dataSet;
  }

  delete(collection, id) {
    assertCollectionExists(this, collection);
    delete this[collection][id];
  }
}

const db = new Database();
Object.freeze(db);

// singleton
module.exports = db;
