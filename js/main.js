// main.js

// ── THEME TOGGLE ──────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

function applyTheme(isDark) {
  if (isDark) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  const icon = isDark ? '☀' : '☾';
  const label = isDark ? 'Light' : 'Dark';
  [themeToggle, themeToggleMobile].forEach(btn => {
    if (!btn) return;
    btn.querySelector('.toggle__icon').textContent = icon;
    btn.querySelector('.toggle__text').textContent = label;
  });
}

// Apply saved theme on load; default is light
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

[themeToggle, themeToggleMobile].forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') !== 'dark';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  });
});

// ── HAMBURGER ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a link is tapped
document.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── SMOOTH SCROLL ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── SCROLL SHADOW ─────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--shadow', window.scrollY > 60);
}, { passive: true });

// ── CAROUSEL ──────────────────────────────────────
const track = document.querySelector('.carousel-track');
if (track) {
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  let current = 0;

  function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getCardWidth() {
    const wrapper = track.parentElement;
    const visible = getVisible();
    const gap = 24;
    const totalGap = gap * (visible - 1);
    return (wrapper.offsetWidth - totalGap) / visible;
  }

  function updateCarousel() {
    const visible = getVisible();
    const cardWidth = getCardWidth();
    const gap = 24;
    const offset = current * (cardWidth + gap);

    cards.forEach(card => {
      card.style.width = cardWidth + 'px';
      card.style.minWidth = cardWidth + 'px';
    });

    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled =
      current >= cards.length - getVisible();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (current > 0) { current--; updateCarousel(); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visible = getVisible();
      const maxIndex = cards.length - visible;
      if (current < maxIndex) {
        current++;
        updateCarousel();
      }
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      updateCarousel();
    });
  });

  window.addEventListener('resize', () => {
    current = 0;
    updateCarousel();
  });

  window.addEventListener('load', updateCarousel);
  updateCarousel();
}
