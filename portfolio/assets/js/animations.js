/* =====================================================================
   animations.js — GSAP scroll reveals, 3D tilt & magnetic buttons
   ===================================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- GSAP scroll reveals ---------- */
  function initGSAP() {
    if (typeof gsap === 'undefined' || prefersReduced) return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    // Section titles rise in.
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      });
    });

    // Subtle parallax on background blobs.
    gsap.utils.toArray('.blob').forEach((blob, i) => {
      gsap.to(blob, {
        yPercent: (i % 2 === 0 ? -1 : 1) * 18,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      });
    });

    // Timeline line draws down.
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      gsap.from('.timeline__dot', {
        scrollTrigger: { trigger: timeline, start: 'top 80%' },
        scale: 0, opacity: 0, stagger: 0.2, duration: 0.5, ease: 'back.out(2)',
      });
    }
  }

  /* ---------- 3D tilt effect ---------- */
  function initTilt() {
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;
    const MAX = 8; // degrees

    document.querySelectorAll('[data-tilt]').forEach((card) => {
      let rect;
      card.addEventListener('mouseenter', () => { rect = card.getBoundingClientRect(); });
      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotY = (px - 0.5) * MAX * 2;
        const rotX = (0.5 - py) * MAX * 2;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;
    const STRENGTH = 0.35;

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
    });
  }

  function boot() {
    initGSAP();
    initTilt();
    initMagnetic();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
