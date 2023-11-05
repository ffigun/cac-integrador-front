// Valores y descuentos
const valorTicket       = 200;

let descuentoEstudiante = 80;
let descuentoTrainee    = 50;
let descuentoJunior     = 15;

// Elementos del formulario
let nombre      = document.getElementById('nombre');
let apellido    = document.getElementById('apellido');
let mail        = document.getElementById('mail');
let cantidad    = document.getElementById('cantidad');
let categoria   = document.getElementById('categoria');

let btnBorrar   = document.getElementById('borrar');
let btnResumen  = document.getElementById('resumen');
let total       = document.getElementById('total');

// Para quitar el recuadro y aviso de error de todos los campos del formulario
const limpiarError = () => {
    let listaNodos = document.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < listaNodos.length; i++) {
        listaNodos[i].classList.remove('is-invalid');
    };
}

// Para vaciar todos los campos y restablecer la opcion de los selectores
const limpiarCampos = () => {
    let listaNodos = document.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < listaNodos.length; i++) {
        listaNodos[i].value = '';
        
        if (listaNodos[i].classList.contains("form-select")) {
            listaNodos[i].selectedIndex = 0;
        }
    }
}

// Para vaciar el total, util si ya hay un total mostrado, ingresa un campo invalido y vuelve a calcular
const limpiarTotal = () => {
    total.innerHTML = '';
}

// Limpia todo el formulario
const borrar = () => {
    limpiarError();
    limpiarCampos();
    limpiarTotal();

    document.activeElement.blur();
}

// Limpia errores, valida campos y muestra el precio total
const calcularTotal = () => {
    limpiarTotal();
    limpiarError();

    if (nombre.value === '') {
        nombre.classList.add("is-invalid");
        nombre.focus();
        return;
    }

    if (apellido.value === '') {
        apellido.classList.add("is-invalid");
        apellido.focus();
        return;
    }

    const emailValido = mail => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    }

    if (!emailValido(mail.value)) {
        mail.classList.add("is-invalid");
        mail.focus();
        return;
    }

    if ((cantidad.value <= 0) || (isNaN(cantidad.value))) {
        cantidad.classList.add("is-invalid");
        cantidad.focus();
        return;
    }

    let precioTotal = valorTicket;

    switch (categoria.selectedIndex) {
        case 0:
            precioTotal = cantidad.value * valorTicket;
            break;
        case 1:
            precioTotal = cantidad.value * (valorTicket - (descuentoEstudiante / 100 * valorTicket));
            break;
        case 2:
            precioTotal = cantidad.value * (valorTicket - (descuentoTrainee / 100 * valorTicket));
            break;
        case 3:
            precioTotal = cantidad.value * (valorTicket - (descuentoJunior / 100 * valorTicket));
            break;
    }

    total.innerHTML = precioTotal;
}

// Botones
btnBorrar.addEventListener("click", borrar);
btnResumen.addEventListener("click", calcularTotal);

// Si un input es invalido, que al comenzar a escribir  desaparezca el error en ese input especifico
nombre.addEventListener("input", () => (nombre.classList.remove('is-invalid')));
apellido.addEventListener("input", () => (apellido.classList.remove('is-invalid')));
mail.addEventListener("input", () => (mail.classList.remove('is-invalid')));
cantidad.addEventListener("input", () => (cantidad.classList.remove('is-invalid')));