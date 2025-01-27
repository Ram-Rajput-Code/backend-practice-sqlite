const db = require("./database");

//create
const createItem = (name, description, callback) => {
  const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
  db.run(sql, [name, description], function (err) {
    callback(err, { ID: this.lastID });
  });
};

//read
const readItems = (callback) => {
  const sql = "SELECT * FROM items";
  db.all(sql, [], callback);
};

//update
const updateItem = (id, name, description, callback) => {
  const sql = "UPDATE items SET name = ?, description = ? WHERE id = ?";
  db.run(sql, [name, description, id], callback);
};

//delete

const deleteItem = (id, callback) => {
  const sql = "DELETE FROM items WHERE id = ?";
  db.run(sql, id, callback);
};

// view single data
const readItemById = (id, callback) => {
  const sql = "SELECT * FROM items WHERE id = ?";
  db.get(sql, [id], callback);
};

module.exports = { createItem, readItems, updateItem, deleteItem, readItemById };
