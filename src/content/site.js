/**
 * All site copy and data lives here, never inside a component.
 * Editing the site means editing this folder.
 */

export const site = {
  name: 'Tejas',
  tagline: 'chocolate + barbecue',
  title: 'Tejas Chocolate + Barbecue — Tomball, Texas',
  description:
    'Craft bean-to-bar chocolate and authentic Texas barbecue under one tin roof in Tomball. Open Tuesday through Sunday.',
  founded: 2011,

  address: {
    street: '200 N. Elm Street',
    city: 'Tomball',
    region: 'Texas',
    postal: '77375',
    country: 'US',
  },

  // TODO(content): confirm against the live listing before launch — the Wix
  // site does not publish a phone number. See design.md Open Questions.
  phone: { display: '281.351.9918', href: '+12813519918' },

  hours: [
    { days: 'Tue–Sat', time: '11am – 9pm' },
    { days: 'Sun–Mon', time: '11am – 5pm' },
  ],
  hoursNote: 'Breakfast tacos · Thu–Sun · 8–11am',

  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/tejaschocolate/' },
    { label: 'Facebook', href: 'https://www.facebook.com/tejaschocolate/' },
  ],

  // External destinations. These still point at the current Wix properties
  // until those routes are migrated — see proposal.md, What Changes.
  links: {
    menu: '#menu',
    about: '#about',
    catering: '#contact',
    shop: 'https://www.tejaschocolate.com/shop',
    giftCards: 'https://www.tejaschocolate.com/gift-cards',
    order: 'https://www.tejaschocolate.com/order-to-go',
    contact: '#contact',
  },

  // Two on the left, two on the right, plus the order CTA the header adds
  // after them — the same 2 / logo / 3 rhythm as the reference.
  nav: {
    left: [
      { label: 'Menu', key: 'menu' },
      { label: 'About', key: 'about' },
    ],
    right: [
      { label: 'Shop', key: 'shop' },
      { label: 'Contact', key: 'contact' },
    ],
  },
  footerNav: [
    { label: 'Menu', key: 'menu' },
    { label: 'About', key: 'about' },
    { label: 'Catering', key: 'catering' },
    { label: 'Gift card', key: 'giftCards' },
  ],
};

/**
 * Four frames flashed 0.5s apiece on a white screen before the hero fades in.
 * A frame is a word until a cut-out photo exists: add `src` ('/media/…png') and
 * it shows the picture instead.
 */
export const intro = {
  frames: [{ word: 'smoke' }, { word: 'cacao' }, { word: 'oak' }, { word: 'tejas' }],
};

export const hero = {
  headline: 'low and slow, bean to bar.',
  cta: { label: ['See', 'menu'], key: 'menu' },
  media: {
    // Replace with the delivered assets (tasks 7.3–7.5). Until then the hero
    // renders a labelled placeholder rather than a broken <video>.
    poster: '/media/hero-poster.jpg',
    slug: 'The pit at first light · 12s silent loop · 1920×1080 · poster below 768px',
  },
};

export const statement =
  'a texas smokehouse and a craft chocolate shop, under one tin roof in tomball.';

/**
 * The two halves of the "eat / sip" screen. Hovering one tints the whole band,
 * turns the word white and drags an arch of photography behind the cursor.
 *
 * `base` is the photo inside the arch. `floats` are cut-out PNGs that ride on
 * top at their own `strength` (negative = against the cursor); they render only
 * once `src` exists.
 */
export const eatSip = [
  {
    id: 'smoke',
    word: 'smoke',
    key: 'menu',
    tint: '#e6cfa9',
    base: { slug: 'Brisket bark sliced, steam visible · 12s silent loop', src: '/media/eat-smoke-poster', clip: '/media/eat-smoke.mp4', alt: '', strength: -5, scale: 1.5, max: 120 },
    floats: [],
  },
  {
    id: 'cacao',
    word: 'cacao',
    key: 'shop',
    tint: '#dfb89b',
    base: { slug: 'Cacao nibs on the winnower, overhead, raking light', src: '/media/e-cacao', alt: '', strength: -1, scale: 1.4, max: 100 },
    floats: [
      // { src: '/media/cacao-pod.png', alt: '', strength: -7, scale: 1, className: 'eat-float--tr' },
    ],
  },
];

export const gallery = {
  headline: 'slow smoke, sweet finish.',
  more: 'more on instagram',
  // Cut-outs that drift against the cursor around the oval (≥768px). Each is
  // placed with `style` inside a 1430×1323 stage and shifts by `depth`.
  //   { src: '/media/onion.png', alt: '', w: 367, h: 433, depth: 0.3, style: 'left:0;bottom:-8%' }
  floaters: [],
  // The cut-out that rises through the oval as you scroll (any transparent PNG).
  riser: null, // { src: '/media/rib.png', alt: '' }
};

/** Cut-out that slides in from the right over the order band. */
export const footerDecor = null; // { src: '/media/post-oak.png', alt: '' }

/** Cut-out spilling in from the left where the statement meets the plate rail. */
export const bowlDecor = null; // { src: '/media/rub-dust.png', alt: '' }

/** The ticker between the hero and the statement. */
export const marquee = ['post oak', '225°f', 'twelve hours', '70% cacao', 'bean to bar', 'tomball, texas'];

/**
 * "Two fires, one roof": the pinned section where the pit and the chocolate
 * room advance in step. DRAFT COPY — placeholder facts until the shop confirms them.
 */
export const craft = {
  label: 'two fires, one roof',
  headline: 'smoke on one side, cacao on the other.',
  steps: [
    { smoke: { title: 'split & stack', text: 'Post oak, split by hand and stacked to season.', photo: 'g-oak', alt: 'Stacked firewood' },
      cacao: { title: 'source', text: 'Single-origin beans, sorted by hand.', photo: 'g-cacao', alt: 'Cacao tree leaves' } },
    { smoke: { title: 'rub & rest', text: 'Salt, pepper and time. Nothing else touches the meat.', photo: 'dish-belly', alt: 'Glazed pork belly' },
      cacao: { title: 'roast', text: 'Small batches, roasted until the shop smells like dessert.', photo: 'e-cacao', alt: 'Cacao nibs in a bowl' } },
    { smoke: { title: 'low & slow', text: '225°F and a lot of patience.', photo: 'g-embers', alt: 'Glowing embers' },
      cacao: { title: 'conch', text: 'Hours of grinding until it turns to silk.', photo: 'g-temper', alt: 'Chocolate in a tempering wheel' } },
    { smoke: { title: 'wrap & rest', text: 'Butcher paper, then an hour of doing nothing.', photo: 'g-paper', alt: 'Meat on butcher paper' },
      cacao: { title: 'temper', text: 'Heat, cool, heat again — for the snap.', photo: 'g-chocbars', alt: 'A dark chocolate bar' } },
    { smoke: { title: 'slice to order', text: 'Cut when you order, never before.', photo: 'dish-sandwich', alt: 'Smoked meat on a bun' },
      cacao: { title: 'wrap by hand', text: 'Every bar wrapped in-house, one at a time.', photo: 'g-case', alt: 'Chocolates in a display case' } },
  ],
};
