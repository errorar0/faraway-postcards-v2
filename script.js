/* =========================================
   Faraway Postcards — script.js
   ========================================= */

(function () {
  'use strict';

  function updateFooterYear() {
    var yearEl = document.getElementById('year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }

  function injectSiteHeader() {
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
  }

  function initFilmMenu() {
    var hamburger = document.getElementById('hamburgerBtn');
    var filmMenu = document.getElementById('filmMenu');
    var overlay = document.getElementById('menuOverlay');
    var closeBtn = document.getElementById('menuCloseBtn');

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
  }

  function secureExternalLinks() {
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var i = 0; i < links.length; i++) {
      var rel = links[i].getAttribute('rel') || '';
      if (rel.indexOf('noopener') === -1) rel += ' noopener';
      if (rel.indexOf('noreferrer') === -1) rel += ' noreferrer';
      links[i].setAttribute('rel', rel.trim());
    }
  }

  function init() {
    updateFooterYear();
    injectSiteHeader();
    initFilmMenu();
    secureExternalLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
