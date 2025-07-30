// backend/db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./quotes.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS preguntas (
      id INTEGER PRIMARY KEY,
      categoria TEXT,
      pregunta TEXT,
      correcta TEXT,
      opciones TEXT
    )
  `);
});

module.exports = db;
