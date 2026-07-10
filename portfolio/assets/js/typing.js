/* =====================================================================
   typing.js — hero role typing animation via Typed.js
   ===================================================================== */
(function () {
  'use strict';

  function initTyped() {
    const el = document.getElementById('typed');
    if (!el || typeof Typed === 'undefined') return;

    new Typed('#typed', {
      strings: [
        'JavaScript apps',
        'Frontend systems',
        'CRO experiments',
        'Webflow sites',
        'HubSpot Sites',
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1600,
      startDelay: 400,
      loop: true,
      smartBackspace: true,
      cursorChar: '|',
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyped);
  } else {
    initTyped();
  }
})();
