/* =====================================================================
   cursor.js — custom animated cursor (dot + trailing ring)
   + mouse spotlight that follows the pointer.
   Disabled automatically on touch / reduced-motion devices.
   ===================================================================== */
(function () {
  'use strict';

  const isTouch = window.matchMedia('(hover: none)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const spotlight = document.getElementById('spotlight');

  // Spotlight can run regardless of cursor availability.
  if (spotlight && !prefersReduced) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.opacity = '1';
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
    }, { passive: true });
    window.addEventListener('mouseout', () => (spotlight.style.opacity = '0'));
  }

  if (isTouch || prefersReduced || !dot || !ring) return;

  document.body.classList.add('cursor-ready');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  function loop() {
    // Ease the ring toward the pointer for a trailing feel.
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Grow ring over interactive elements.
  const interactive = 'a, button, input, textarea, [data-magnetic], [data-tilt], .project-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactive)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactive)) ring.classList.remove('hovering');
  });

  // Hide when leaving the window.
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();
