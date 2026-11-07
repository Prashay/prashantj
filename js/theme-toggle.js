/**
 * Prashant Jha Portfolio - Theme Engine (Dark & Light Mode)
 * Ultra-robust theme switcher with instant zero-flash execution,
 * localStorage persistence and multiple toggle controls.
 * Default: Light Mode
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'pj_theme_preference_v2';

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    // Default to light mode
    return 'light';
  }

  function applyTheme(theme) {
    var isLight = theme === 'light';
    
    // Set on <html> root
    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
      if (isLight) {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
      }
    }

    // Set on <body>
    if (document.body) {
      if (isLight) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
      }
    }

    // Update meta theme-color
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isLight ? '#f8fafc' : '#090d16');
    }

    updateAllToggleButtons(theme);
  }

  function updateAllToggleButtons(theme) {
    var isLight = theme === 'light';
    var buttons = document.querySelectorAll('.theme-toggle-btn, .floating-theme-toggle');
    
    buttons.forEach(function (btn) {
      var icon = btn.querySelector('i');
      var text = btn.querySelector('.theme-text');
      
      if (isLight) {
        // In Light mode: user clicks to switch to Dark mode
        if (icon) icon.className = 'fa fa-moon-o theme-icon';
        if (text) text.textContent = 'Dark Mode';
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        // In Dark mode: user clicks to switch to Light mode
        if (icon) icon.className = 'fa fa-sun-o theme-icon';
        if (text) text.textContent = 'Light Mode';
        btn.setAttribute('title', 'Switch to Light Mode');
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    applyTheme(next);
  }

  // Pre-paint immediate configuration
  var initialTheme = getSavedTheme();
  if (document.documentElement) {
    document.documentElement.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
  }

  function attachListeners() {
    applyTheme(getSavedTheme());

    // Ensure floating quick switcher exists
    var floatingBtn = document.querySelector('.floating-theme-toggle');
    if (!floatingBtn) {
      floatingBtn = document.createElement('button');
      floatingBtn.className = 'floating-theme-toggle';
      floatingBtn.setAttribute('type', 'button');
      floatingBtn.setAttribute('aria-label', initialTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      floatingBtn.setAttribute('title', initialTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      floatingBtn.innerHTML = initialTheme === 'light' ? '<i class="fa fa-moon-o"></i>' : '<i class="fa fa-sun-o"></i>';
      document.body.appendChild(floatingBtn);
    }

    // Direct event listener on all theme buttons
    var allButtons = document.querySelectorAll('.theme-toggle-btn, .floating-theme-toggle');
    allButtons.forEach(function (btn) {
      btn.onclick = function (e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggleTheme();
      };
    });

    // Delegated event listener fallback
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.theme-toggle-btn, .floating-theme-toggle');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners);
  } else {
    attachListeners();
  }

  // Expose global controller
  window.PJTheme = {
    get: function () { return document.documentElement.getAttribute('data-theme') || 'light'; },
    set: applyTheme,
    toggle: toggleTheme
  };
})();
