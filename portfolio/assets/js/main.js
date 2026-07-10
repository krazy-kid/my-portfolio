/* =====================================================================
   main.js — core interactions
   loader · theme · navbar · mobile menu · scroll progress · counters ·
   back-to-top · active nav · smooth scroll · contact form · AOS init
   ===================================================================== */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Loading screen ---------- */
  const loader = $('#loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 600);
  });
  // Safety: never trap the user behind the loader.
  setTimeout(() => loader && loader.classList.add('hidden'), 3500);

  /* ---------- Theme toggle + persistence ---------- */
  const themeToggle = $('#themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    const icon = themeToggle && themeToggle.querySelector('i');
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      if (icon) icon.className = 'fa-solid fa-sun';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      if (icon) icon.className = 'fa-solid fa-moon';
    }
  }

  const savedTheme = localStorage.getItem('ps-theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  themeToggle && themeToggle.addEventListener('click', () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('ps-theme', next);
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = $('#navbar');
  const onScrollNav = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 20);
  onScrollNav();

  /* ---------- Mobile menu ---------- */
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  function closeMenu() {
    menuToggle && menuToggle.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle && menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('open');
    navLinks && navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link').forEach((l) => l.addEventListener('click', closeMenu));

  /* ---------- Smooth scroll for anchor links ---------- */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll progress + back to top ---------- */
  const progress = $('#scrollProgress');
  const backToTop = $('#backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);
    onScrollNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Active nav link via IntersectionObserver ---------- */
  const sections = $$('main section[id]');
  const linkMap = new Map($$('.nav-link').map((l) => [l.getAttribute('href').slice(1), l]));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$('.nav-link').forEach((l) => l.classList.remove('active'));
          const active = linkMap.get(entry.target.id);
          active && active.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Contact form (client-side validation + graceful mailto) ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const subject = $('#subject').value.trim();
    const message = $('#message').value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailValid || !message) {
      if (status) { status.textContent = 'Please add your name, a valid email and a message.'; status.className = 'form-status error'; }
      return;
    }

    // No backend on a static site — open the user's mail client pre-filled.
    const body = encodeURIComponent(`Hi Prem,\n\n${message}\n\n— ${name} (${email})`);
    const subj = encodeURIComponent(subject || `New message from ${name}`);
    window.location.href = `mailto:premsingh.ps49@gmail.com?subject=${subj}&body=${body}`;

    if (status) { status.textContent = 'Opening your email client… thanks for reaching out!'; status.className = 'form-status success'; }
    form.reset();
  });

  /* ---------- Year in footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- AOS init ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80, disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches });
    }
  });
})();
