const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const downloadButton = document.querySelector('.download-link');

function closeMenu() {
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('is-open');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  navMenu?.classList.toggle('is-open', isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  if (navMenu?.classList.contains('is-open') && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

downloadButton?.addEventListener('click', () => {
  const pdfUrl = 'docs/pdfs/Habiba_Rafiq_General_Resume.pdf';
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Habiba-Rafiq-CV.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
});
