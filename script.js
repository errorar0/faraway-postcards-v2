/* =========================================
   Faraway Postcards — script.js
   Lightweight progressive enhancement
   ========================================= */

(function () {
  'use strict';

  /**
   * Safely run a function only if its target element exists.
   * Keeps the script resilient across pages with different markup.
   */
  function safeRun(fn) {
    try {
      fn();
    } catch (err) {
      // Fail silently — never break the reading experience.
    }
  }

  /**
   * 1. Update footer year automatically.
   *    Looks for an element with id="year".
   */
  function updateFooterYear() {
    var yearEl = document.getElementById('year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }

  /**
   * 2. Mobile navigation toggle (progressive enhancement).
   *    Only activates if a toggle button exists in the DOM.
   *    Expected (optional) markup for future use:
   *      <button class="nav__toggle" aria-controls="nav-links" aria-expanded="false">Menu</button>
   *      <nav id="nav-links" class="nav__links"> ... </nav>
   */
  function initMobileNav() {
    var toggle = document.querySelector('.nav__toggle');
    var links = document.querySelector('.nav__links');

    if (!toggle || !links) return;

    // Ensure correct initial ARIA state
    if (!toggle.hasAttribute('aria-expanded')) {
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      links.classList.toggle('is-open', !isOpen);
    });
(function () {
  'use strict';

  var isArticlePage = window.location.pathname.includes('/articles/');
  var prefix = isArticlePage ? '../' : '';

  var headerSlot = document.getElementById('site-header');
  if (!headerSlot) return;

  headerSlot.innerHTML = `
    <header class="site-header">
      <button
        class="hamburger"
        id="hamburgerBtn"
        aria-label="Open menu"
        aria-expanded="false"
        aria-controls="filmMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <a href="${prefix}index.html" class="site-logo">
        FARAWAY POSTCARDS
      </a>
    </header>

    <div class="menu-overlay" id="menuOverlay"></div>

    <nav class="film-strip" id="filmMenu" role="dialog" aria-modal="true">
      <div class="sprocket-column left" aria-hidden="true">
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
      </div>

      <div class="sprocket-column right" aria-hidden="true">
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
        <div class="sprocket"></div><div class="sprocket"></div><div class="sprocket"></div>
      </div>

      <div class="film-strip-inner">
        <ul class="menu-items">
          <li><a href="${prefix}about.html">About</a></li>
          <li><a href="${prefix}index.html#articleFeed">Journal</a></li>
          <li><a href="${prefix}index.html">Home</a></li>
        </ul>

        <button class="menu-close" id="menuCloseBtn">
          Close
        </button>
      </div>
    </nav>
  `;
})();
    // Close menu when a link is clicked (useful on mobile)
    links.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
      }
    });

    // Close menu on Escape for accessibility
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && links.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /**
   * 3. External link safety.
   *    Any future <a target="_blank"> gets rel="noopener noreferrer"
   *    for security and performance. No visual impact.
   */
  function secureExternalLinks() {
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var i = 0; i < links.length; i++) {
      var rel = links[i].getAttribute('rel') || '';
      if (rel.indexOf('noopener') === -1) rel += ' noopener';
      if (rel.indexOf('noreferrer') === -1) rel += ' noreferrer';
      links[i].setAttribute('rel', rel.trim());
    }
  }

  /**
   * Initialize when the DOM is ready.
   */
  function init() {
    safeRun(updateFooterYear);
    safeRun(initMobileNav);
    safeRun(secureExternalLinks);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function () {
  'use strict';

  const hamburger = document.getElementById('hamburgerBtn');
  const filmMenu = document.getElementById('filmMenu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuCloseBtn');

  if (!hamburger || !filmMenu || !overlay || !closeBtn) return;

  function openMenu() {
    filmMenu.classList.add('active');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    filmMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();

    if (filmMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  filmMenu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && filmMenu.classList.contains('active')) {
      closeMenu();
    }
  });
})();
