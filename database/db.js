const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'resume-app.db');
const db = new sqlite3.Database(dbPath);

// Create users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Create resumes table
  db.run(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      file_name TEXT,
      file_path TEXT,
      content TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

module.exports = db;
