const inputs = document.querySelectorAll("input");
const sexoInput = document.querySelector("[data-tipo-sexo]");
const botonInput = document.querySelector(".formulario__boton");

botonInput.addEventListener("click", evento => {
    if (evento.type == "click") {
        validarSexo(sexoInput);
    }
});

inputs.forEach(input => {
    input.addEventListener("blur", evento => {
        console.log(evento.target);
        validar(evento.target);
    })
});

function validar(htmlTarget) {
    const tipoInput = htmlTarget.dataset.tipo;
    console.log(htmlTarget.parentElement)
    if (validadores[tipoInput]) {
        validadores[tipoInput](htmlTarget);
    }

    if (htmlTarget.validity.valid) {
        htmlTarget.parentElement.querySelector(".formulario__alerta___Error").style.visibility = "hidden";
    }
    else {
        htmlTarget.parentElement.querySelector(".formulario__alerta___Error").style.visibility = "visible";
        htmlTarget.parentElement.querySelector(".formulario__alerta___Error").innerHTML = mensajeError(tipoInput, htmlTarget);
    }
}

const validadores = {
    sexo: (input) => validarSexo(input),
}

function validarSexo(input) {
    const valor = input.value;
    console.log("Hola");
    console.log(input.value);
    if (input.value == "") {
        input.setCustomValidity("Debes de ingresar el sexo");
    }else{
        input.setCustomValidity("");
    }
}

const tiposErrores = ["customError", "patternMismatch", "valueMissing", "typeMismatch"];

const mensajesError = {
    nombre: {
        valueMissing: "El nombre no puede estar vacío",
    },
    apellidos: {
        valueMissing: "Los apellidos no puede estar vacío",
    },
    edad: {
        valueMissing: "La edad no puede estar vacía",
    },
    sexo: {
        valueMissing: "El sexo no puede estar vacío",
    },
    telefono: {
        valueMissing: "El teléfono no puede estar vacío",
        patternMismatch: "Debes de colocar los diez dígitos del número celular"
    },
    correo: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "Ingresaste mal tu correo",
    }
}

function mensajeError(tipoInput, htmlTarget) {
    let mensaje = "";

    tiposErrores.forEach(error => {
        if (htmlTarget.validity[error]) {
            mensaje = mensajesError[tipoInput][error];
        }
    })
    return mensaje;
}