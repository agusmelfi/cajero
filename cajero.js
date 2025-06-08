let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  { nombre: "agustin", pin: "1234", saldo: 10000 },
  { nombre: "lucia", pin: "5678", saldo: 7500 },
  { nombre: "max", pin: "0101", saldo: 15000 }
];

let usuarioActual = null;

document.getElementById("login-btn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.toLowerCase();
  const pin = document.getElementById("pin").value;

  const usuario = usuarios.find(u => u.nombre == nombre && u.pin == pin);
  const msg = document.getElementById("login-msg");

  if (usuario) {
    usuarioActual = usuario;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
    document.getElementById("welcome-msg").textContent = `Bienvenido/a ${usuarioActual.nombre}`;
    msg.textContent = "";
  } else {
    msg.textContent = "Credenciales incorrectas";
  }
});

function consultarSaldo() {
  document.getElementById("accion-section").innerHTML = `
    <p>Tu saldo actual es: $${usuarioActual.saldo}</p>
  `;
}

function mostrarRetiro() {
  document.getElementById("accion-section").innerHTML = `
    <input type="number" id="retiro-monto" placeholder="Monto a retirar">
    <button onclick="retirarDinero()">Confirmar</button>
  `;
}

function mostrarDeposito() {
  document.getElementById("accion-section").innerHTML = `
    <input type="number" id="deposito-monto" placeholder="Monto a depositar">
    <button onclick="depositarDinero()">Confirmar</button>
  `;
}

function retirarDinero() {
  const monto = parseFloat(document.getElementById("retiro-monto").value);
  const seccion = document.getElementById("accion-section");

  if (isNaN(monto) || monto <= 0) {
    seccion.innerHTML += `<p>Monto inválido</p>`;
  } else if (monto > usuarioActual.saldo) {
    seccion.innerHTML += `<p>Fondos insuficientes</p>`;
  } else {
    usuarioActual.saldo -= monto;
    actualizarUsuarios();
    seccion.innerHTML += `<p>Retiro exitoso. Saldo restante: $${usuarioActual.saldo}</p>`;
  }
}

function depositarDinero() {
  const monto = parseFloat(document.getElementById("deposito-monto").value);
  const seccion = document.getElementById("accion-section");

  if (isNaN(monto) || monto <= 0) {
    seccion.innerHTML += `<p>Monto inválido</p>`;
  } else {
    usuarioActual.saldo += monto;
    actualizarUsuarios();
    seccion.innerHTML += `<p>Depósito exitoso. Saldo actual: $${usuarioActual.saldo}</p>`;
  }
}

function actualizarUsuarios() {
  const index = usuarios.findIndex(u => u.nombre === usuarioActual.nombre);
  usuarios[index] = usuarioActual;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function logout() {
  usuarioActual = null;
  document.getElementById("menu-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("nombre").value = "";
  document.getElementById("pin").value = "";
  document.getElementById("accion-section").innerHTML = "";
}
