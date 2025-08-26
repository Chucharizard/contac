// =========================================
// ANIMACIONES Y EFECTOS VISUALES
// =========================================

const Animations = {
  // Inicializar todas las animaciones
  init() {
    this.initScrollAnimations();
    this.initTypingEffect();
    this.initCounterAnimations();
    this.initProgressBars();
    this.initParallaxEffects();
  },

  // Animaciones de scroll reveal
  initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    
    if (scrollElements.length === 0) return;

    const scrollObserver = Utils.createScrollObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    scrollElements.forEach(el => scrollObserver.observe(el));
  },

  // Efecto de typing para el texto del hero
  initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || !window.portfolioData) return;

    const roles = window.portfolioData.roles;
    const config = window.portfolioData.config;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = config.typingSpeed;
      
      if (isDeleting) {
        delay = config.typingSpeed / 2;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        delay = config.typingDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(typeEffect, delay);
    }

    typeEffect();
  },

  // Animaciones de contadores
  initCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');
    
    if (counters.length === 0) return;

    const counterObserver = Utils.createScrollObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          
          Utils.animateNumber(counter, 0, target, 2000);
          counterObserver.unobserve(counter);
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));
  },

  // Animaciones de barras de progreso
  initProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (progressBars.length === 0) return;

    const progressObserver = Utils.createScrollObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.dataset.percentage;
          
          setTimeout(() => {
            progressBar.style.width = percentage + '%';
          }, 200);
          
          progressObserver.unobserve(progressBar);
        }
      });
    });

    progressBars.forEach(bar => progressObserver.observe(bar));
  },

  // Efectos parallax simples
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;

    const handleParallax = Utils.throttle(() => {
      const scrolled = Utils.getScrollPosition();
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', handleParallax);
  },

  // Animación de entrada para cards de proyectos
  animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  },

  // Animación de filtro de proyectos
  animateFilterTransition(hidingElements, showingElements) {
    // Primero ocultamos los elementos que no coinciden
    hidingElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('hiding');
      }, index * 50);
    });

    // Después mostramos los elementos que coinciden
    setTimeout(() => {
      hidingElements.forEach(element => {
        element.classList.add('hidden');
        element.classList.remove('hiding');
      });

      showingElements.forEach((element, index) => {
        element.classList.remove('hidden');
        setTimeout(() => {
          element.classList.add('showing');
          setTimeout(() => {
            element.classList.remove('showing');
          }, 500);
        }, index * 100);
      });
    }, hidingElements.length * 50 + 200);
  },

  // Efecto de hover para las cards
  initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = 'var(--shadow-xl)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-lg)';
      });
    });
  },

  // Animación de loading inicial
  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    // Simular carga
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // Remover del DOM después de la transición
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1500);
  },

  // Animación del navbar al hacer scroll
  initNavbarAnimation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollTop = 0;
    let isScrollingDown = false;

    const handleNavbarScroll = Utils.throttle(() => {
      const scrollTop = Utils.getScrollPosition();
      
      // Añadir clase cuando se hace scroll
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Detectar dirección del scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (!isScrollingDown) {
          navbar.style.transform = 'translateY(-100%)';
          isScrollingDown = true;
        }
      } else {
        // Scrolling up
        if (isScrollingDown) {
          navbar.style.transform = 'translateY(0)';
          isScrollingDown = false;
        }
      }

      lastScrollTop = scrollTop;
    }, 16);

    window.addEventListener('scroll', handleNavbarScroll);
  },

  // Animación de partículas flotantes
  createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición aleatoria
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
      
      particlesContainer.appendChild(particle);

      // Remover después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 12000);
    }

    // Crear partículas cada cierto tiempo
    setInterval(createParticle, 2000);
  },

  // Animación del botón "Back to Top"
  initBackToTopAnimation() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    const handleBackToTopVisibility = Utils.throttle(() => {
      const scrollPosition = Utils.getScrollPosition();
      
      if (scrollPosition > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 16);

    window.addEventListener('scroll', handleBackToTopVisibility);

    // Click handler con animación
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  // Efecto de ripple en botones
  initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Añadir keyframe para el ripple
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

// Exportar animaciones
if (typeof window !== 'undefined') {
  window.Animations = Animations;
}
