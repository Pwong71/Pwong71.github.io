const slider = new KeenSlider('main .keen-slider', {
  slidesPerView: 3.5,
  mode: 'free-snap',
  spacing: 16 * 3.25, // 3.25em at 16px :root font-size
  created: instance => {
    document.querySelector('#slider-l').addEventListener('click', () => instance.prev());
    document.querySelector('#slider-r').addEventListener('click', () => instance.next());
  }
});