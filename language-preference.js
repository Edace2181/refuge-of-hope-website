/* Mission 5A: preserve existing translations and remember the selected language. */
(() => {
  const key = 'refuge-of-hope-language';
  // Capture exact original English before a saved Spanish preference is applied.
  const english = Array.from(document.querySelectorAll('[id]'), element => ({
    element, html: element.innerHTML, alt: element.getAttribute('alt')
  }));
  window.restoreOriginalEnglish = () => {
    english.forEach(({element, html, alt}) => {
      element.innerHTML = html;
      if (alt !== null) element.setAttribute('alt', alt);
    });
  };
  function announceLanguage(lang) {
    if (typeof window.updatePageMetadataLanguage === 'function') window.updatePageMetadataLanguage(lang);
    document.querySelectorAll('.lang-btn').forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === (lang === 'es' ? 1 : 0)));
    });
    document.querySelectorAll('nav').forEach(nav => {
      nav.setAttribute('aria-label', lang === 'es' ? 'Navegación principal' : 'Main navigation');
    });
  }
  function remember(lang) {
    announceLanguage(lang);
    document.documentElement.lang = lang;
    try { localStorage.setItem(key, lang); } catch (_) {
      // Keep the language controls usable if storage is disabled.
    }
  }
  if (typeof window.setLanguage === 'function') {
    const original = window.setLanguage;
    window.setLanguage = function(lang) {
      lang = lang === 'es' ? 'es' : 'en';
      original(lang);
      remember(lang);
    };
  } else {
    const originalEnglish = window.showEnglish;
    const originalSpanish = window.showSpanish;
    window.showEnglish = function() { originalEnglish(); remember('en'); };
    window.showSpanish = function() { originalSpanish(); remember('es'); };
  }
  let saved = 'en';
  try { saved = localStorage.getItem(key) === 'es' ? 'es' : 'en'; } catch (_) {}
  document.documentElement.lang = saved;
  announceLanguage(saved);
  if (saved === 'es') {
    if (typeof window.setLanguage === 'function') window.setLanguage('es');
    else window.showSpanish();
  }
})();
