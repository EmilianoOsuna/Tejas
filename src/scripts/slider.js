/**
 * The plate rail. One plate centred, neighbours cropped by the page edges,
 * a new plate every 2s over a 1s glide, looping. Counter and progress line
 * follow the real index; the dish name wipes in the first time its plate is
 * both centred and on screen.
 */
import Swiper from 'swiper';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';

const root = document.querySelector('[data-bowl]');

if (root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = root.querySelector('[data-now]');
  const bar = root.querySelector('[data-bar]');
  const pause = root.querySelector('[data-pause]');
  const total = root.querySelectorAll('.swiper-slide').length; // counted before loop clones

  const sw = new Swiper(root, {
    modules: [Autoplay, Keyboard, A11y],
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 110,
    speed: 1000,
    breakpoints: { 0: { spaceBetween: 20 }, 641: { spaceBetween: 110 }, 1920: { spaceBetween: 150 }, 2500: { spaceBetween: 200 } },
    // Reduced motion never autoplays. Otherwise: hovering pauses it, and using
    // the arrows or dragging stops it for good until the pause button restarts it.
    autoplay: reduced ? false : { delay: 2000, pauseOnMouseEnter: true },
    keyboard: { enabled: true },
    a11y: { slideLabelMessage: 'Dish {{index}} of {{slidesLength}}' },
  });

  root.querySelector('[data-prev]').addEventListener('click', () => sw.slidePrev());
  root.querySelector('[data-next]').addEventListener('click', () => sw.slideNext());

  /* ---- counter and progress ------------------------------------------- */
  const sync = () => {
    now.textContent = String(sw.realIndex + 1).padStart(2, '0');
    bar.style.transform = `scaleX(${(sw.realIndex + 1) / total})`;
  };
  sw.on('realIndexChange', sync);
  sync();

  /* ---- pause control (WCAG 2.2.2) ------------------------------------- */
  if (reduced) {
    pause.hidden = true;
  } else {
    const label = (running) => {
      pause.textContent = running ? 'pause' : 'play';
      pause.setAttribute('aria-label', running ? 'Pause the carousel' : 'Play the carousel');
    };
    pause.addEventListener('click', () => (sw.autoplay.running ? sw.autoplay.stop() : sw.autoplay.start()));
    sw.on('autoplayStart', () => label(true));
    sw.on('autoplayStop', () => label(false));
  }

  /* ---- dish name wipes in once ---------------------------------------- */
  if (!reduced) {
    const caps = [...root.querySelectorAll('.bowl__cap')];
    const seen = new Set(); // by text: loop clones share their original's wipe
    const onScreen = new Set();

    const wipe = () => {
      caps.forEach((cap) => {
        const slide = cap.closest('.swiper-slide');
        const key = cap.textContent.trim();
        if (seen.has(key) || !slide.classList.contains('swiper-slide-active') || !onScreen.has(cap)) return;
        seen.add(key);
        caps.filter((c) => c.textContent.trim() === key).forEach((c) => c.classList.add('is-in'));
      });
    };

    caps.forEach((c) => c.classList.add('wipe'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      wipe();
    }, { threshold: 0.1 });
    caps.forEach((c) => io.observe(c));
    sw.on('slideChangeTransitionStart', wipe);
    sw.on('transitionEnd', wipe);
  }
}
