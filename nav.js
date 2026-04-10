/* ============================================================
   OUTDOOR GRILL SALES — nav.js
   Shared navigation logic for all pages
   ============================================================ */

/* ─────────────────────────────────────────────
   RELOCATION NOTICE
   Set to true when Michael moves to new location.
   Change the message and set to false to hide.
   ───────────────────────────────────────────── */
const SHOW_RELOCATION_BANNER = true;
const RELOCATION_MESSAGE = 'Exciting news! Outdoor Grill Sales is relocating soon. Stay tuned for our new address.';

/* ─────────────────────────────────────────────
   ANNOUNCEMENT BANNER
   ───────────────────────────────────────────── */
function initBanner() {
  const banner = document.getElementById('announce-banner');
  if (!banner) return;

  if (SHOW_RELOCATION_BANNER) {
    banner.style.display = 'block';
    banner.querySelector('.banner-text').textContent = RELOCATION_MESSAGE;

    // offset nav top
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.top = banner.offsetHeight + 'px';
    }
  } else {
    banner.style.display = 'none';
  }
}

/* ─────────────────────────────────────────────
   NAV SCROLL BEHAVIOR
   ───────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  const progressBar = document.getElementById('progress-bar');
  const backTop = document.getElementById('back-top');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;

    // Scrolled state
    if (scrolled > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Progress bar
    if (progressBar) {
      progressBar.style.width = (scrolled / total * 100) + '%';
    }

    // Back to top
    if (backTop) {
      if (scrolled > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }
  });
}

/* ─────────────────────────────────────────────
   HAMBURGER MENU
   ───────────────────────────────────────────── */
function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');

    if (isOpen) {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      hamburger.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ─────────────────────────────────────────────
   ACTIVE NAV LINK
   Highlights the current page link in the nav
   ───────────────────────────────────────────── */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();

    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === 'index.html' && linkPage === '') ||
      (currentPage === 'index.html' && href === '#')
    ) {
      link.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
   ───────────────────────────────────────────── */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────
   BACK TO TOP BUTTON
   ───────────────────────────────────────────── */
function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   INIT ALL
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initBanner();
  initNavScroll();
  initHamburger();
  initActiveNav();
  initReveal();
  initBackTop();
});
