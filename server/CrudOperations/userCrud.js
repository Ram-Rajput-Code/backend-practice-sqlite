const db = require("../config/database");

// Create user
const createUser = (username, email, password, callback) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.run(sql, [username, email, password], function (err) {
    callback(err, { ID: this.lastID });
  });
};

// Read all users
const readUsers = (callback) => {
  const sql = "SELECT id, username, email FROM users"; // Exclude password for security
  db.all(sql, [], callback);
};

// Read user by ID
const readUserById = (id, callback) => {
  const sql = "SELECT id, username, email FROM users WHERE id = ?";
  db.get(sql, [id], callback);
};

// Update user
const updateUser = (id, username, email, password, callback) => {
  const sql =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.run(sql, [username, email, password, id], callback);
};

// Delete user
const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, [id], callback);
};

module.exports = {
  createUser,
  readUsers,
  readUserById,
  updateUser,
  deleteUser,
};
