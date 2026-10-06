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
        paper: '#F4EADB',    // kraft-cream ground — butcher paper, not white
        'paper-2': '#EADCC8',
        ink: '#1B100B',
        warm: '#FBF3E6',
        red: '#B8420F',      // burnt ember, 4.6:1 on paper — AA for normal text
        'red-d': '#8F3009',
        'red-l': '#FF7A3D',  // the ember that works on a dark ground
        oxblood: '#2B140C',  // cacao
        char: '#120A07',
        smoke: '#6B5A4B',    // 5.5:1 on paper — AA
        'smoke-d': '#CDB9A3',
        ember: '#FF6A2B',
        gold: '#E9B44C',     // foil on the chocolate wrapper
        kraft: '#C89B64',
      },
      fontFamily: {
        display: ["'Fraunces'", 'Georgia', 'serif'],
        ui: ["'Archivo'", 'ui-sans-serif', 'system-ui', '-apple-system', "'Segoe UI'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
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
