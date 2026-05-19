
// ================= ELEMENTOS =================

const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");

const tabla = document.getElementById("tablaProductos");
const form = document.getElementById("formProducto");

const tablaMovimientos = document.getElementById("tablaMovimientos");
const formMovimiento = document.getElementById("formMovimiento");

const title = document.getElementById("title");
const button = document.getElementById("actionBtn");
const toggleText = document.getElementById("toggleText");

const buscar = document.getElementById("buscar");

let productos = [];
let movimientos = [];
let isLogin = true;

// ================= LOGIN / REGISTRO =================

toggleText.addEventListener("click", toggleMode);
button.addEventListener("click", handleAction);

function toggleMode() {

  isLogin = !isLogin;

  title.innerText = isLogin ? "Iniciar Sesión" : "Registrarse";
  button.innerText = isLogin ? "Entrar" : "Registrar";

  toggleText.innerText = isLogin
    ? "¿No tienes cuenta? Regístrate"
    : "¿Ya tienes cuenta? Inicia sesión";

}

function handleAction() {

  const user = username.value;
  const pass = password.value;

  if (isLogin) {

    // 🔐 LOGIN
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: user,
        contraseña: pass
      })
    })
    .then(res => res.text())
    .then(data => {

      if (data === "OK") {

        loginScreen.style.display = "none";
        appScreen.style.display = "flex";

        cargarProductos();
        cargarMovimientos();
        actualizarReportes();

      } else {
        alert("❌ Datos incorrectos");
      }

    });

  } else {

    // 🆕 REGISTRO
    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: user,
        contraseña: pass
      })
    })
    .then(res => res.text())
    .then(data => {

      if (data === "OK") {
        alert("✅ Usuario creado");
        toggleMode();
      } else {
        alert("❌ Error al registrar");
      }

    });

  }

}

// ================= MENÚ =================

function mostrarSeccion(id) {

  document.querySelectorAll(".seccion").forEach(sec => {
    sec.classList.remove("activa");
  });

  document.getElementById(id).classList.add("activa");

}

function cerrarSesion() {
  location.reload();
}

// ================= PRODUCTOS =================

form.addEventListener("submit", e => {

  e.preventDefault();

  const producto = {

    categoria: categoria.value,
    nombre: nombre.value,
    codigo: codigo.value,
    marca: marca.value,
    proveedor: proveedor.value,
    ubicacion: ubicacion.value,
    fecha: fecha.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value

  };

  fetch('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
  .then(res => res.text())
  .then(() => {

    form.reset();
    cargarProductos();

  });

});

function cargarProductos() {

  fetch('/productos')
  .then(res => res.json())
  .then(data => {

    productos = data;
    mostrarProductos();
    actualizarReportes();

  });

}

function mostrarProductos(lista = productos) {

  tabla.innerHTML = "";

  lista.forEach(p => {

    tabla.innerHTML += `
      <tr>
        <td>${p.categoria}</td>
        <td>${p.nombre}</td>
        <td>${p.codigo}</td>
        <td>${p.marca}</td>
        <td>${p.proveedor}</td>
        <td>${p.ubicacion}</td>
        <td>${p.fecha}</td>
        <td>${p.precio}</td>
        <td style="color:${p.stock < 5 ? 'red' : 'black'}">
          ${p.stock}
        </td>
      </tr>
    `;

  });

}

// ================= BUSCADOR =================

buscar.addEventListener("input", e => {

  const texto = e.target.value.toLowerCase();

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.codigo.toLowerCase().includes(texto)
  );

  mostrarProductos(filtrados);

});

// ================= MOVIMIENTOS =================

formMovimiento.addEventListener("submit", e => {

  e.preventDefault();

  const movimiento = {

    producto: movProducto.value,
    tipo: tipoMovimiento.value,
    cantidad: cantidadMovimiento.value,
    fecha: fechaMovimiento.value,
    observacion: observacion.value

  };

  fetch('/movimientos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movimiento)
  })
  .then(res => res.text())
  .then(() => {

    formMovimiento.reset();
    cargarMovimientos();

  });

});

function cargarMovimientos() {

  fetch('/movimientos')
  .then(res => res.json())
  .then(data => {

    movimientos = data;
    mostrarMovimientos();
    actualizarReportes();

  });

}

function mostrarMovimientos() {

  tablaMovimientos.innerHTML = "";

  movimientos.forEach(m => {

    tablaMovimientos.innerHTML += `
      <tr>
        <td>${m.producto}</td>
        <td>${m.tipo}</td>
        <td>${m.cantidad}</td>
        <td>${m.fecha}</td>
        <td>${m.observacion}</td>
      </tr>
    `;

  });

}

// ================= REPORTES =================

function actualizarReportes() {

  totalProductos.innerText = productos.length;

  const bajos = productos.filter(p => p.stock < 5);

  stockBajo.innerText = bajos.length;

  totalMovimientos.innerText = movimientos.length;

}