const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});
btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Lógica de validación del login
const formSignIn = document.getElementById("formSignIn");

if (formSignIn) {
    formSignIn.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        let esValido = true;


        if (!validarCorreo(email)) {
            alert("El correo electrónico no tiene un formato válido.");
            esValido = false;
        }

        if (esValido && !validarPassword(password)) {
            alert("La contraseña no es válida.");
            esValido = false;
        }

        if (esValido) {
            localStorage.setItem("usuarioActual", email);
            window.location.href = "index.html";
        }
    });
}

const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
    forgotPassword.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.add("toggle");
    });
}

// Lógica de validación de registro
const formSignUp = document.getElementById("formSignUp");

if (formSignUp) {
    formSignUp.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("regNombre").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        let esValido = true;

        if (!soloLetras(nombre)) {
            alert("El nombre solo debe contener letras.");
            esValido = false;
        }

        if (esValido && !validarCorreo(email)) {
            alert("El correo electrónico no tiene un formato válido.");
            esValido = false;
        }

        if (esValido && !validarPassword(password)) {
            alert("La contraseña no es válida.");
            esValido = false;
        }

        if (esValido) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            document.getElementById("formSignUp").reset();
            container.classList.remove("toggle");
        }
    });
}
