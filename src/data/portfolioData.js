// ============================================================
// PORTFOLIO DATA — ES / EN — Editá este archivo para actualizar el sitio
// ============================================================
import { useLanguage } from '../context/LanguageContext';

export const portfolioData = {
  es: {
    personal: {
      name: 'Valentino Chiappini',
      initials: 'VC',
      role: 'Desarrollador Web & Estudiante de Ingeniería en Sistemas',
      tagline: 'Construyo experiencias web con foco en calidad, rendimiento y diseño.',
      bio: [
        'Estudiante de cuarto año de Ingeniería en Sistemas con experiencia práctica en desarrollo web. Me apasiona crear interfaces limpias y funcionales que resuelvan problemas reales.',
        'Busco mi primera experiencia laboral formal en un equipo donde pueda crecer, aprender y aportar desde el primer día. Me interesa especialmente la automatización, la inteligencia artificial y la ciberseguridad.',
      ],
      location: 'La Plata, Buenos Aires, Argentina',
      available: true,
      email: 'valentino.chiappini10@gmail.com',
      linkedin: 'https://www.linkedin.com/in/valentino-chiappini/',
      github: 'https://github.com/ValenCh',
    },

    heroChips: ['React', 'JavaScript', 'Python', 'HTML / CSS', 'SASS', 'IA & Automatización', 'Ciberseguridad'],

    experience: [
      {
        id: 1,
        role: 'Desarrollador Web Freelance',
        company: 'Proyectos independientes',
        period: '2026 — Presente',
        description: 'Desarrollo de sitios web y aplicaciones para clientes. Gestión completa del proyecto: relevamiento, diseño, desarrollo y entrega. Uso de React, JavaScript, HTML/CSS/SASS.',
        tags: ['React', 'JavaScript', 'SASS', 'HTML'],
      },
      {
        id: 2,
        role: 'Estudiante de Ingeniería en Sistemas',
        company: 'UTN — Facultad Regional La Plata',
        period: '2023 — Presente',
        description: 'Formación sólida en algorítmica, estructuras de datos, programación orientada a objetos, bases de datos y redes. Participación activa en proyectos académicos grupales.',
        tags: ['Algoritmos', 'POO', 'Bases de Datos', 'Redes'],
      },
      {
        id: 3,
        role: 'Curso de Desarrollo Web Frontend',
        company: 'Coderhouse — Online',
        period: '2022',
        description: 'Curso intensivo de desarrollo web frontend con foco en React. Aprendizaje práctico a través de proyectos reales, cubriendo HTML, CSS, Sass, JavaScript y React.',
        tags: ['React', 'JavaScript', 'SASS', 'CSS', 'HTML'],
      },
    ],

    education: [
      {
        id: 1,
        degree: 'Ingeniería en Sistemas de Información',
        school: 'Universidad Tecnológica Nacional — Facultad Regional La Plata',
        period: '2023 — En curso · 4° año',
        icon: '🎓',
      },
      {
        id: 2,
        degree: 'Desarrollo Web Frontend',
        school: 'Formación autodidacta & cursos online (Coderhouse)',
        period: '2021 — 2022',
        icon: '💻',
      },
    ],

    skillCategories: [
      {
        id: 1,
        title: 'Frontend',
        colorVar: '--accent',
        skills: [
          { name: 'HTML / CSS', tier: 'practice' },
          { name: 'JavaScript', tier: 'working' },
          { name: 'React', tier: 'practice' },
          { name: 'SASS', tier: 'practice' },
        ],
      },
      {
        id: 2,
        title: 'Backend & Lenguajes',
        colorVar: '--brand-warm',
        skills: [
          { name: 'Python', tier: 'working' },
        ],
      },
      {
        id: 3,
        title: 'Herramientas',
        colorVar: '--brand-warm-sage',
        skills: [
          { name: 'Git / GitHub', tier: 'practice' },
          { name: 'VS Code', tier: 'practice' },
          { name: 'Figma', tier: 'practice' },
        ],
      },
      {
        id: 4,
        title: 'Aprendiendo actualmente',
        isLearning: true,
        skills: [
          { name: 'Docker', tier: 'learning' },
          { name: 'Linux', tier: 'learning' },
          { name: 'Java', tier: 'learning' },
          { name: 'Node.js', tier: 'learning' },
          { name: 'C', tier: 'learning' },
          { name: 'Azure', tier: 'learning' },
        ],
      },
    ],

    interests: ['Automatización de procesos', 'Inteligencia Artificial', 'Ciberseguridad', 'Machine Learning', 'DevOps'],

    projects: [
      {
        id: 1,
        title: 'Portfolio Personal',
        description: 'Sitio web personal desarrollado con React para presentar proyectos, habilidades y experiencia de forma profesional y moderna.',
        longDescription: 'Este mismo sitio: una experiencia interactiva construida desde cero con React 19 y Vite, pensada para transmitir cuidado por el detalle. Incluye animaciones con Framer Motion, un sistema de diseño propio basado en variables CSS, internacionalización completa y autenticación real para el formulario de contacto.',
        role: 'Diseño & Desarrollo Frontend',
        date: '2026',
        tags: ['React', 'CSS', 'JavaScript'],
        icon: '🌐',
        github: 'https://github.com/ValenCh',
        demo: null,
        architecture: {
          frontend: 'React 19 + Vite + CSS Modules',
          api: 'EmailJS (envío de formularios)',
          database: 'Firebase Auth (Google Sign-In)',
        },
      },
      {
        id: 2,
        title: 'App Web — Proyecto personal',
        description: 'Aplicación web desarrollada como proyecto personal para practicar habilidades de frontend. Incluye diseño responsivo y funcionalidades interactivas.',
        longDescription: 'Aplicación pensada como ejercicio de consolidación de fundamentos: maquetado responsivo desde cero, interactividad con JavaScript vanilla y organización de estilos con SASS, sin frameworks de por medio.',
        role: 'Desarrollo Frontend',
        date: '2022',
        tags: ['html', 'css', 'JavaScript', 'SASS'],
        icon: '⚡',
        github: 'https://github.com/ValenCh',
        demo: 'https://hilarious-sundae-80c333.netlify.app/',
        architecture: {
          frontend: 'HTML + CSS + SASS + JavaScript vanilla',
          api: 'No aplica — sitio estático',
          database: 'No aplica',
        },
      },
    ],

    stats: [
      { id: 1, value: '4°', label: 'Año de Ingeniería en Sistemas' },
      { id: 2, value: '3+', label: 'Proyectos personales' },
      { id: 3, value: '4+', label: 'Tecnologías utilizadas' },
    ],

    ui: {
      nav: {
        links: [
          { label: 'Sobre mí', href: '#about' },
          { label: 'Experiencia', href: '#experience' },
          { label: 'Skills', href: '#skills' },
          { label: 'Proyectos', href: '#projects' },
          { label: 'Contacto', href: '#contact' },
        ],
        cta: 'Hablemos',
      },
      hero: {
        badgeAvailable: 'Disponible para trabajar',
        badgeUnavailable: 'No disponible actualmente',
        pre: 'Hola, soy',
        ctaProjects: 'Ver proyectos →',
        ctaContact: 'Contactarme',
        scrollHint: 'Scroll para explorar',
      },
      about: { tag: '// sobre mí', title: 'Más que código, soluciones que funcionan' },
      experience: { tag: '// experiencia', title: 'Mi trayectoria' },
      education: { tag: '// educación', title: 'Formación' },
      skills: {
        tag: '// skills',
        title: 'Tecnologías & herramientas',
        subtitle: 'Las herramientas que uso hoy y las áreas en las que quiero seguir creciendo.',
        interestsLabel: 'Áreas de interés y crecimiento',
        levels: { practice: 'Experiencia real', working: 'Conocimiento sólido', learning: 'En curso' },
        filterHint: 'Filtrando proyectos por',
        clearFilter: 'Ver todos',
      },
      projects: {
        tag: '// proyectos',
        title: 'Lo que construí',
        subtitle: 'Proyectos personales y académicos. Cada uno representa algo que aprendí.',
        viewAll: 'Ver todos',
        liveDemo: 'Demo en vivo',
        repo: 'Repositorio',
        architecture: 'Arquitectura',
        role: 'Rol',
        date: 'Fecha',
        close: 'Cerrar',
      },
      contact: {
        tag: '// contacto',
        title: '¿Hablamos?',
        intro: 'Estoy buscando mi primera experiencia laboral. Si tu equipo busca alguien con ganas de aprender, crecer y aportar valor desde el día uno, me encantaría conocerlos.',
        authTitle: 'Autenticación requerida',
        authHint: 'Para enviar un mensaje necesitás iniciar sesión con Google. Esto evita spam y me asegura poder responderte.',
        googleBtn: 'Continuar con Google',
        googleBtnLoading: 'Conectando...',
        verifyingSession: 'Verificando sesión...',
        logout: 'Salir',
        nameLabel: 'Nombre',
        emailLabel: 'Email',
        messageLabel: 'Mensaje',
        messagePlaceholder: 'Hola Valentino...',
        send: 'Enviar mensaje →',
        sending: 'Enviando...',
        sent: '✓ Enviado',
        successMsg: '✓ Mensaje enviado. Te respondo a la brevedad.',
        errorMsg: '✗ Error al enviar. Intentá de nuevo o escribime al email directamente.',
      },
      footer: { designedBy: 'Diseñado y desarrollado por' },
      commandPalette: {
        placeholder: 'Escribí un comando o buscá...',
        navigation: 'Navegación',
        preferences: 'Preferencias',
        contacts: 'Contactos',
        switchToEnglish: 'Cambiar a inglés',
        switchToSpanish: 'Cambiar a español',
        mute: 'Silenciar sonido',
        unmute: 'Activar sonido',
        copyEmail: 'Copiar email',
        emailCopied: 'Email copiado ✓',
        openGithub: 'Abrir GitHub',
        openLinkedin: 'Abrir LinkedIn',
        noResults: 'Sin resultados',
      },
    },
  },

  en: {
    personal: {
      name: 'Valentino Chiappini',
      initials: 'VC',
      role: 'Web Developer & Systems Engineering Student',
      tagline: 'I build web experiences focused on quality, performance, and design.',
      bio: [
        'Fourth-year Systems Engineering student with hands-on web development experience. I love crafting clean, functional interfaces that solve real problems.',
        "I'm looking for my first formal job on a team where I can grow, learn, and contribute from day one. I'm especially interested in automation, artificial intelligence, and cybersecurity.",
      ],
      location: 'La Plata, Buenos Aires, Argentina',
      available: true,
      email: 'valentino.chiappini10@gmail.com',
      linkedin: 'https://www.linkedin.com/in/valentino-chiappini/',
      github: 'https://github.com/ValenCh',
    },

    heroChips: ['React', 'JavaScript', 'Python', 'HTML / CSS', 'SASS', 'AI & Automation', 'Cybersecurity'],

    experience: [
      {
        id: 1,
        role: 'Freelance Web Developer',
        company: 'Independent projects',
        period: '2026 — Present',
        description: 'Building websites and applications for clients. Full project ownership: discovery, design, development, and delivery. Using React, JavaScript, HTML/CSS/SASS.',
        tags: ['React', 'JavaScript', 'SASS', 'HTML'],
      },
      {
        id: 2,
        role: 'Systems Engineering Student',
        company: 'UTN — La Plata Regional Faculty',
        period: '2023 — Present',
        description: 'Solid foundation in algorithms, data structures, object-oriented programming, databases, and networks. Active participation in group academic projects.',
        tags: ['Algorithms', 'OOP', 'Databases', 'Networks'],
      },
      {
        id: 3,
        role: 'Frontend Web Development Course',
        company: 'Coderhouse — Online',
        period: '2022',
        description: 'Intensive frontend web development course focused on React. Hands-on learning through real projects covering HTML, CSS, Sass, JavaScript, and React.',
        tags: ['React', 'JavaScript', 'SASS', 'CSS', 'HTML'],
      },
    ],

    education: [
      {
        id: 1,
        degree: 'Information Systems Engineering',
        school: 'Universidad Tecnológica Nacional — La Plata Regional Faculty',
        period: '2023 — Ongoing · Year 4',
        icon: '🎓',
      },
      {
        id: 2,
        degree: 'Frontend Web Development',
        school: 'Self-taught & online courses (Coderhouse)',
        period: '2021 — 2022',
        icon: '💻',
      },
    ],

    skillCategories: [
      {
        id: 1,
        title: 'Frontend',
        colorVar: '--accent',
        skills: [
          { name: 'HTML / CSS', tier: 'practice' },
          { name: 'JavaScript', tier: 'working' },
          { name: 'React', tier: 'practice' },
          { name: 'SASS', tier: 'practice' },
        ],
      },
      {
        id: 2,
        title: 'Backend & Languages',
        colorVar: '--brand-warm',
        skills: [
          { name: 'Python', tier: 'working' },
        ],
      },
      {
        id: 3,
        title: 'Tools',
        colorVar: '--brand-warm-sage',
        skills: [
          { name: 'Git / GitHub', tier: 'practice' },
          { name: 'VS Code', tier: 'practice' },
          { name: 'Figma', tier: 'practice' },
        ],
      },
      {
        id: 4,
        title: 'Currently learning',
        isLearning: true,
        skills: [
          { name: 'Docker', tier: 'learning' },
          { name: 'Linux', tier: 'learning' },
          { name: 'Java', tier: 'learning' },
          { name: 'Node.js', tier: 'learning' },
          { name: 'C', tier: 'learning' },
          { name: 'Azure', tier: 'learning' },
        ],
      },
    ],

    interests: ['Process automation', 'Artificial Intelligence', 'Cybersecurity', 'Machine Learning', 'DevOps'],

    projects: [
      {
        id: 1,
        title: 'Personal Portfolio',
        description: 'Personal website built with React to showcase projects, skills, and experience in a modern, professional way.',
        longDescription: "This very site: an interactive experience built from scratch with React 19 and Vite, designed to show attention to detail. It includes Framer Motion animations, a custom CSS-variable design system, full internationalization, and real authentication for the contact form.",
        role: 'Frontend Design & Development',
        date: '2026',
        tags: ['React', 'CSS', 'JavaScript'],
        icon: '🌐',
        github: 'https://github.com/ValenCh',
        demo: null,
        architecture: {
          frontend: 'React 19 + Vite + CSS Modules',
          api: 'EmailJS (form delivery)',
          database: 'Firebase Auth (Google Sign-In)',
        },
      },
      {
        id: 2,
        title: 'Web App — Personal project',
        description: 'Web application built as a personal project to practice frontend skills. Includes responsive design and interactive features.',
        longDescription: 'An app designed as a fundamentals exercise: responsive layout built from scratch, vanilla JavaScript interactivity, and SASS-organized styles, with no frameworks involved.',
        role: 'Frontend Development',
        date: '2022',
        tags: ['html', 'css', 'JavaScript', 'SASS'],
        icon: '⚡',
        github: 'https://github.com/ValenCh',
        demo: 'https://hilarious-sundae-80c333.netlify.app/',
        architecture: {
          frontend: 'HTML + CSS + SASS + vanilla JavaScript',
          api: 'N/A — static site',
          database: 'N/A',
        },
      },
    ],

    stats: [
      { id: 1, value: '4th', label: 'Year of Systems Engineering' },
      { id: 2, value: '3+', label: 'Personal projects' },
      { id: 3, value: '4+', label: 'Technologies used' },
    ],

    ui: {
      nav: {
        links: [
          { label: 'About', href: '#about' },
          { label: 'Experience', href: '#experience' },
          { label: 'Skills', href: '#skills' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ],
        cta: "Let's talk",
      },
      hero: {
        badgeAvailable: 'Available for work',
        badgeUnavailable: 'Not currently available',
        pre: "Hi, I'm",
        ctaProjects: 'View projects →',
        ctaContact: 'Get in touch',
        scrollHint: 'Scroll to explore',
      },
      about: { tag: '// about', title: 'More than code, solutions that work' },
      experience: { tag: '// experience', title: 'My journey' },
      education: { tag: '// education', title: 'Education' },
      skills: {
        tag: '// skills',
        title: 'Technologies & tools',
        subtitle: 'The tools I use today and the areas I want to keep growing in.',
        interestsLabel: 'Areas of interest & growth',
        levels: { practice: 'Hands-on experience', working: 'Working knowledge', learning: 'In progress' },
        filterHint: 'Filtering projects by',
        clearFilter: 'View all',
      },
      projects: {
        tag: '// projects',
        title: 'What I built',
        subtitle: 'Personal and academic projects. Each one represents something I learned.',
        viewAll: 'View all',
        liveDemo: 'Live demo',
        repo: 'Repository',
        architecture: 'Architecture',
        role: 'Role',
        date: 'Date',
        close: 'Close',
      },
      contact: {
        tag: '// contact',
        title: "Let's talk?",
        intro: "I'm looking for my first job. If your team is looking for someone eager to learn, grow, and add value from day one, I'd love to meet you.",
        authTitle: 'Authentication required',
        authHint: 'To send a message you need to sign in with Google. This prevents spam and ensures I can reply to you.',
        googleBtn: 'Continue with Google',
        googleBtnLoading: 'Connecting...',
        verifyingSession: 'Checking session...',
        logout: 'Sign out',
        nameLabel: 'Name',
        emailLabel: 'Email',
        messageLabel: 'Message',
        messagePlaceholder: 'Hi Valentino...',
        send: 'Send message →',
        sending: 'Sending...',
        sent: '✓ Sent',
        successMsg: "✓ Message sent. I'll get back to you shortly.",
        errorMsg: '✗ Error sending message. Try again or email me directly.',
      },
      footer: { designedBy: 'Designed and built by' },
      commandPalette: {
        placeholder: 'Type a command or search...',
        navigation: 'Navigation',
        preferences: 'Preferences',
        contacts: 'Contacts',
        switchToEnglish: 'Switch to English',
        switchToSpanish: 'Switch to Spanish',
        mute: 'Mute sound',
        unmute: 'Unmute sound',
        copyEmail: 'Copy email',
        emailCopied: 'Email copied ✓',
        openGithub: 'Open GitHub',
        openLinkedin: 'Open LinkedIn',
        noResults: 'No results',
      },
    },
  },
};

/** Hook central de datos: devuelve el objeto completo (personal, projects, ui, etc.)
 *  ya resuelto para el idioma actual. */
export function usePortfolioData() {
  const { language } = useLanguage();
  return portfolioData[language];
}