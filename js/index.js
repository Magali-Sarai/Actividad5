document.addEventListener("DOMContentLoaded", function() {
    // 1. Funcionalidad del Sidebar
    const sidebarCollapse = document.getElementById("sidebarCollapse");
    const sidebar = document.getElementById("sidebar");

    if (sidebarCollapse && sidebar) {
        sidebarCollapse.addEventListener("click", function() {
            sidebar.classList.toggle("active");
        });
    }

    // 2. Mostrar datos del usuario autenticado
    const userNameDisplay = document.getElementById("userNameDisplay");
    if (userNameDisplay) {
        userNameDisplay.textContent = localStorage.getItem("usuarioActual") || "Administrador Invitado";
    }

    // 3. Navegación del Sidebar
    const menuCaptura = document.getElementById("menuCaptura");
    const menuAlumno = document.getElementById("menuAlumno");
    const capturaUsuarioSeccion = document.getElementById("capturaUsuarioSeccion");
    const capturaAlumnoSeccion = document.getElementById("capturaAlumnoSeccion");
    const welcomeSeccion = document.getElementById("welcomeSeccion");

    function ocultarSecciones() {
        if (welcomeSeccion) welcomeSeccion.classList.add("d-none");
        if (capturaUsuarioSeccion) capturaUsuarioSeccion.classList.add("d-none");
        if (capturaAlumnoSeccion) capturaAlumnoSeccion.classList.add("d-none");
    }

    if (menuCaptura) {
        menuCaptura.addEventListener("click", function(e) {
            e.preventDefault();
            ocultarSecciones();
            if (capturaUsuarioSeccion) capturaUsuarioSeccion.classList.remove("d-none");
        });
    }

    if (menuAlumno) {
        menuAlumno.addEventListener("click", function(e) {
            e.preventDefault();
            ocultarSecciones();
            if (capturaAlumnoSeccion) capturaAlumnoSeccion.classList.remove("d-none");
        });
    }

    // 4. Lógica Formulario de Usuario
    const btnGuardarUsuario = document.getElementById("btnGuardarUsuario");
    if (btnGuardarUsuario) {
        btnGuardarUsuario.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            const nombreInput = document.getElementById("nombreUsuario");
            const correoInput = document.getElementById("correoUsuario");
            const passInput = document.getElementById("passUsuario");
            let esValido = true;

            // Validación de Nombre usando "soloLetras" (Nombre exacto del CDN)
            if (nombreInput) {
                const nombreValido = typeof soloLetras === 'function' ? soloLetras(nombreInput.value) : false;
                nombreInput.classList.toggle("is-valid", nombreValido);
                nombreInput.classList.toggle("is-invalid", !nombreValido);
                if (!nombreValido) esValido = false;
            }

            // Validación de Correo Institucional
            if (correoInput) {
                const correoValido = typeof validarCorreoInstitucional === 'function' ? validarCorreoInstitucional(correoInput.value) : false;
                correoInput.classList.toggle("is-valid", correoValido);
                correoInput.classList.toggle("is-invalid", !correoValido);
                if (!correoValido) esValido = false;
            }

            // Validación de Password
            if (passInput) {
                const passValido = typeof validarPassword === 'function' ? validarPassword(passInput.value) : false;
                passInput.classList.toggle("is-valid", passValido);
                passInput.classList.toggle("is-invalid", !passValido);
                if (!passValido) esValido = false;
            }

            if (esValido) {
                Swal.fire({
                    title: 'Guardado!',
                    text: 'Los datos del usuario han sido validados y guardados correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                document.getElementById("formUsuario").reset();
                if(nombreInput) nombreInput.classList.remove("is-valid");
                if(correoInput) correoInput.classList.remove("is-valid");
                if(passInput) passInput.classList.remove("is-valid");
            }
        });
    }

    // 5. Lógica Formulario de Alumno y Modal
    const btnGuardarAlumno = document.getElementById("btnGuardarAlumno");
    if (btnGuardarAlumno) {
        btnGuardarAlumno.addEventListener("click", function(e) {
            e.preventDefault();
            
            const numControlInput = document.getElementById("numControl");
            const edadInput = document.getElementById("edadAlumno");
            
            let esValido = true;
            let edad = 0;

            // Validación: Número de control (8 dígitos y año de prefijo <= 23 o >= 50, según tu CDN)
            if (numControlInput) {
                const numControl = numControlInput.value;
                const numControlValido = typeof validarNumeroControl === 'function' ? validarNumeroControl(numControl) : false;
                
                numControlInput.classList.toggle("is-valid", numControlValido);
                numControlInput.classList.toggle("is-invalid", !numControlValido);
                if (!numControlValido) esValido = false;
            }

            // Validación básica de que la edad no esté vacía o sea texto
            if (edadInput) {
                edad = parseInt(edadInput.value);
                if (isNaN(edad) || edad <= 0) {
                    edadInput.classList.add("is-invalid");
                    edadInput.classList.remove("is-valid");
                    esValido = false;
                } else {
                    edadInput.classList.remove("is-invalid");
                    edadInput.classList.add("is-valid");
                }
            }

            // Si los campos requeridos están llenos, ABRIR MODAL
            if (esValido) {
                const modalElement = document.getElementById('modalEdad');
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    const modalIcon = document.getElementById("modalIcon");
                    const modalMensaje = document.getElementById("modalMensaje");
                    
                    // Lógica del Modal (Validamos directo el número porque tu CDN espera una fecha)
                    const esMayor = edad >= 18;

                    if (esMayor) {
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
            }
        });
    }

    // 6. Cerrar Sesión
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function() {
            localStorage.removeItem("usuarioActual");
        });
    }
});