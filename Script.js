// ---------- Tema claro/oscuro con persistencia ----------
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  if (theme === 'dark') {
    root.classList.add('dark');
    themeIcon.textContent = '🌙';
  } else {
    root.classList.remove('dark');
    themeIcon.textContent = '☀️';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Por defecto: oscuro (identidad visual del portfolio)
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = root.classList.contains('dark');
  const nextTheme = isDark ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

// ---------- Menú móvil ----------
const menuToggle = document.getElementById('menuToggle');
const desktopNav = document.getElementById('desktopNav');

menuToggle.addEventListener('click', () => {
  desktopNav.classList.toggle('is-open');
});

// ---------- Scroll suave a secciones + cierre de menú móvil ----------
document.querySelectorAll('[data-scroll-to]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = el.getAttribute('data-scroll-to');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    desktopNav.classList.remove('is-open');
  });
});

// ---------- Resaltar el enlace de nav activo según la sección visible ----------
const sections = document.querySelectorAll('.section-anchor');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('data-scroll-to') === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// ---------- Animaciones de entrada al hacer scroll ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  // Si el usuario prefiere menos movimiento, mostrar todo directamente sin animar
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

// ---------- Botón volver arriba ----------
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});