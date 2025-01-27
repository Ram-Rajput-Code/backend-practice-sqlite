const sqlite3 = require("sqlite3").verbose();
const dbName = "myDatabase.db";

let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("connected to database");
    db.run(
      "CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("table created or already exist");
        }
      }
    );
  }
});

module.exports = db;
