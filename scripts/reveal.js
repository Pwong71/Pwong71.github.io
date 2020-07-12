ScrollReveal().reveal('.content', {
  reset: true,
  origin: 'bottom',
  viewOffset: { top: 100, bottom: 400 },
  beforeReveal: content => {
    document.querySelectorAll('ol.sticky li').forEach(li => {
      const id = li.querySelector('h2').getAttribute('id');
      if (content.getAttribute('aria-labelledby') === id) li.classList.add('active');
      else li.removeAttribute('class');
    });
  }
});