// config/database.js

const sqlite3 = require("sqlite3").verbose();
const dbName = "myDatabase.db";
let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to database");

    // Create `items` table
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
      )`,
      (err) => {
        if (err) console.error(err.message);
        else console.log("`items` table created or already exists");
      }
    );

    // Create `users` table
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
      )`,
      (err) => {
        if (err) console.error(err.message);
        else console.log("`users` table created or already exists");
      }
    );

    // Create `homeCards` table
    db.run(
      `CREATE TABLE IF NOT EXISTS homeCards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        icon TEXT,
        heading TEXT,
        content TEXT
      )`,
      (err) => {
        if (err) console.error(err.message);
        else console.log("`homeCards` table created or already exists");
      }
    );
  }
});

module.exports = db;
