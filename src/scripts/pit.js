/**
 * Two small pieces of Tejas that live above the page:
 *  - the pit clock: scrolling is cooking. Hours and the brisket's internal
 *    temperature follow the scroll, stall included (it always stalls).
 *  - ember cursor: sparks lift off the pointer.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- pit clock ----------------------------------------------------------- */
const pit = document.querySelector('[data-pit]');
if (pit) {
  const hr = pit.querySelector('[data-pit-hr]');
  const temp = pit.querySelector('[data-pit-temp]');
  const bar = pit.querySelector('[data-pit-bar]');
  const note = pit.querySelector('[data-pit-note]');
  const lerp = (a, b, t) => a + (b - a) * t;
  // 38°F raw → 150°F at the stall → a long plateau → 203°F probe-tender.
  const internal = (p) => (p < 0.45 ? lerp(38, 150, p / 0.45) : p < 0.65 ? lerp(150, 165, (p - 0.45) / 0.2) : lerp(165, 203, (p - 0.65) / 0.35));
  const say = (p) => (p < 0.04 ? 'the fire is lit' : p < 0.45 ? 'bark is forming' : p < 0.65 ? 'the stall. be patient.' : p < 0.9 ? 'wrapped in paper' : p < 0.99 ? 'probe tender' : 'rest. then slice.');
  let shown = 0, goal = 0, raf = 0;

  const draw = () => {
    raf = 0;
    shown += (goal - shown) * 0.12;
    hr.textContent = String(Math.round(shown * 12)).padStart(2, '0');
    temp.textContent = `${Math.round(internal(shown))}°F`;
    bar.style.transform = `scaleX(${shown})`;
    note.textContent = say(shown);
    if (Math.abs(goal - shown) > 0.001) raf = requestAnimationFrame(draw);
  };
  const read = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    goal = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    if (reduced) { shown = goal; draw(); } else if (!raf) raf = requestAnimationFrame(draw);
  };
  addEventListener('scroll', read, { passive: true });
  addEventListener('resize', read);
  read();
}

/* ---- ember cursor --------------------------------------------------------- */
const cv = document.querySelector('[data-embers]');
if (cv && !reduced && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const ctx = cv.getContext('2d');
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
  fit();
  addEventListener('resize', fit);

  const sparks = [];
  let raf = 0, lx = 0, ly = 0;
  const tick = () => {
    raf = 0;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= 0.022;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      s.vy -= 0.018; s.x += s.vx + Math.sin(s.life * 14 + s.ph) * 0.35; s.y += s.vy;
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.life > 0.55 ? '#FFD08A' : s.life > 0.3 ? '#FF6A2B' : '#B8420F';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * (0.4 + s.life), 0, 6.283); ctx.fill();
    }
    if (sparks.length) raf = requestAnimationFrame(tick);
  };
  addEventListener('pointermove', (e) => {
    const d = Math.hypot(e.clientX - lx, e.clientY - ly);
    lx = e.clientX; ly = e.clientY;
    for (let n = Math.min(3, 1 + (d > 14 ? 1 : 0) + (d > 40 ? 1 : 0)); n--;) {
      if (sparks.length > 90) break;
      sparks.push({ x: lx + (Math.random() - 0.5) * 8, y: ly + (Math.random() - 0.5) * 8, vx: (Math.random() - 0.5) * 0.9, vy: -0.4 - Math.random() * 0.9, r: 1 + Math.random() * 1.8, life: 0.7 + Math.random() * 0.3, ph: Math.random() * 6 });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
}
