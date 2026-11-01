/* Single-URL bilingual metadata; the HTML source supplies English crawler defaults. */
window.updatePageMetadataLanguage = function(lang) {
  const attribute = lang === 'es' ? 'data-meta-es' : 'data-meta-en';
  document.querySelectorAll('head [data-meta-en]').forEach(element => {
    const value = element.getAttribute(attribute);
    if (element.tagName === 'TITLE') element.textContent = value;
    else element.setAttribute('content', value);
  });
};
