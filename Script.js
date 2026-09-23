const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = themeToggle.querySelector('.theme-label');
const langToggle = document.getElementById('lang-toggle');
const cvLink = document.getElementById('cv-link');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const sections = [...document.querySelectorAll('.section-anchor')];
const navLinks = [...document.querySelectorAll('.nav-link')];

/* ---------- Almacenamiento seguro ---------- */
const store = {
  get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
};

/* ---------- Traducciones ---------- */
const translations = {
  es: {
    'meta.title': 'Saul Alejandro Henríquez — Developer',
    'meta.description': 'Portafolio de Saul Alejandro Henríquez, desarrollador de aplicaciones multiplataforma.',
    'cv.href': 'img/CV_Alejandro_Henriquez_DAM.pdf',
    'lang.button': 'EN',
    'lang.aria': 'Switch to English',
    'theme.light': 'claro',
    'theme.dark': 'oscuro',

    'aria.home': 'Ir al inicio',
    'aria.nav': 'Navegación principal',
    'aria.theme': 'Cambiar tema',
    'aria.menu': 'Abrir menú',
    'aria.codeBlock': 'Información personal en formato de código',
    'aria.top': 'Volver arriba',

    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Trayectoria',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',

    'hero.label': 'Desarrollador de aplicaciones · 2º DAM · Reus',
    'hero.intro': 'Estudiante de Desarrollo de Aplicaciones Multiplataforma apasionado por construir productos digitales reales: del backend al móvil, de la base de datos a la interfaz.',
    'hero.projects': 'ver proyectos',
    'hero.contact': 'contactar',
    'hero.status': 'disponible para prácticas / junior',
    'hero.photoAlt': 'Fotografía de perfil de Saul Alejandro Henríquez',
    'hero.note': '4+ proyectos · 10+ tecnologías · 2 años de DAM',
    'hero.scroll': 'scroll para explorar',

    'about.title': 'Sobre mí',
    'about.p1': 'Soy estudiante de <strong>Desarrollo de Aplicaciones Multiplataforma</strong> con una mentalidad orientada a resolver problemas reales. Me apasiona construir herramientas que funcionen y aporten valor.',
    'about.p2': 'Los deportes de contacto me han enseñado <strong>disciplina, constancia y trabajo en equipo</strong>, cualidades que aplico directamente al desarrollo.',
    'about.p3': 'Actualmente estoy enfocado en <strong>Android con Kotlin</strong>, desarrollo web full-stack y bases de datos. Siempre buscando el siguiente reto.',
    'about.github': 'ver GitHub',
    'json.location': '"Reus, España"',
    'json.program': '"2º DAM · Multiplataforma"',
    'json.availability': '"Prácticas / Junior"',

    'skills.title': 'Habilidades',
    'skills.count': '09 lenguajes · 06 herramientas',
    'skills.languages': 'lenguajes',
    'skills.systems': 'sistemas',
    'skills.soft1': 'Trabajo En Equipo',
    'skills.soft2': 'Adaptabilidad',
    'skills.soft3': 'Resolución De Problemas',

    'exp.title': 'Trayectoria',
    'exp.meta': 'CIFP / Instituto · Reus',
    'exp.1.date': '2026 — presente',
    'exp.1.title': '2º DAM — TFG CodeGym',
    'exp.1.desc': 'Desarrollo de una app Android de aprendizaje de programación con gamificación, 50 lecciones, Firebase, arquitectura MVVM y soporte multilingüe.',
    'exp.2.title': '1º DAM — Fundamentos',
    'exp.2.desc': 'Proyectos con Java, bases de datos relacionales, desarrollo web con HTML, CSS y PHP, y fundamentos de programación orientada a objetos.',
    'exp.3.title': 'Certificaciones online',
    'exp.3.desc': 'Cloud Computing y Prompt Design in Vertex AI, con primeros pasos en inteligencia artificial aplicada.',

    'projects.title': 'Proyectos',
    'projects.count': '04 repositorios destacados',
    'projects.workshop.type': 'PRODUCCIÓN REAL · PINNED',
    'projects.workshop.title': 'Sistema de gestión de taller',
    'projects.workshop.desc': 'Plataforma web para gestionar clientes, vehículos, facturas, presupuestos y generación de PDFs. Utilizada en producción real.',
    'projects.landing.title': 'Landing del taller',
    'projects.landing.desc': 'Página corporativa responsive con servicios, identidad visual y formulario de contacto.',
    'projects.futchigol.desc': 'Juego Android multijugador con turnos, marcador y efectos visuales animados.',
    'projects.todo.type': 'MÓVIL · FIREBASE',
    'projects.todo.desc': 'Gestor de tareas con autenticación, Firestore y operaciones CRUD en tiempo real.',
    'projects.codegym.desc': 'Aplicación para aprender programación con lecciones, gamificación y soporte multilingüe con pequeños retos de código en cada lección y un sistema de puntuación y logros.',

    'contact.title': 'Hablemos',
    'contact.copy': '¿Tienes un proyecto, una oportunidad de prácticas o simplemente quieres saludar? Estoy disponible para conversar.',
    'contact.location': '⌖ Reus, España',
    'footer.built': 'Construido con HTML · CSS · JavaScript'
  },

  en: {
    'meta.title': 'Saul Alejandro Henríquez — Developer',
    'meta.description': 'Portfolio of Saul Alejandro Henríquez, multiplatform application developer.',
    'cv.href': 'img/CV_Alejandro_Henriquez_EN.pdf',
    'lang.button': 'ES',
    'lang.aria': 'Cambiar a español',
    'theme.light': 'light',
    'theme.dark': 'dark',

    'aria.home': 'Go to top',
    'aria.nav': 'Main navigation',
    'aria.theme': 'Toggle theme',
    'aria.menu': 'Open menu',
    'aria.codeBlock': 'Personal information in code format',
    'aria.top': 'Back to top',

    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Journey',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.label': 'App developer · 2nd year DAM · Reus',
    'hero.intro': 'Multiplatform Application Development student who loves building real digital products: from backend to mobile, from the database to the interface.',
    'hero.projects': 'view projects',
    'hero.contact': 'get in touch',
    'hero.status': 'open to internships / junior roles',
    'hero.photoAlt': 'Profile photo of Saul Alejandro Henríquez',
    'hero.note': '4+ projects · 10+ technologies · 2 years of DAM',
    'hero.scroll': 'scroll to explore',

    'about.title': 'About me',
    'about.p1': 'I am a <strong>Multiplatform Application Development</strong> student with a mindset focused on solving real problems. I love building tools that work and add value.',
    'about.p2': 'Contact sports have taught me <strong>discipline, consistency and teamwork</strong>, qualities I bring directly to development.',
    'about.p3': 'I am currently focused on <strong>Android with Kotlin</strong>, full-stack web development and databases. Always looking for the next challenge.',
    'about.github': 'view GitHub',
    'json.location': '"Reus, Spain"',
    'json.program': '"2nd year DAM · Multiplatform"',
    'json.availability': '"Internship / Junior"',

    'skills.title': 'Skills',
    'skills.count': '09 languages · 06 tools',
    'skills.languages': 'languages',
    'skills.systems': 'systems',
    'skills.soft1': 'Teamwork',
    'skills.soft2': 'Adaptability',
    'skills.soft3': 'Problem Solving',

    'exp.title': 'Journey',
    'exp.meta': 'Vocational school · Reus',
    'exp.1.date': '2026 — present',
    'exp.1.title': '2nd year DAM — Final project CodeGym',
    'exp.1.desc': 'Building an Android app for learning programming with gamification, 50 lessons, Firebase, MVVM architecture and multilingual support.',
    'exp.2.title': '1st year DAM — Foundations',
    'exp.2.desc': 'Projects with Java, relational databases, web development with HTML, CSS and PHP, and object-oriented programming fundamentals.',
    'exp.3.title': 'Online certifications',
    'exp.3.desc': 'Cloud Computing and Prompt Design in Vertex AI, with first steps in applied artificial intelligence.',

    'projects.title': 'Projects',
    'projects.count': '04 featured repositories',
    'projects.workshop.type': 'LIVE IN PRODUCTION · PINNED',
    'projects.workshop.title': 'Workshop management system',
    'projects.workshop.desc': 'Web platform to manage customers, vehicles, invoices, quotes and PDF generation. Used daily in a real business.',
    'projects.landing.title': 'Workshop landing page',
    'projects.landing.desc': 'Responsive corporate website with services, visual identity and a contact form.',
    'projects.futchigol.desc': 'Turn-based multiplayer Android game with a scoreboard and animated visual effects.',
    'projects.todo.type': 'MOBILE · FIREBASE',
    'projects.todo.desc': 'Task manager with authentication, Firestore and real-time CRUD operations.',
    'projects.codegym.desc': 'App for learning programming through lessons, gamification and multilingual support, with small coding challenges in every lesson and a points and achievements system.',

    'contact.title': "Let's talk",
    'contact.copy': 'Have a project, an internship opportunity or just want to say hi? I am happy to chat.',
    'contact.location': '⌖ Reus, Spain',
    'footer.built': 'Built with HTML · CSS · JavaScript'
  }
};

let currentLang = 'es';
const t = key => translations[currentLang][key] ?? translations.es[key] ?? '';

function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : 'es';
  root.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-alt]').forEach(el => el.setAttribute('alt', t(el.dataset.i18nAlt)));

  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));

  cvLink.setAttribute('href', t('cv.href'));

  langToggle.textContent = t('lang.button');
  langToggle.setAttribute('aria-label', t('lang.aria'));

  updateThemeButton();
  store.set('lang', currentLang);
}

function detectLanguage() {
  const saved = store.get('lang');
  if (saved === 'es' || saved === 'en') return saved;
  const browser = (navigator.language || 'es').toLowerCase();
  return browser.startsWith('es') || browser.startsWith('ca') ? 'es' : 'en';
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'es' ? 'en' : 'es');
});

/* ---------- Tema ---------- */
function updateThemeButton() {
  const dark = root.dataset.theme === 'dark';
  themeLabel.textContent = dark ? t('theme.light') : t('theme.dark');
  themeToggle.querySelector('span').textContent = dark ? '☼' : '☾';
  themeToggle.setAttribute('aria-pressed', String(dark));
}

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  store.set('theme', root.dataset.theme);
  updateThemeButton();
});

applyLanguage(detectLanguage());

/* ---------- Navegación ---------- */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('[data-scroll]').forEach(el =>
  el.addEventListener('click', () => scrollToSection(el.dataset.scroll))
);

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link =>
      link.classList.toggle('is-active', link.dataset.scroll === entry.target.id)
    );
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

/* ---------- Animaciones de aparición ---------- */
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('is-visible'));
}