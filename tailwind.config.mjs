/**
 * Single source of truth for the design tokens described by
 * openspec/specs/site/visual-system. Values were approved on the mockup;
 * contrast ratios in the comments were measured, not estimated.
 */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F5',    // ground, HSL L 97% — spec requires >= 96%
        'paper-2': '#F1ECE5',
        ink: '#151110',      // 17.69:1 on paper
        warm: '#FBF8F4',
        red: '#B11A0A',      // 6.56:1 on paper — AA for normal text
        'red-d': '#8E1409',
        'red-l': '#D9583C',  // 4.7:1 on char — the red that works on a dark ground
        oxblood: '#3A0D08',
        char: '#171110',
        smoke: '#6E6157',    // 5.64:1 on paper — AA
        'smoke-d': '#C3B4A8',
      },
      fontFamily: {
        display: ["'Bodoni Moda'", 'Didot', "'Bodoni MT'", 'Georgia', 'serif'],
        ui: ["'Montserrat'", 'ui-sans-serif', 'system-ui', '-apple-system', "'Segoe UI'", 'sans-serif'],
      },
      fontSize: {
        // Each size is capped by a width term AND a height term, so a short
        // viewport shrinks the type instead of overflowing the section.
        d1: ['clamp(2rem, min(1.15rem + 4.7vw, 9dvh), 5.5rem)', { lineHeight: '1.5' }],
        d2: ['clamp(1.7rem, min(1.05rem + 3.6vw, 8dvh), 4.5rem)', { lineHeight: '1.5' }],
        d3: ['clamp(1.4rem, min(1.15rem + 1.5vw, 5dvh), 2.5rem)', { lineHeight: '1.5' }],
        huge: ['clamp(3rem, min(0.4rem + 15.3vw, 16dvh), 13rem)', { lineHeight: '0.9' }],
        lede: ['clamp(13px, 1.9dvh, 15px)', { lineHeight: '1.8' }],
      },
      letterSpacing: { label: '0.24em', wide: '0.2em' },
      spacing: {
        gutter: 'clamp(1.5rem, 5vw, 5rem)',
        screen: 'clamp(4.5rem, 9dvh, 8rem)',
        'screen-gap': 'clamp(16px, 3.2dvh, 46px)',
        band: 'clamp(4rem, 9vw, 8rem)',
      },
      maxWidth: { shell: '1440px' },
      borderRadius: {
        // Arch-derived masks. A plain rounded rectangle is reserved for
        // secondary grid pieces (see visual-system spec).
        arch: '50% 50% 8px 8px / 38% 38% 8px 8px',
        leaf: '8px 58% 8px 8px / 8px 62% 8px 8px',
        petal: '58% 8px 8px 8px / 62% 8px 8px 8px',
        dome: '50% 8px 8px 50% / 50% 8px 8px 50%',
        'dome-r': '8px 50% 50% 8px / 8px 50% 50% 8px',
        soft: '18px',
        wide: '50% 50% 8px 8px / 30% 30% 8px 8px',
      },
    },
  },
  plugins: [],
};
