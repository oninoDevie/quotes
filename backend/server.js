// backend/server.js
const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/preguntas", (req, res) => {
  db.all("SELECT * FROM preguntas", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
