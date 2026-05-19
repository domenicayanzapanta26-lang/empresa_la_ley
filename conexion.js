const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empresa_la_ley"
});

db.connect((err) => {
  if (err) console.log("ERROR DB:", err);
  else console.log("Conectado local");
});

module.exports = db;