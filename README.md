# Tejas Chocolate + Barbecue

Home page redesign. Replaces the Wix site at tejaschocolate.com.

Astro, static output. Tailwind for the tokens, GSAP + ScrollTrigger + Lenis for
motion. No React, no CMS.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Where things are

```
src/
  content/          all copy and data — edit the site here, not in components
    site.js         name, address, hours, nav, hero, statement, crafts, quote
    collections.js  dishes, gallery, merch
  components/
    Plate.astro     a masked photograph (or its labelled placeholder)
    CircleButton.astro
    Header.astro    fixed header + mobile panel
    Footer.astro    order band + footer
    sections/
  scripts/
    ui.js           panel, header inversion, carousel, contact form
    motion.js       every animation, behind one reduced-motion gate
  styles/global.css
tailwind.config.mjs the design tokens
docs/shot-list.md   the photography this build is waiting on
openspec/           the specs this was built against
```

## Rules that are load-bearing

Three things here look like style choices and are not. Each one is a spec
requirement with a scenario attached, and each was a bug before it was a rule.

**1. The reduced-motion gate is one boolean.**
`matchMedia('(prefers-reduced-motion: reduce)').matches` — never a
complementary pair of `reduce` / `no-preference` queries. In an environment
that reports neither, neither branch runs and the page is left mid-animation.

**2. Everything is authored visible; GSAP animates *from* an offset.**
If `motion.js` fails to load, the page still reads. Anything that covers
content — the intro curtain — starts hidden in CSS, is shown only when it is
about to be removed, and carries a hard-floor `setTimeout` that removes it
regardless. Never `height` + `overflow: hidden` to force a fit either: clipped
content is not visible content.

**3. Entrance tweens do not run in a background tab.**
`requestAnimationFrame` is paused there, so a tween created in a hidden tab
freezes at its start values — a hero with no headline for anyone who
ctrl+clicks the link. `motion.js` checks `document.visibilityState` and simply
skips those tweens; the markup is already in its final state.

## Full-viewport sections

Six sections are exactly one viewport tall and their contents must fit inside
it. Every element carries a width cap **and** a dvh cap:

```css
width: min(46vw, 340px, 27dvh);   /* an arch is 3:4, so this is 36dvh tall */
font-size: clamp(3rem, min(0.4rem + 15.3vw, 16dvh), 13rem);
```

Verified at 375×812, 768×1024, 1024×640, 1440×900 and 1920×1080. Below 560px of
viewport height the constraint lifts and the sections flow — forcing a photo, a
display word and a line of copy into that height makes all three illegible.

## Before launch

- [ ] Photography and video — see `docs/shot-list.md`. This blocks launch.
- [ ] Replace the Formspree endpoint in `src/components/sections/Contact.astro`.
- [ ] Confirm the phone number in `src/content/site.js` against the live listing.
- [ ] Point `site.links.shop` / `order` / `giftCards` at their real destinations.
- [ ] Redirects from the existing Wix URLs (separate change).
