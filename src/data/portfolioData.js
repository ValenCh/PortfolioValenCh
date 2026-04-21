// ============================================================
// PORTFOLIO DATA — Editá este archivo para actualizar el sitio
// ============================================================

export const personal = {
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
};

// Chips del Hero — editá esta lista para actualizar la sección de inicio
export const heroChips = [
  'React',
  'JavaScript',
  'Python',
  'HTML / CSS',
  'SASS',
  'IA & Automatización',
  'Ciberseguridad',
];

export const experience = [
  {
    id: 1,
    role: 'Desarrollador Web Freelance',
    company: 'Proyectos independientes',
    period: '2026 — Presente',
    description:
      'Desarrollo de sitios web y aplicaciones para clientes. Gestión completa del proyecto: relevamiento, diseño, desarrollo y entrega. Uso de React, JavaScript, HTML/CSS/SASS.',
    tags: ['React', 'JavaScript', 'SASS', 'HTML'],
  },
  {
    id: 2,
    role: 'Estudiante de Ingeniería en Sistemas',
    company: 'Universidad — Buenos Aires',
    period: '2023 — Presente',
    description:
      'Formación sólida en algorítmica, estructuras de datos, programación orientada a objetos, bases de datos y redes. Participación activa en proyectos académicos grupales.',
    tags: ['Algoritmos', 'POO', 'Bases de Datos', 'Redes'],
  },
];

export const education = [
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
  /*{
    id: 3,
    degree: 'Introducción a la Ciberseguridad',
    school: 'Aprendizaje continuo',
    period: '2024 — Presente',
    icon: '🔐',
  },*/ /* CAMBIO: eliminé esta sección de ciberseguridad porque no es un curso formal, sino un interés personal que ya se menciona en otros lugares. Para mantener el portfolio enfocado y profesional, es mejor destacar solo la educación formal y los proyectos concretos. */
];

export const skillCategories = [
  {
    id: 1,
    title: 'Frontend',
    colorVar: '--accent',
    skills: [
      { name: 'HTML / CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'SASS', level: 75 },
    ],
  },
  {
    id: 2,
    title: 'Backend & Lenguajes',
    colorVar: '--cyan',
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Node.js', level: 60 },
      { name: 'Java', level: 55 },
      { name: 'C', level: 50 },
    ],
  },
  {
    id: 3,
    title: 'Herramientas',
    colorVar: '--green',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Linux', level: 65 },
      { name: 'Figma', level: 50 },
    ],
  },
];

export const interests = [
  'Automatización de procesos',
  'Inteligencia Artificial',
  'Ciberseguridad',
  'Machine Learning',
  'DevOps',
];

export const projects = [
  {
    id: 1,
    title: 'Portfolio Personal',
    description:
      'Sitio web personal desarrollado con React para presentar proyectos, habilidades y experiencia de forma profesional y moderna.',
    tags: ['React', 'CSS', 'JavaScript'],
    icon: '🌐',
    github: 'https://github.com/ValenCh',
    demo: null,
  },
  {
    id: 2,
    title: 'App Web — Proyecto personal',
    description:
      'Actualizá esta descripción con tu proyecto real. Contá el problema que resuelve, las decisiones técnicas que tomaste y qué aprendiste.',
    tags: ['html', 'css', 'JavaScript', 'SASS'],
    icon: '⚡',
    github: 'https://github.com/ValenCh',
    demo: 'https://hilarious-sundae-80c333.netlify.app/',
  },
  {
    id: 3,
    title: 'Script Python — Automatización',
    description:
      'Herramienta desarrollada en Python para automatizar una tarea repetitiva. Reemplazá con tu proyecto real de Python.',
    tags: ['Python', 'Automatización'],
    icon: '🐍',
    github: 'https://github.com/ValenCh',
    demo: null,
  },
];

export const stats = [
  { id: 1, value: '4°', label: 'Año de Ingeniería' },
  { id: 2, value: '3+', label: 'Proyectos personales' },
  { id: 3, value: '5+', label: 'Tecnologías dominadas' },
  { id: 4, value: '∞', label: 'Ganas de aprender' },
];