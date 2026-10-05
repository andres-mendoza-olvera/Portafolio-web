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

    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');

            [nombre, email, mensaje].forEach(el => el.style.borderColor = 'var(--color-borde)');

            if (nombre.value.trim() === '') {
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