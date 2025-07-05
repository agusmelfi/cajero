
let usuarios = [];
let usuarioActual = null;

// Cargar usuarios desde usuarios.json
fetch('usuarios.json')
  .then(res => res.json())
  .then(data => {
    usuarios = data;
  });

document.getElementById("login-btn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.toLowerCase();
  const pin = document.getElementById("pin").value;

  const usuario = usuarios.find(u => u.nombre === nombre && u.pin === pin);

  if (usuario) {
    usuarioActual = usuario;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
    document.getElementById("welcome-msg").textContent = `Bienvenido/a ${usuarioActual.nombre}`;
  } else {
    Swal.fire("Error", "Credenciales incorrectas", "error");
  }
});

function consultarSaldo() {
  document.getElementById("accion-section").innerHTML = `<p>Tu saldo actual es: $${usuarioActual.saldo}</p>`;
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
    Swal.fire("Error", "Monto inválido", "warning");
  } else if (monto > usuarioActual.saldo) {
    Swal.fire("Fondos insuficientes", "No tenés saldo suficiente", "error");
  } else {
    usuarioActual.saldo -= monto;
    guardarCambios();
    Swal.fire("Éxito", `Retiro exitoso. Saldo restante: $${usuarioActual.saldo}`, "success");
  }
}

function depositarDinero() {
  const monto = parseFloat(document.getElementById("deposito-monto").value);
  const seccion = document.getElementById("accion-section");

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Error", "Monto inválido", "warning");
  } else {
    usuarioActual.saldo += monto;
    guardarCambios();
    Swal.fire("Éxito", `Depósito exitoso. Saldo actual: $${usuarioActual.saldo}`, "success");
  }
}

function guardarCambios() {
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
