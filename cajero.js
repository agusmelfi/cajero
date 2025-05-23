//Usuarios

let usuarios = [
    {nombre: "agustin", pin: "1234", saldo: 10000},
    {nombre: "lucia", pin: `5678`, saldo: 7500},
    {nombre: "max", pin: `0101`, saldo: 15000},
];

//Inicio de sesión

let usuarioActual = null;

function login() {
    let intentos = 3;

    while (intentos > 0){
    const nombre = prompt(`Ingrese su nombre`).toLowerCase();
    const pin = prompt(`Ingrese su PIN`);

    const usuarioEncontrado = usuarios.find(
        usuario => usuario.nombre === nombre && usuario.pin === pin
    );

    if (usuarioEncontrado) {
        usuarioActual = usuarioEncontrado;
        alert(`¡Bienvenido/a ${usuarioActual.nombre.toUpperCase()}!`);
        menuPrincipal();
        return;
    }
    else {
        intentos = intentos - 1;
        alert(`Datos incorrectos, te quedan ${intentos} intentos`)
    }
  }
 alert (`Demasiados intentos fallidos`);
}

//Menú

function menuPrincipal() {
    let opcion = prompt(
        `Que desea hacer?\n
        1- Consultar saldo\n
        2- Retirar dinero\n
        3- Depositar dinero\n
        4- Salir`
    )
    while(opcion != `4`){
       switch(opcion) {
        case `1`:
            consultarSaldo();
            break;
        case `2`:
            retirarDinero();
            break;
        case `3`:
            depositarDinero();
            break;
        default:
            alert(`Opción inválida`)
       } 
       opcion = prompt(
        `Que desea hacer?\n
        1- Consultar saldo\n
        2- Retirar dinero\n
        3- Depositar dinero\n
        4- Salir`)
    }
    alert(`Gracias por utilizar al cajero!!`)
}


//Conaultar saldo

function consultarSaldo(){
    alert(`Tu saldo actual es ${usuarioActual.saldo}`);
}

//Retirar dinero

function retirarDinero(){
    const monto = parseFloat(prompt(`¿Cuánto dinero desea retirar?`))
    if(isNaN(monto) || monto <= 0){
        alert(`El monto ingresado no es válido`)
    }
    else if(monto > usuarioActual.saldo){
        alert(`Fondos insuficientes`)
    }
    else{
        usuarioActual.saldo = usuarioActual.saldo - monto
        alert(`Retiro exitoso, saldo restante: ${usuarioActual.saldo}`)
    }
}

//Depositar dinero

function depositarDinero(){
    const monto = parseFloat(prompt(`¿Cuánto dinero deseas ingresar?`))
    if(isNaN(monto) || monto <= 0){
        alert(`Monto inválido`)
    }
    else{
        usuarioActual.saldo += monto
        alert(`Depósito exitoso, saldo actual: ${usuarioActual.saldo}`)
    }
}

login()

