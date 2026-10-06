/**
 * All scroll and pointer animation. (The intro is CSS — see global.css — and the
 * plate rail is slider.js.)
 *
 * Two rules this file exists to enforce (design.md D4 and D11):
 *
 *  1. The reduced-motion gate is ONE boolean query. Never a complementary
 *     pair (`reduce` / `no-preference`) — in an environment that reports
 *     neither, no branch runs and the page is left mid-animation.
 *  2. Elements are authored VISIBLE in the HTML and gsap animates *from* an
 *     offset. If this file never loads, the page still reads. Anything that
 *     covers content starts hidden in CSS and gets a hard-floor timeout.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, m) => Math.max(-m, Math.min(m, v));

// The first screen is an entrance; restoring to mid-page would skip it.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
addEventListener('pageshow', () => { if (!location.hash) scrollTo(0, 0); });

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
  /* ---- smooth scroll ---------------------------------------------------- */
  const lenis = new Lenis({ duration: 1.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // The mobile panel locks the page behind it.
  document.addEventListener('panel', (e) => (e.detail ? lenis.stop() : lenis.start()));

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el);
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    });
  });

  /* ---- two fires, one roof: pinned, one step per beat ------------------- */
  const craft = document.querySelector('[data-craft]');
  if (craft) {
    craft.classList.add('is-pinned');
    const steps = [...craft.querySelectorAll('[data-step]')];
    const bar = craft.querySelector('[data-craft-bar]');
    const n = steps.length;
    gsap.set(steps.slice(1), { autoAlpha: 0 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: craft.querySelector('.craft__stage'), start: 'top top', end: () => `+=${n * 75}%`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
    });
    tl.fromTo(bar, { scaleX: 1 / n }, { scaleX: 1, duration: n - 1 }, 0);
    steps.forEach((st, i) => {
      if (!i) return;
      const prev = steps[i - 1];
      tl.to(prev, { autoAlpha: 0, y: -30, duration: 0.3 }, i - 0.15)
        .fromTo(st, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, i + 0.05)
        .fromTo(st.querySelector('[data-side=smoke]'), { x: -60 }, { x: 0, duration: 0.4 }, i)
        .fromTo(st.querySelector('[data-side=cacao]'), { x: 60 }, { x: 0, duration: 0.4 }, i);
    });
    tl.to({}, { duration: 0.5 });
  }

  /* ---- the statement: every letter arrives as the line scrolls through --- */
  const statement = document.querySelector('[data-statement]');
  if (statement) {
    SplitText.create(statement, {
      type: 'words,chars',
      autoSplit: true, // re-split (and rebuild below) when the width or the font changes
      onSplit(self) {
        gsap.set(self.chars, { opacity: 0, yPercent: -15, scaleX: 0.7, transformOrigin: '50% 0%' });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statement,
            start: innerWidth < 768 ? '20px 75%' : '15% 80%',
            end: '+=30%',
            scrub: 2,
          },
        });
        self.chars.forEach((c, i) => tl.to(c, { opacity: 1, yPercent: 0, scaleX: 1, duration: 0.3, ease: 'none' }, i * 0.04));
        return tl;
      },
    });
  }

  /* ---- headlines that wipe in the first time they are on screen ----------
     (the plate rail's own captions are handled in slider.js) -------------- */
  const wipeIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      wipeIO.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-wipe]:not(.bowl [data-wipe])').forEach((el) => {
    el.classList.add('wipe');
    wipeIO.observe(el);
  });

  /* ---- gallery tiles rise into place, once each -------------------------- */
  document.querySelectorAll('[data-tile]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0, y: 50, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
    });
  });

  /* ---- the oval: its photo drifts inside it, the cut-out rises through it - */
  document.querySelectorAll('.oval').forEach((oval) => {
    const st = { trigger: oval, start: 'top bottom', end: 'bottom top', scrub: true };
    const base = oval.querySelector('[data-oval-base]');
    if (base) gsap.fromTo(base, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: st });

    // The cut-out travels (scroll offset ÷ 2·speed): it starts H/k below where it
    // sits, ends the oval's height/k above, so it moves faster than the page.
    const rise = oval.querySelector('[data-rise]');
    if (rise) {
      const k = (parseFloat(rise.dataset.rise) || 3) * 2;
      gsap.fromTo(rise, { y: () => innerHeight / k }, {
        y: () => -oval.offsetHeight / k, ease: 'none',
        scrollTrigger: { ...st, invalidateOnRefresh: true },
      });
    }
  });

  /* ---- cut-outs around the oval drift against the cursor ------------------ */
  const stage = document.querySelector('[data-floaters]');
  if (stage && matchMedia('(min-width: 768px) and (hover: hover)').matches) {
    const layers = [...stage.querySelectorAll('[data-depth]')].map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
      d: parseFloat(el.dataset.depth) || 0.2,
    }));
    let live = false;
    ScrollTrigger.create({ trigger: stage, start: 'top bottom', end: 'bottom top', onToggle: (s) => { live = s.isActive; } });
    addEventListener('pointermove', (e) => {
      if (!live) return;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      layers.forEach((l) => { l.x(-nx * l.d * innerWidth * 0.1); l.y(-ny * l.d * innerWidth * 0.1); });
    }, { passive: true });
  }

  /* ---- eat / sip: an arch follows the cursor, its contents drag behind ---- */
  const eatSip = document.querySelector('[data-eatsip]');
  if (eatSip && matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)').matches) {
    eatSip.querySelectorAll('.eat-sip__box').forEach((box) => {
      const arch = box.querySelector('[data-arch]');
      const layers = [...arch.querySelectorAll('[data-layer]')];
      layers.forEach((l) => gsap.set(l, { scale: parseFloat(l.dataset.zoom) || 1 }));

      let px = 0, py = 0, lastX = 0, lastY = 0, over = false, frame = 0;

      // The arch itself tracks the cursor with no easing; only its contents lag.
      const place = () => {
        const r = box.getBoundingClientRect();
        arch.style.left = `${px - r.left}px`;
        arch.style.top = `${py - r.top}px`;
        return [px - r.left, py - r.top];
      };

      const drag = () => {
        frame = 0;
        const [x, y] = place();
        const dx = x - lastX, dy = y - lastY;
        layers.forEach((l) => {
          const s = parseFloat(l.dataset.strength) || 0;
          const m = parseFloat(l.dataset.max) || 100;
          gsap.to(l, { x: clamp(dx * s, m), y: clamp(dy * s, m), duration: 1, ease: 'power3.out', overwrite: 'auto' });
        });
        lastX = x; lastY = y;
      };

      const enter = () => { eatSip.style.backgroundColor = box.dataset.tint; };
      const leave = () => {
        over = false;
        eatSip.style.backgroundColor = '';
        arch.style.left = arch.style.top = '';
        layers.forEach((l) => gsap.to(l, { x: 0, y: 0, duration: 1, ease: 'power3.out', overwrite: 'auto' }));
      };

      box.addEventListener('pointerenter', (e) => {
        over = true; px = e.clientX; py = e.clientY;
        [lastX, lastY] = place();
        enter();
      });
      box.addEventListener('pointermove', (e) => {
        px = e.clientX; py = e.clientY;
        place();
        if (!frame) frame = requestAnimationFrame(drag);
      });
      box.addEventListener('pointerleave', leave);
      box.addEventListener('focusin', enter);
      box.addEventListener('focusout', leave);
      // Scrolling moves the box under a still cursor; keep the arch on the cursor.
      lenis.on('scroll', () => { if (over) place(); });
    });
  }

  /* ---- the footer cut-out slides in from the right, and back out --------- */
  document.querySelectorAll('[data-slide-in]').forEach((el) => {
    gsap.fromTo(el, { xPercent: 150 }, {
      xPercent: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el.closest('.foot-band'), start: 'top 90%', end: 'bottom 80%', toggleActions: 'play none none reverse' },
    });
  });

  // Fonts and photographs change heights; measure again once they have settled.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
}
