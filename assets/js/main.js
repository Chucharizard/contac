// =========================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// =========================================

class Portfolio {
  constructor() {
    this.currentFilter = 'all';
    this.theme = Utils.getLocalStorage('theme', Utils.getSystemTheme());
    this.projects = [];
    
    this.init();
  }

  // Inicializar la aplicación
  init() {
    this.setTheme(this.theme);
    this.bindEvents();
    this.loadProjects();
    this.loadSkills();
    this.initComponents();
    
    // Inicializar animaciones cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initAnimations();
      });
    } else {
      this.initAnimations();
    }
  }

  // Vincular eventos
  bindEvents() {
    // Navegación
    this.initNavigation();
    
    // Tema
    this.initThemeToggle();
    
    // Formulario de contacto
    this.initContactForm();
    
    // Filtros de proyectos
    this.initProjectFilters();
    
    // Eventos de scroll
    this.initScrollEvents();
  }

  // Inicializar navegación
  initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle móvil
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
    }

    // Navegación suave
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70; // Altura del navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Cerrar menú móvil
          if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
          }
          
          // Actualizar enlace activo
          this.updateActiveNavLink(link);
        }
      });
    });
  }

  // Actualizar enlace activo en la navegación
  updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  // Inicializar toggle de tema
  initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Escuchar cambios en el tema del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!Utils.getLocalStorage('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Cambiar tema
  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    Utils.setLocalStorage('theme', newTheme);
  }

  // Establecer tema
  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
  }

  // Inicializar formulario de contacto
  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmit(contactForm);
      });

      // Mejorar labels flotantes
      const formInputs = contactForm.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });

        // Verificar si ya tiene valor al cargar
        if (input.value) {
          input.parentElement.classList.add('focused');
        }
      });
    }
  }

  // Manejar envío del formulario
  handleContactSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validación básica
    if (!data.name || !data.email || !data.message) {
      Utils.showToast('Por favor, completa todos los campos requeridos', 'error');
      return;
    }

    if (!Utils.isValidEmail(data.email)) {
      Utils.showToast('Por favor, ingresa un email válido', 'error');
      return;
    }

    // Preparar mensaje para WhatsApp
    const whatsappMessage = this.createWhatsAppMessage(data);
    
    // Mostrar mensaje de preparación
    Utils.showToast('Preparando mensaje para WhatsApp...', 'info');
    
    setTimeout(() => {
      // Enviar a WhatsApp
      this.sendToWhatsApp(whatsappMessage);
      
      // Limpiar formulario
      form.reset();
      
      // Remover clases de focus
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused');
      });
      
      Utils.showToast('¡Redirigiendo a WhatsApp! 📱', 'success');
    }, 1000);
  }

  // Crear mensaje formateado para WhatsApp
  createWhatsAppMessage(data) {
    const message = `🚀 *NUEVO MENSAJE DE PORTAFOLIO* 🚀

👤 *Nombre:* ${data.name}
📧 *Email:* ${data.email}
📝 *Asunto:* ${data.subject || 'Sin asunto'}

💬 *Mensaje:*
${data.message}

---
_Enviado desde el portafolio web_
_Fecha: ${new Date().toLocaleString('es-ES')}_`;

    return encodeURIComponent(message);
  }

  // Enviar mensaje a WhatsApp
  sendToWhatsApp(message) {
    // Tu número de WhatsApp (sin el +)
    const phoneNumber = '59174402990'; // Cambia por tu número real
    
    // URL de WhatsApp Web
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Abrir WhatsApp Web en nueva pestaña
    window.open(whatsappURL, '_blank');
  }

  // Cargar proyectos
  loadProjects() {
    if (!window.portfolioData) return;
    
    this.projects = window.portfolioData.projects;
    this.renderProjects();
  }

  // Cargar habilidades
  loadSkills() {
    if (!window.portfolioData || !window.portfolioData.skills) return;
    
    this.renderSkills(window.portfolioData.skills);
  }

  // Renderizar habilidades
  renderSkills(skillsData) {
    const skillsContainer = document.getElementById('skills-categories');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = '';

    // Mapear nombres de categorías
    const categoryNames = {
      frontend: 'Frontend',
      backend: 'Backend', 
      tools: 'Herramientas'
    };

    // Renderizar cada categoría
    Object.entries(skillsData).forEach(([category, skills]) => {
      const categoryElement = this.createSkillCategory(category, categoryNames[category] || category, skills);
      skillsContainer.appendChild(categoryElement);
    });

    // Animar barras de progreso después de renderizar
    setTimeout(() => {
      this.animateSkillBars();
    }, 500);
  }

  // Crear categoría de habilidades
  createSkillCategory(categoryKey, categoryName, skills) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';

    // Dividir skills en visibles e inicialmente ocultas
    const visibleSkills = skills.slice(0, 3);
    const hiddenSkills = skills.slice(3);

    // Crear HTML para skills visibles
    const visibleSkillsHTML = visibleSkills.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.percentage}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="${skill.percentage}"></div>
        </div>
      </div>
    `).join('');

    // Crear HTML para skills ocultas
    const hiddenSkillsHTML = hiddenSkills.length > 0 ? hiddenSkills.map(skill => `
      <div class="skill-item skill-hidden">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.percentage}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="${skill.percentage}"></div>
        </div>
      </div>
    `).join('') : '';

    // Crear botón "Ver más" solo si hay skills ocultas
    const showMoreButton = hiddenSkills.length > 0 ? `
      <button class="show-more-btn" data-category="${categoryKey}">
        <span class="btn-text">Ver más (${hiddenSkills.length})</span>
        <i class="fas fa-chevron-down btn-icon"></i>
      </button>
    ` : '';

    categoryDiv.innerHTML = `
      <h3>${categoryName}</h3>
      <div class="skills-list">
        ${visibleSkillsHTML}
        ${hiddenSkillsHTML}
      </div>
      ${showMoreButton}
    `;

    // Agregar evento al botón "Ver más"
    if (hiddenSkills.length > 0) {
      const button = categoryDiv.querySelector('.show-more-btn');
      button.addEventListener('click', () => this.toggleSkillsVisibility(categoryDiv, button, hiddenSkills.length));
    }

    return categoryDiv;
  }

  // Alternar visibilidad de skills
  toggleSkillsVisibility(categoryDiv, button, hiddenCount) {
    const hiddenSkills = categoryDiv.querySelectorAll('.skill-hidden');
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('.btn-icon');
    const isExpanded = button.classList.contains('expanded');

    if (isExpanded) {
      // Colapsar
      hiddenSkills.forEach((skill, index) => {
        setTimeout(() => {
          skill.style.opacity = '0';
          skill.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            skill.style.display = 'none';
          }, 300);
        }, index * 50);
      });

      btnText.textContent = `Ver más (${hiddenCount})`;
      btnIcon.style.transform = 'rotate(0deg)';
      button.classList.remove('expanded');
    } else {
      // Expandir
      hiddenSkills.forEach((skill, index) => {
        skill.style.display = 'block';
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          skill.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          skill.style.opacity = '1';
          skill.style.transform = 'translateY(0)';
        }, index * 50 + 100);
      });

      btnText.textContent = 'Ver menos';
      btnIcon.style.transform = 'rotate(180deg)';
      button.classList.add('expanded');

      // Animar las nuevas barras de progreso
      setTimeout(() => {
        this.animateNewSkillBars(hiddenSkills);
      }, 400);
    }
  }

  // Animar barras de progreso de skills recién mostradas
  animateNewSkillBars(skillElements) {
    const newBars = Array.from(skillElements).map(skill => skill.querySelector('.skill-progress'));
    
    newBars.forEach((bar, index) => {
      const percentage = bar.getAttribute('data-percentage');
      
      setTimeout(() => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
          bar.style.width = `${percentage}%`;
        });
      }, index * 100);
    });
  }

  // Animar barras de progreso de habilidades
  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const percentage = bar.getAttribute('data-percentage');
      
      setTimeout(() => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
          bar.style.width = `${percentage}%`;
        });
      }, index * 100); // Escalonar animaciones
    });
  }

  // Renderizar proyectos
  renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const filteredProjects = filter === 'all' 
      ? this.projects 
      : this.projects.filter(project => project.category === filter);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });

    // Animar cards después de renderizar
    setTimeout(() => {
      Animations.animateProjectCards();
    }, 100);
  }

  // Crear card de proyecto
  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card filter-item scroll-reveal';
    card.setAttribute('data-category', project.category);

    const statusBadge = project.status === 'completed' 
      ? '<span class="project-status completed">Completado</span>'
      : '<span class="project-status in-progress">En Progreso</span>';

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image" 
           onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5Ij5Qcm95ZWN0bzwvdGV4dD4KICA8L3N2Zz4='">
      
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          ${statusBadge}
        </div>
        
        <p class="project-description">${project.description}</p>
        
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        
        <div class="project-links">
          ${project.links.demo ? `<a href="${project.links.demo}" class="project-link primary" target="_blank">
            <i class="fas fa-eye"></i> Ver Demo
          </a>` : ''}
          
          ${project.links.github ? `<a href="${project.links.github}" class="project-link secondary" target="_blank">
            <i class="fab fa-github"></i> Código
          </a>` : ''}
          
          ${project.links.live ? `<a href="${project.links.live}" class="project-link primary" target="_blank">
            <i class="fas fa-external-link-alt"></i> Ver Live
          </a>` : ''}
        </div>
      </div>
    `;

    return card;
  }

  // Inicializar filtros de proyectos
  initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filtrar proyectos con animación
        this.filterProjects(filter);
      });
    });
  }

  // Filtrar proyectos con animación
  filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    const hidingElements = [];
    const showingElements = [];

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (filter === 'all' || cardCategory === filter) {
        showingElements.push(card);
      } else {
        hidingElements.push(card);
      }
    });

    Animations.animateFilterTransition(hidingElements, showingElements);
    this.currentFilter = filter;
  }

  // Inicializar eventos de scroll
  initScrollEvents() {
    // Actualizar navegación activa basada en scroll
    const sections = document.querySelectorAll('section[id]');
    
    const handleScrollNav = Utils.throttle(() => {
      const scrollPosition = Utils.getScrollPosition() + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (activeLink && !activeLink.classList.contains('active')) {
            this.updateActiveNavLink(activeLink);
          }
        }
      });
    }, 100);

    window.addEventListener('scroll', handleScrollNav);
  }

  // Inicializar componentes
  initComponents() {
    // Precargar imágenes importantes
    this.preloadImages();
    
    // Inicializar lazy loading
    Utils.lazyLoadImages();
    
    // Cargar datos en elementos
    this.populatePersonalInfo();
  }

  // Poblar información personal
  populatePersonalInfo() {
    if (!window.portfolioData) return;

    const data = window.portfolioData.personal;
    
    // Actualizar stats
    const statNumbers = document.querySelectorAll('[data-target]');
    statNumbers.forEach(stat => {
      const target = stat.getAttribute('data-target');
      if (data[target]) {
        stat.setAttribute('data-target', data[target]);
      }
    });
  }

  // Precargar imágenes importantes
  async preloadImages() {
    const importantImages = [
      'assets/images/profile.webp',
      ...this.projects.slice(0, 3).map(p => p.image)
    ];

    await Utils.preloadImages(importantImages);
  }

  // Inicializar todas las animaciones
  initAnimations() {
    Animations.init();
    Animations.showLoadingScreen();
    Animations.initNavbarAnimation();
    Animations.initCardHoverEffects();
    Animations.initBackToTopAnimation();
    Animations.initRippleEffect();
    Animations.createFloatingParticles();
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new Portfolio();
});

// Manejar errores globales
window.addEventListener('error', (e) => {
  console.error('Error global:', e.error);
  Utils.showToast('Ha ocurrido un error inesperado', 'error');
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
