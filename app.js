
const express = require('express');
const conexion = require('./conexion');
const path = require('path');

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ================= LOGIN =================
app.post('/login', (req, res) => {

  const usuario = req.body.usuario?.trim();
  const contraseña = req.body.contraseña?.trim();

  console.log("LOGIN:", req.body);

  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";

  conexion.query(sql, [usuario, contraseña], (err, result) => {

    if (err) {
      console.log("ERROR LOGIN:", err);
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
app.post('/register', (req, res) => {

  const usuario = req.body.usuario?.trim();
  const contraseña = req.body.contraseña?.trim();

  console.log("REGISTER:", req.body);

  if (!usuario || !contraseña) {
    return res.send("FAIL");
  }

  const sql = "INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)";

  conexion.query(sql, [usuario, contraseña], (err) => {

    if (err) {
      console.log("ERROR REGISTER:", err);
      return res.send("FAIL");
    }

    res.send("OK");

  });

});

// ================= PRODUCTOS =================
app.get('/productos', (req, res) => {

  conexion.query("SELECT * FROM productos", (err, result) => {

    if (err) return res.status(500).send("ERROR");

    res.json(result);

  });

});

app.post('/productos', (req, res) => {

  const {

    categoria,
    nombre,
    codigo,
    marca,
    proveedor,
    ubicacion,
    fecha,
    descripcion,
    precio,
    stock

  } = req.body;

  const sql = `
    INSERT INTO productos
    (categoria, nombre, codigo, marca, proveedor, ubicacion, fecha, descripcion, precio, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    categoria,
    nombre,
    codigo,
    marca,
    proveedor,
    ubicacion,
    fecha,
    descripcion,
    precio,
    stock
  ], (err) => {

    if (err) {
      console.log(err);
      return res.send("ERROR");
    }

    res.send("OK");

  });

});

// ================= MOVIMIENTOS =================
app.get('/movimientos', (req, res) => {

  conexion.query("SELECT * FROM movimientos", (err, result) => {

    if (err) return res.status(500).send("ERROR");

    res.json(result);

  });

});

app.post('/movimientos', (req, res) => {

  const {

    producto,
    tipo,
    cantidad,
    fecha,
    observacion

  } = req.body;

  const sql = `
    INSERT INTO movimientos
    (producto, tipo, cantidad, fecha, observacion)
    VALUES (?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    producto,
    tipo,
    cantidad,
    fecha,
    observacion
  ], (err) => {

    if (err) {
      console.log(err);
      return res.send("ERROR");
    }

    res.send("OK");

  });

});

// ================= SERVIDOR =================
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});