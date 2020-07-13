const getHeader = content => document.querySelector(`h2#${content.getAttribute('aria-labelledby')}`).parentElement;

ScrollReveal().reveal('.content', {
  reset: true,
  origin: 'bottom',
  viewOffset: { top: 100, bottom: 400 },
  beforeReveal: content => getHeader(content).classList.add('active'),
  afterReset: content => getHeader(content).classList.remove('active')
});