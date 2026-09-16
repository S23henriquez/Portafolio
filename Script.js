const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = themeToggle.querySelector('.theme-label');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const sections = [...document.querySelectorAll('.section-anchor')];
const navLinks = [...document.querySelectorAll('.nav-link')];

function updateThemeButton() {
  const dark = root.dataset.theme === 'dark';
  themeLabel.textContent = dark ? 'claro' : 'oscuro';
  themeToggle.querySelector('span').textContent = dark ? '☼' : '☾';
  themeToggle.setAttribute('aria-pressed', String(dark));
}
updateThemeButton();

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
  updateThemeButton();
});

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