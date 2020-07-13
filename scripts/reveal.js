// Too lazy to type .getAttribute 900 times
const aria = el => el.getAttribute('aria-labelledby');

// Run through and get all the headers beforehand
const headers = [...document.querySelectorAll('.content')].map(content => {
  const label = aria(content);
  return { [ label ]: document.querySelector(`#${label}`).parentElement };
}).reduce((acc, cur) => ({ ...acc, ...cur }), {});

ScrollReveal().reveal('.content', {
  reset: true,
  origin: 'bottom',
  viewOffset: { top: 100, bottom: 400 },
  beforeReveal: content => headers[aria(content)].classList.add('active'),
  afterReset: content => headers[aria(content)].classList.remove('active')
});