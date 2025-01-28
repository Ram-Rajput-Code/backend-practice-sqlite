// CrudOperations/homeCardsCrud.js

const db = require("../config/database");

// Create homeCard
const createHomeCard = (icon, heading, content, callback) => {
  const sql = "INSERT INTO homeCards (icon, heading, content) VALUES (?, ?, ?)";
  db.run(sql, [icon, heading, content], function (err) {
    callback(err, { ID: this.lastID });
  });
};

// Read all homeCards
const readHomeCards = (callback) => {
  const sql = "SELECT * FROM homeCards";
  db.all(sql, [], callback);
};

// Read a single homeCard by ID
const readHomeCardById = (id, callback) => {
  const sql = "SELECT * FROM homeCards WHERE id = ?";
  db.get(sql, [id], callback);
};

// Update homeCard
const updateHomeCard = (id, icon, heading, content, callback) => {
  const sql =
    "UPDATE homeCards SET icon = ?, heading = ?, content = ? WHERE id = ?";
  db.run(sql, [icon, heading, content, id], callback);
};

// Delete homeCard
const deleteHomeCard = (id, callback) => {
  const sql = "DELETE FROM homeCards WHERE id = ?";
  db.run(sql, [id], callback);
};

module.exports = {
  createHomeCard,
  readHomeCards,
  readHomeCardById,
  updateHomeCard,
  deleteHomeCard,
};
