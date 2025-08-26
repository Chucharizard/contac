// =========================================
// DATOS DEL PORTAFOLIO - CHUCHARIZARD
// =========================================

const portfolioData = {
  // Información personal
  personal: {
    name: "Jesús Arancibia",
    nickname: "Chucharizard",
    title: "Desarrollador Full Stack",
    email: "arancibiajesus46@gmail.com",
    phone: "+591 74402990",
    location: "Yotala, Bolivia",
    university: "UNIVALLE",
    universityUrl: "https://www.univalle.edu/",
    semester: "4to Semestre",
    career: "Ingeniería de Sistemas",
    age: 69,
    experience: 3,
    completedProjects: 7,
    technologies: 16,
    dedication: 100
  },

  // Roles para el efecto de typing
  roles: [
    "Desarrollador Full Stack",
    "Estudiante UNIVALLE", 
    "Desarrollador Python",
    "Desarrollador Web",
    "Freelancer"
  ],

  // Habilidades técnicas
  skills: {
    frontend: [
      { name: "HTML5 & CSS3", percentage: 90 },
      { name: "JavaScript (ES6+)", percentage: 85 },
      { name: "Bootstrap", percentage: 95 },
      { name: "Astro", percentage: 75 },
      { name: "React", percentage: 70 },
      { name: "Responsive Design", percentage: 88 }
    ],
    backend: [
      { name: "Python", percentage: 85 },
      { name: "Flask", percentage: 80 },
      { name: "FastAPI", percentage: 75 },
      { name: "SQLite", percentage: 75 },
      { name: "Supabase", percentage: 70 },
      { name: "Firebase Auth", percentage: 75 },
      { name: "API REST", percentage: 75 },
      { name: "MySQL", percentage: 65 }
    ],
    tools: [
      { name: "Git & GitHub", percentage: 80 },
      { name: "VS Code", percentage: 95 },
      { name: "Linux/Windows", percentage: 85 },
      { name: "Figma", percentage: 60 },
      { name: "Postman", percentage: 70 },
      { name: "Docker", percentage: 55 }
    ]
  },

  // Proyectos
  projects: [
    // Proyectos Universitarios
    {
      id: 1,
      title: "Gestión de Ventas con Flask",
      description: "Sistema completo de punto de venta desarrollado con Flask y SQLite, incluyendo gestión de inventario, ventas, usuarios y reportes detallados.",
      image: "assets/images/projects/tiendita.webp",
      category: "university",
      tags: ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
      technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "Bootstrap", "JavaScript"],
      features: [
        "Gestión de inventario en tiempo real",
        "Sistema de roles y permisos",
        "Generación de reportes",
        "Control de turnos",
        "Respaldos automáticos"
      ],
      links: {
        demo: "legacy/tiendita.html",
        github: "https://github.com/Chucharizard/flask",
        live: null
      },
      status: "completed",
      date: "2024",
      highlights: [
        "Implementación de sistema de autenticación",
        "Diseño responsive",
        "Base de datos normalizada"
      ]
    },
    {
      id: 2,
      title: "Tienda de Cartas Pokémon (Pokecards)",
      description: "E-commerce interactivo para la venta de cartas Pokémon con catálogo dinámico, carrito de compras y diseño responsive.",
      image: "assets/images/projects/pokemon.webp",
      category: "university",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      features: [
        "Catálogo interactivo",
        "Carrito de compras",
        "Filtros por tipo",
        "Animaciones CSS",
        "Diseño responsive"
      ],
      links: {
        demo: "https://chucharizard.github.io/ProyectoWEB1/index.html",
        github: "https://github.com/Chucharizard/ProyectoWEB1",
        live: "https://chucharizard.github.io/ProyectoWEB1/index.html"
      },
      status: "completed",
      date: "2023"
    },

    // Proyectos Freelance
    {
      id: 3,
      title: "Sistema para Minimarket",
      description: "Aplicación web completa para la gestión de un minimarket con inventario, ventas y reportes administrativos.",
      image: "assets/images/projects/minimarket.webp",
      category: "freelance",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      features: [
        "Gestión de productos",
        "Control de inventario",
        "Sistema de ventas",
        "Reportes detallados",
        "Interfaz intuitiva"
      ],
      links: {
        demo: "legacy/tiendita.html",
        github: "#",
        live: null
      },
      status: "completed",
      date: "2024"
    },
    {
      id: 4,
      title: "Casa de Empeño Digital",
      description: "Sistema para gestión de préstamos y empeños con control de vencimientos, gestión de clientes y artículos desarrollado con Flask.",
      image: "assets/images/projects/casaemp.webp",
      category: "freelance",
      tags: ["Python", "Flask", "SQLite", "Bootstrap"],
      technologies: ["Python", "Flask", "SQLite", "HTML", "CSS", "Bootstrap"],
      features: [
        "Gestión de préstamos",
        "Control de vencimientos", 
        "Administración de clientes",
        "Registro de artículos",
        "Reportes financieros"
      ],
      links: {
        demo: "legacy/casaemp.html",
        github: "https://github.com/Chucharizard/CasaDeEmpenho",
        live: null
      },
      status: "completed",
      date: "2024"
    },
    // Proyectos Personales
    {
      id: 5,
      title: "Portfolio Personal V1",
      description: "Primera versión de mi portafolio personal con diseño creativo, animaciones SVG y efectos modernos.",
      image: "legacy/images/logo.webp",
      category: "personal",
      tags: ["HTML", "CSS", "JavaScript"],
      technologies: ["HTML5", "CSS3", "JavaScript", "SVG"],
      features: [
        "Animaciones SVG personalizadas",
        "Efectos de loading creativos",
        "Diseño glassmorphism",
        "Totalmente responsive",
        "Optimizado para performance"
      ],
      links: {
        demo: "legacy/portfolio-v1.html",
        github: "https://github.com/Chucharizard",
        live: null
      },
      status: "completed",
      date: "2022"
    },
    {
      id: 6,
      title: "Minecraft Downloads Platform",
      description: "Plataforma web para descargas de Minecraft en cualquier versión con autenticación de Google y base de datos en tiempo real.",
      image: "assets/images/projects/mcProject.webp",
      category: "personal",
      tags: ["Astro", "Supabase", "Firebase", "Authentication"],
      technologies: ["Astro", "Supabase", "Firebase Auth", "JavaScript", "CSS"],
      features: [
        "Autenticación con Google",
        "Base de datos en tiempo real",
        "Descargas de múltiples versiones",
        "Interfaz moderna y responsive",
        "Gestión de usuarios"
      ],
      links: {
        demo: "https://maincrafirebase.vercel.app",
        github: "https://github.com/Chucharizard",
        live: "https://maincrafirebase.vercel.app"
      },
      status: "completed",
      date: "2024"
    },
    {
      id: 7,
      title: "Portfolio Moderno V2",
      description: "Versión actualizada de mi portafolio con mejores prácticas, arquitectura modular y diseño profesional.",
      image: "assets/images/profile.webp",
      category: "personal",
      tags: ["HTML", "CSS", "JavaScript", "Modular"],
      technologies: ["HTML5", "CSS3", "JavaScript ES6+", "CSS Variables"],
      features: [
        "Arquitectura modular",
        "CSS con variables",
        "JavaScript organizado",
        "Animaciones suaves",
        "SEO optimizado"
      ],
      links: {
        demo: "index.html",
        github: "https://github.com/Chucharizard",
        live: null
      },
      status: "completed",
      date: "2024"
    }
  ],

  // Redes sociales
  social: {
    github: {
      url: "https://github.com/Chucharizard",
      icon: "fab fa-github"
    },
    instagram: {
      url: "https://www.instagram.com/gatowaton22/",
      icon: "fab fa-instagram"
    },
    discord: {
      url: "https://discord.gg/5qk4QKY2HE",
      icon: "fab fa-discord"
    },
    email: {
      url: "mailto:arancibiajesus46@gmail.com",
      icon: "fas fa-envelope"
    },
    phone: {
      url: "tel:+59174402990",
      icon: "fas fa-phone"
    }
  },

  // Configuración de la aplicación
  config: {
    typingSpeed: 100,
    typingDelay: 2000,
    animationDuration: 800,
    scrollOffset: 100,
    projectsPerPage: 6,
    autoSave: true,
    theme: 'light' // 'light' | 'dark'
  },

  // Textos del sitio
  texts: {
    hero: {
      greeting: "Hola, soy",
      description: "Estudiante de Ingeniería de Sistemas en UNIVALLE, especializado en desarrollo web full-stack. Apasionado por crear soluciones tecnológicas innovadoras y eficientes."
    },
    about: {
      title: "Sobre mí",
      subtitle: "Conoce más sobre mi trayectoria y pasiones",
      intro: "¡Hola! Soy Jesús Arancibia",
      description1: "Estudiante de 4to semestre de Ingeniería de Sistemas en la Universidad del Valle (UNIVALLE). Mi pasión por la tecnología me ha llevado a especializarme en desarrollo web full-stack, con experiencia en Python, Flask, JavaScript, y tecnologías modernas de frontend.",
      description2: "Me caracterizo por ser una persona autodidacta, creativa y siempre dispuesta a aprender nuevas tecnologías. Disfruto enfrentando desafíos complejos y encontrando soluciones innovadoras a problemas reales."
    },
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Tecnologías que domino y herramientas que utilizo"
    },
    projects: {
      title: "Mis Proyectos",
      subtitle: "Una muestra de mi trabajo y experiencia",
      filters: {
        all: "Todos",
        university: "Universitarios",
        freelance: "Freelance", 
        personal: "Personales"
      }
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tienes un proyecto en mente? ¡Hablemos!",
      form: {
        name: "Nombre completo",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar Mensaje"
      }
    },
    footer: {
      copyright: "© 2024 Jesús Arancibia (Chucharizard). Todos los derechos reservados.",
      madeWith: "Desarrollado con ❤️ y mucho café ☕"
    }
  }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}
