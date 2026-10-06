/**
 * Ember cursor: sparks lift off the pointer.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
