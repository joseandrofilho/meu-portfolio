document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');

// Dispara a entrada da header somente depois que o JavaScript estiver pronto.
requestAnimationFrame(() => {
  requestAnimationFrame(() => header.classList.add('header-ready'));
});

// A linha dourada da header acompanha o progresso da rolagem da página.
let scrollTicking = false;
const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  header.style.setProperty('--scroll-progress', Math.min(Math.max(progress, 0), 1));
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollProgress);
}, { passive: true });

updateScrollProgress();

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const animatedElements = [
  ...document.querySelectorAll('.projects-intro'),
  ...document.querySelectorAll('.project-card'),
  ...document.querySelectorAll('.about-label'),
  ...document.querySelectorAll('.about-heading'),
  ...document.querySelectorAll('.about-copy'),
  ...document.querySelectorAll('.about-pillar'),
  ...document.querySelectorAll('.services-intro'),
  ...document.querySelectorAll('.service-item'),
  ...document.querySelectorAll('.technologies-heading'),
  ...document.querySelectorAll('.technology-group'),
  ...document.querySelectorAll('.contact-topline'),
  ...document.querySelectorAll('.contact-stage'),
  ...document.querySelectorAll('.contact-action-row'),
  ...document.querySelectorAll('.contact-links'),
  ...document.querySelectorAll('.footer-main'),
  ...document.querySelectorAll('.footer-bottom'),
  ...document.querySelectorAll('.info-section > *')
];

animatedElements.forEach((element, index) => {
  element.classList.add('scroll-reveal');
  element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);

  if (element.matches('.about-heading')) element.classList.add('from-left');
  if (element.matches('.about-copy')) element.classList.add('from-right');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -8% 0px'
});

animatedElements.forEach((element) => revealObserver.observe(element));
