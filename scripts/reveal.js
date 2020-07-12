ScrollReveal().reveal('.content', {
  reset: true,
  origin: 'bottom',
  viewOffset: { top: 50, bottom: 500 },
  beforeReveal: content => {
    const sideItems = document.querySelectorAll('ol.sticky li');
    sideItems.forEach(li => {
      const id = li.querySelector('h2').getAttribute('id');
      if (content.getAttribute('aria-labelledby') === id) li.classList.add('active');
      else li.removeAttribute('class');
    });
  }
});