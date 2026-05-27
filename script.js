document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. EFECTO SCROLL EN HEADER
       ========================================== */
    const header = document.getElementById('header');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();


    /* ==========================================
       2. MENÚ RESPONSIVE (HAMBURGUESA)
       ========================================== */
    const navToggle = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================
       3. INTERSECTION OBSERVER (SCROLL REVEAL)
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    /* ==========================================
       4. SEGUIMIENTO DE CURSOR (JUEGO DE LUCES)
       ========================================== */
    const glowPointer = document.getElementById('glow-pointer');
    
    if (glowPointer) {
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            glowPointer.style.display = 'block';
            
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let pointerX = mouseX;
            let pointerY = mouseY;
            
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            const animatePointer = () => {
                const ease = 0.06;
                pointerX += (mouseX - pointerX) * ease;
                pointerY += (mouseY - pointerY) * ease;
                
                glowPointer.style.left = `${pointerX}px`;
                glowPointer.style.top = `${pointerY}px`;
                
                requestAnimationFrame(animatePointer);
            };
            
            animatePointer();
        }
    }

});
