require("dotenv").config();

const express = require("express");
const conexion = require("./conexion");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ================= LOGIN =================
app.post("/login", (req, res) => {

  const usuario = req.body.usuario?.trim();
  const password = req.body.contraseña?.trim(); // viene del frontend

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

  conexion.query(sql, [usuario, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.send("FAIL");
    }

    if (result.length > 0) {
      res.send("OK");
    } else {
      res.send("FAIL");
    }

  });

});

// ================= REGISTER =================
app.post("/register", (req, res) => {

  const usuario = req.body.usuario?.trim();
  const password = req.body.contraseña?.trim(); // viene del frontend

  if (!usuario || !password) {
    return res.send("FAIL");
  }

  const sql = "INSERT INTO usuarios (usuario, password) VALUES (?, ?)";

  conexion.query(sql, [usuario, password], (err) => {

    if (err) {
      console.log(err);
      return res.send("FAIL");
    }

    res.send("OK");

  });

});

// ================= PRODUCTOS =================
app.get("/productos", (req, res) => {

  conexion.query("SELECT * FROM productos", (err, result) => {
    if (err) return res.status(500).send("ERROR");
    res.json(result);
  });

});

app.post("/productos", (req, res) => {

  const p = req.body;

  const sql = `
    INSERT INTO productos
    (categoria, nombre, codigo, marca, proveedor, ubicacion, fecha, descripcion, precio, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    p.categoria,
    p.nombre,
    p.codigo,
    p.marca,
    p.proveedor,
    p.ubicacion,
    p.fecha,
    p.descripcion,
    p.precio,
    p.stock
  ], (err) => {

    if (err) return res.send("ERROR");
    res.send("OK");

  });

});

// ================= MOVIMIENTOS =================
app.get("/movimientos", (req, res) => {

  conexion.query("SELECT * FROM movimientos", (err, result) => {
    if (err) return res.status(500).send("ERROR");
    res.json(result);
  });

});

app.post("/movimientos", (req, res) => {

  const m = req.body;

  const sql = `
    INSERT INTO movimientos
    (producto, tipo, cantidad, fecha, observacion)
    VALUES (?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    m.producto,
    m.tipo,
    m.cantidad,
    m.fecha,
    m.observacion
  ], (err) => {

    if (err) return res.send("ERROR");
    res.send("OK");

  });

});

// ================= SERVIDOR =================
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Servidor corriendo");
});