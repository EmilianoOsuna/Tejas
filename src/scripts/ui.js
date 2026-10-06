/**
 * Non-animated behaviour: the mobile panel and the contact form.
 * None of this is gated on prefers-reduced-motion — it has to work regardless.
 */

/* ---- mobile panel: the burger is also the close button ----------------- */
function mobilePanel() {
  const panel = document.getElementById('panel');
  const burger = document.getElementById('burger');
  if (!panel || !burger) return;

  const setOpen = (on) => {
    panel.classList.toggle('is-open', on);
    panel.toggleAttribute('inert', !on);
    panel.setAttribute('aria-hidden', String(!on));
    burger.classList.toggle('is-open', on);
    burger.setAttribute('aria-expanded', String(on));
    burger.setAttribute('aria-label', on ? 'Close menu' : 'Menu');
    document.body.style.overflow = on ? 'hidden' : '';
    // motion.js stops and restarts the smooth scroller on this.
    document.dispatchEvent(new CustomEvent('panel', { detail: on }));
    if (on) panel.querySelector('a')?.focus();
  };

  burger.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });

  document.addEventListener('keydown', (e) => {
    if (!panel.classList.contains('is-open')) return;
    if (e.key === 'Escape') { setOpen(false); burger.focus(); return; }
    if (e.key !== 'Tab') return;
    // Focus lives in the burger and the panel's own links, nowhere else.
    const f = [burger, ...panel.querySelectorAll('a[href]')];
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---- contact form ------------------------------------------------------ */
function contactForm() {
  const f = document.getElementById('form');
  if (!f) return;
  const em = document.getElementById('em');
  const msg = document.getElementById('msg');
  const emErr = document.getElementById('emErr');
  const msgErr = document.getElementById('msgErr');
  const note = document.getElementById('formNote');

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    emErr.textContent = '';
    msgErr.textContent = '';
    note.textContent = '';

    let ok = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) {
      emErr.textContent = 'Enter a valid email address';
      ok = false;
    }
    if (!msg.value.trim()) {
      msgErr.textContent = 'Add a message before sending';
      ok = false;
    }
    if (!ok) { (emErr.textContent ? em : msg).focus(); return; }

    note.textContent = 'Sending…';
    try {
      const res = await fetch(f.action, {
        method: 'POST',
        body: new FormData(f),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      note.textContent = 'Thanks — we will be in touch.';
      f.reset();
    } catch {
      // The captured content stays in the fields so nothing is lost.
      note.textContent = 'That did not send. Try again, or call us.';
    }
  });
}

mobilePanel();
contactForm();
