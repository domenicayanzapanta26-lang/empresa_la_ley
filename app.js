const express = require("express");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ================= LOGIN (SIN BASE DE DATOS) =================
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  if (usuario && contraseña) {
    return res.send("OK");
  }

  res.send("FAIL");
});

// ================= REGISTER (SIN BASE DE DATOS) =================
app.post("/register", (req, res) => {
  const { usuario, contraseña } = req.body;

  if (usuario && contraseña) {
    return res.send("OK");
  }

  res.send("FAIL");
});

// ================= PRODUCTOS (MEMORIA LOCAL) =================
let productos = [];

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.send("OK");
});

// ================= MOVIMIENTOS (MEMORIA LOCAL) =================
let movimientos = [];

app.get("/movimientos", (req, res) => {
  res.json(movimientos);
});

app.post("/movimientos", (req, res) => {
  movimientos.push(req.body);
  res.send("OK");
});

// ================= SERVIDOR =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor funcionando en puerto", PORT);
});