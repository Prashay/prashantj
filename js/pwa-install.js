/* =====================================================================
   PWA INSTALLATION & MOBILE APP CONTROLLER WITH QR SCANNER
   Empowers 1-tap native mobile installation & on-click QR Scanner
===================================================================== */
(function () {
  'use strict';

  var deferredPrompt = null;
  var APP_URL = 'https://prashay.github.io/prashantj/';
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          console.log('[PWA] Service Worker active with scope:', reg.scope);
        })
        .catch(function (err) {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Capture Android / Chrome Native Install Prompt
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
  });

  // Track successful installation
  window.addEventListener('appinstalled', function () {
    console.log('[PWA] Application successfully installed.');
    deferredPrompt = null;
  });

  function isIos() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
  }

  function triggerInstallFlow(e) {
    if (e && e.preventDefault) e.preventDefault();

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted installation.');
        }
        deferredPrompt = null;
      });
    } else if (isIos() && !isStandalone) {
      showIosInstallGuide();
    } else {
      // Open the interactive QR Scanner modal
      openScannerModal();
    }
  }

  // 3. Interactive QR Scanner & Download Modal
  function createScannerModal() {
    var modal = document.getElementById('qrScannerModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'qrScannerModal';
    modal.className = 'scanner-modal-backdrop';
    modal.innerHTML = '' +
      '<div class="scanner-modal-card">' +
      '  <button type="button" class="scanner-modal-close" aria-label="Close modal">&times;</button>' +
      '  <div class="scanner-header">' +
      '    <div class="scanner-badge-icon">' +
      '      <img src="img/app-icon.svg" alt="Prashant Jha App Icon" width="44" height="44">' +
      '    </div>' +
      '    <div class="scanner-header-text">' +
      '      <h3>Download Mobile App</h3>' +
      '      <p>Scan with your phone camera to install instantly</p>' +
      '    </div>' +
      '  </div>' +
      '  <div class="scanner-frame-wrapper">' +
      '    <div class="scanner-frame">' +
      '      <div class="scanner-corner corner-tl"></div>' +
      '      <div class="scanner-corner corner-tr"></div>' +
      '      <div class="scanner-corner corner-bl"></div>' +
      '      <div class="scanner-corner corner-br"></div>' +
      '      <div class="scanner-laser"></div>' +
      '      <div class="scanner-qr-box">' +
      '        <img id="scannerQrImage" class="scanner-qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://prashay.github.io/prashantj/&bgcolor=ffffff&color=090d16&margin=12" alt="Scan to download app" width="220" height="220">' +
      '        <div class="scanner-brand-pill">' +
      '          <span>PRASHANT.JHA</span>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="scanner-status">' +
      '      <span class="scanner-pulse-dot"></span>' +
      '      <span class="scanner-status-text">Point Phone Camera to Scan & Install</span>' +
      '    </div>' +
      '  </div>' +
      '  <div class="scanner-actions">' +
      '    <button type="button" class="scanner-btn-primary" id="scannerDirectInstallBtn">' +
      '      <i class="fa fa-mobile mr-2" style="font-size: 18px;"></i> Install Directly on Device' +
      '    </button>' +
      '    <div class="scanner-btn-group">' +
      '      <button type="button" class="scanner-btn-secondary" id="scannerCopyLinkBtn">' +
      '        <i class="fa fa-clone mr-1"></i> Copy Link' +
      '      </button>' +
      '      <a href="https://www.pwabuilder.com/" target="_blank" class="scanner-btn-secondary" id="scannerApkBtn" title="Download Android APK via PWABuilder">' +
      '        <i class="fa fa-android mr-1"></i> APK Info' +
      '      </a>' +
      '    </div>' +
      '  </div>' +
      '  <div class="scanner-copy-toast" id="scannerCopyToast">Link copied to clipboard!</div>' +
      '</div>';

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('.scanner-modal-close').onclick = closeScannerModal;
    modal.onclick = function (e) {
      if (e.target === modal) closeScannerModal();
    };

    // Direct install button
    modal.querySelector('#scannerDirectInstallBtn').onclick = function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (result) {
          if (result.outcome === 'accepted') closeScannerModal();
          deferredPrompt = null;
        });
      } else if (isIos()) {
        closeScannerModal();
        showIosInstallGuide();
      } else {
        alert('To install: open this page on your mobile browser (Chrome/Edge/Safari) and tap "Install App" or "Add to Home screen".');
      }
    };

    // Copy link button
    modal.querySelector('#scannerCopyLinkBtn').onclick = function () {
      var copyText = APP_URL;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(showCopyToast);
      } else {
        var input = document.createElement('input');
        input.value = copyText;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showCopyToast();
      }
    };

    return modal;
  }

  function showCopyToast() {
    var toast = document.getElementById('scannerCopyToast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 2400);
    }
  }

  function openScannerModal() {
    var modal = createScannerModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeScannerModal() {
    var modal = document.getElementById('qrScannerModal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  function showIosInstallGuide() {
    var modal = document.getElementById('pwaIosModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pwaIosModal';
      modal.className = 'pwa-install-modal';
      modal.innerHTML = '' +
        '<div class="pwa-modal-backdrop"></div>' +
        '<div class="pwa-modal-card">' +
        '  <div class="pwa-modal-header">' +
        '    <img src="img/app-icon.svg" width="48" height="48" alt="App Icon">' +
        '    <h4>Install on iPhone / iPad</h4>' +
        '    <button type="button" class="pwa-modal-close">&times;</button>' +
        '  </div>' +
        '  <div class="pwa-modal-body">' +
        '    <p>Install Prashant Jha Portfolio as a native app on your home screen in 2 simple taps:</p>' +
        '    <div class="pwa-step"><strong>1.</strong> Tap the <b>Share</b> button <i class="fa fa-share-square-o"></i> in Safari\'s bottom toolbar.</div>' +
        '    <div class="pwa-step"><strong>2.</strong> Scroll down and select <b>Add to Home Screen</b> <i class="fa fa-plus-square-o"></i>.</div>' +
        '  </div>' +
        '  <button type="button" class="white_bg_btn pwa-modal-gotit">Got it!</button>' +
        '</div>';
      document.body.appendChild(modal);

      modal.querySelector('.pwa-modal-close').onclick = function () { modal.classList.remove('active'); };
      modal.querySelector('.pwa-modal-backdrop').onclick = function () { modal.classList.remove('active'); };
      modal.querySelector('.pwa-modal-gotit').onclick = function () { modal.classList.remove('active'); };
    }
    modal.classList.add('active');
  }

  // 4. Attach Click Triggers to all Download / Install Buttons
  function bindTriggers() {
    document.querySelectorAll('.app-download-btn, .pwa-install-trigger, [data-action="download-app"]').forEach(function (btn) {
      btn.onclick = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        openScannerModal();
      };
    });
  }

  // Initial load binding
  document.addEventListener('DOMContentLoaded', function () {
    bindTriggers();
    var staleBanner = document.getElementById('pwaInstallBanner');
    if (staleBanner) {
      staleBanner.remove();
    }
  });

  // Global exposure
  window.openAppScanner = openScannerModal;
  window.closeAppScanner = closeScannerModal;
  window.installPwaApp = triggerInstallFlow;
})();
