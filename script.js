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
       4. CARRUSEL DE TESTIMONIOS (SLIDER)
       ========================================== */
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prev-testimonio-btn');
    const nextBtn = document.getElementById('next-testimonio-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    const dots = Array.from(dotsContainer.children);
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    const updateSlidePosition = (index) => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        
        const amountToMove = -currentIndex * 100;
        track.style.transform = `translateX(${amountToMove / 3}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };
    
    const nextSlide = () => {
        updateSlidePosition(currentIndex + 1);
    };
    
    const prevSlide = () => {
        updateSlidePosition(currentIndex - 1);
    };
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlidePosition(index);
            resetAutoSlide();
        });
    });
    
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 7000);
    };
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };
    
    startAutoSlide();


    /* ==========================================
       5. SEGUIMIENTO DE CURSOR (JUEGO DE LUCES)
       ========================================== */
    const glowPointer = document.getElementById('glow-pointer');
    
    if (glowPointer) {
        // Solo habilitar foco móvil si no es dispositivo táctil y la pantalla es amplia
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
            
            // Interpolación lineal (LERP) para suavizado de la luz
            const animatePointer = () => {
                const ease = 0.06; // Menor valor = más retraso y suavizado
                pointerX += (mouseX - pointerX) * ease;
                pointerY += (mouseY - pointerY) * ease;
                
                glowPointer.style.left = `${pointerX}px`;
                glowPointer.style.top = `${pointerY}px`;
                
                requestAnimationFrame(animatePointer);
            };
            
            animatePointer();
        }
    }


    /* ==========================================
       6. SIMULACIÓN DE FORMULARIO DE CONTACTO
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando intención...';
        formStatus.className = 'form-status-message';
        formStatus.style.display = 'none';
        
        setTimeout(() => {
            const name = document.getElementById('form-name').value;
            
            formStatus.textContent = `¡Muchas gracias, ${name}! Tu intención ha sido enviada con éxito. Mer se contactará con vos a la brevedad por WhatsApp o correo para conversar y coordinar tu ingreso a la ronda.`;
            formStatus.classList.add('success');
            
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Intención';
            
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.classList.remove('success');
            }, 8000);
            
        }, 1500);
    });

});

/* ==========================================
   7. FUNCIÓN GLOBAL SELECCIÓN DE TALLER
   ========================================== */
function selectTaller(tallerName) {
    const select = document.getElementById('form-taller');
    if (select) {
        select.value = tallerName;
    }
}
