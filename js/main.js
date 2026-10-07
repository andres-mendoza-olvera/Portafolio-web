document.addEventListener('DOMContentLoaded', () => {
    
    const toggle = document.querySelector('#dark-mode-toggle');

    const temaGuardado = localStorage.getItem('theme');
    if (temaGuardado === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (temaGuardado === 'light') {
        document.documentElement.classList.remove('dark');
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme',
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
    }

    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('activo');
        });
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (navMenu.classList.contains('activo')) {
                    navMenu.classList.remove('activo');
                }
            }
        });
    });

    const formulario = document.getElementById('form-contacto');
    const mensajeEstado = document.getElementById('mensaje-estado');

    // Bloquear caracteres no permitidos en el campo nombre en tiempo real
    const inputNombre = document.getElementById('nombre');
    if (inputNombre) {
        inputNombre.addEventListener('keydown', function(e) {
            // Permitir teclas de control: retroceso, supr, flechas, tab, enter, etc.
            const teclaControl = [
                'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
                'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Home', 'End'
            ].includes(e.key);

            if (teclaControl) return;

            // Bloquear si el carácter no es letra (incluye tildes, ñ) ni espacio
            const soloLetras = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]$/;
            if (!soloLetras.test(e.key)) {
                e.preventDefault();
            }
        });

        // También limpiar si el usuario pega texto con caracteres inválidos
        inputNombre.addEventListener('paste', function(e) {
            e.preventDefault();
            const pegado = (e.clipboardData || window.clipboardData).getData('text');
            const limpio = pegado.replace(/[^A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
            document.execCommand('insertText', false, limpio);
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');

            [nombre, email, mensaje].forEach(el => el.style.borderColor = 'var(--color-borde)');

            const soloLetras = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/;
            if (nombre.value.trim() === '' || !soloLetras.test(nombre.value)) {
                nombre.style.borderColor = '#ef4444';
                valido = false;
            }
            if (email.value.trim() === '' || !email.value.includes('@')) {
                email.style.borderColor = '#ef4444';
                valido = false;
            }
            if (mensaje.value.trim() === '') {
                mensaje.style.borderColor = '#ef4444';
                valido = false;
            }

            if (!valido) {
                mensajeEstado.textContent = 'Por favor, completa los campos en rojo.';
                mensajeEstado.style.color = '#ef4444';
                return;
            }

            mensajeEstado.textContent = 'Enviando mensaje...';
            mensajeEstado.style.color = 'var(--color-acento)';

            setTimeout(() => {
                mensajeEstado.textContent = '¡Mensaje enviado con éxito!';
                mensajeEstado.style.color = '#22c55e';
                formulario.reset();
            }, 1500);
        });
    }
});