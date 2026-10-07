document.addEventListener("DOMContentLoaded", function() {
    // 1. Funcionalidad del Sidebar Toggle
    const sidebarCollapse = document.getElementById("sidebarCollapse");
    const sidebar = document.getElementById("sidebar");

    if (sidebarCollapse && sidebar) {
        sidebarCollapse.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }

    // 2. Mostrar datos del usuario autenticado en Navbar
    const userNameDisplay = document.getElementById("userNameDisplay");
    // Simulamos la obtención del usuario desde localStorage (guardado previamente en login.js)
    const loggedUser = localStorage.getItem("usuarioActual") || "Administrador Invitado";
    if (userNameDisplay) {
        userNameDisplay.textContent = loggedUser;
    }

    // 3. Navegación del Sidebar (Menús)
    const menuCaptura = document.getElementById("menuCaptura");
    const menuAlumno = document.getElementById("menuAlumno");
    const capturaUsuarioSeccion = document.getElementById("capturaUsuarioSeccion");
    const capturaAlumnoSeccion = document.getElementById("capturaAlumnoSeccion");
    const welcomeSeccion = document.getElementById("welcomeSeccion");

    function ocultarTodasLasSecciones() {
        if (welcomeSeccion) welcomeSeccion.classList.add("d-none");
        if (capturaUsuarioSeccion) capturaUsuarioSeccion.classList.add("d-none");
        if (capturaAlumnoSeccion) capturaAlumnoSeccion.classList.add("d-none");
    }

    if (menuCaptura) {
        menuCaptura.addEventListener("click", function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            if (capturaUsuarioSeccion) capturaUsuarioSeccion.classList.remove("d-none");
        });
    }

    if (menuAlumno) {
        menuAlumno.addEventListener("click", function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            if (capturaAlumnoSeccion) capturaAlumnoSeccion.classList.remove("d-none");
        });
    }

    // 4. Lógica Formulario de Usuario (Validaciones con utileria.js)
    const btnGuardarUsuario = document.getElementById("btnGuardarUsuario");
    if (btnGuardarUsuario) {
        btnGuardarUsuario.addEventListener("click", function() {
            const correoInput = document.getElementById("correoUsuario");
            const passInput = document.getElementById("passUsuario");
            
            const correo = correoInput.value;
            const pass = passInput.value;

            let esValido = true;

            // Validación de Correo usando utileria.js
            if (typeof validarCorreo === 'function') {
                if (!validarCorreo(correo)) {
                    correoInput.classList.add("is-invalid");
                    correoInput.classList.remove("is-valid");
                    esValido = false;
                } else {
                    correoInput.classList.remove("is-invalid");
                    correoInput.classList.add("is-valid");
                }
            } else {
                console.warn("La función validarCorreo no está definida en utileria.js");
            }

            // Validación de Password usando utileria.js
            if (typeof validarPassword === 'function') {
                if (!validarPassword(pass)) {
                    passInput.classList.add("is-invalid");
                    passInput.classList.remove("is-valid");
                    esValido = false;
                } else {
                    passInput.classList.remove("is-invalid");
                    passInput.classList.add("is-valid");
                }
            } else {
                console.warn("La función validarPassword no está definida en utileria.js");
            }

            if (esValido) {
                // Simulación de guardado exitoso
                alert("Los datos del usuario han sido validados y guardados correctamente.");
                // Opcional: limpiar formulario
                document.getElementById("formUsuario").reset();
                correoInput.classList.remove("is-valid");
                passInput.classList.remove("is-valid");
            }
        });
    }

    // 5. Lógica Formulario de Alumno y Modal
    const btnGuardarAlumno = document.getElementById("btnGuardarAlumno");
    if (btnGuardarAlumno) {
        btnGuardarAlumno.addEventListener("click", function() {
            const numControlInput = document.getElementById("numControl");
            const edadInput = document.getElementById("edadAlumno");
            
            const numControl = numControlInput.value;
            const edad = parseInt(edadInput.value);

            let esValido = true;

            // Validación: Número de control debe tener 6 dígitos
            const regexNumControl = /^\d{6}$/;
            if (!regexNumControl.test(numControl)) {
                numControlInput.classList.add("is-invalid");
                numControlInput.classList.remove("is-valid");
                esValido = false;
            } else {
                numControlInput.classList.remove("is-invalid");
                numControlInput.classList.add("is-valid");
            }

            // Validación básica de que la edad esté ingresada
            if (isNaN(edad) || edad <= 0) {
                edadInput.classList.add("is-invalid");
                esValido = false;
            } else {
                edadInput.classList.remove("is-invalid");
            }

            // Si es válido, disparamos el Modal
            if (esValido) {
                const modalElement = document.getElementById('modalEdad');
                const modal = new bootstrap.Modal(modalElement);
                const modalIcon = document.getElementById("modalIcon");
                const modalMensaje = document.getElementById("modalMensaje");

                // Lógica de mayoría de edad
                if (edad >= 18) {
                    modalIcon.innerHTML = '<i class="fas fa-check-circle text-success"></i>';
                    modalMensaje.textContent = "El alumno es Mayor de Edad";
                    modalMensaje.className = "fw-bold mb-2 text-success";
                } else {
                    modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-warning"></i>';
                    modalMensaje.textContent = "El alumno es Menor de Edad";
                    modalMensaje.className = "fw-bold mb-2 text-warning";
                }

                modal.show();
            }
        });
    }

    // 6. Cerrar Sesión
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function(e) {
            // Limpiamos el localStorage simulando cerrar sesión
            localStorage.removeItem("usuarioActual");
            // No hacemos e.preventDefault() para que el href="login.html" funcione y redirija
        });
    }
});
