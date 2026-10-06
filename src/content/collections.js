/** Dishes, gallery pieces and merch. Copy only — no markup. */

// Plates on the rail. Every photo is masked to a circle — it is a plate.
export const dishes = [
  {
    name: 'brisket & blues sandwich',
    desc: 'Chopped brisket, blue cheese, pickled red onion, on a soft bun.',
    photo: { slug: 'Brisket & Blues sandwich, 3/4 view, plate cut-out', src: '/media/dish-sandwich', alt: 'Smoked meat piled on a bun' },
  },
  {
    name: 'elm street tacos',
    desc: 'Three flour tortillas, your meat, queso fresco, salsa verde.',
    photo: { slug: 'Elm Street tacos, three on a tray', src: '/media/dish-tacos', alt: 'Four tacos on a metal tray' },
  },
  {
    name: 'pork belly burnt ends',
    desc: 'Cubed, glazed, and back on the smoker until the edges candy.',
    photo: { slug: 'Pork belly burnt ends, overhead in butcher paper', src: '/media/dish-belly', alt: 'Glazed pork belly on a speckled plate' },
  },
  {
    name: 'chile relleno sausage',
    desc: 'Roasted poblano and cheese, stuffed into a coarse-ground link.',
    photo: { slug: 'Chile relleno sausage, sliced on the bias', src: '/media/dish-sausage', alt: 'Sausages browning on rollers' },
  },
  {
    name: 'chocolate panna cotta',
    desc: 'Made with our own 70% bar. Both halves of the shop on one spoon.',
    photo: { slug: 'Chocolate panna cotta, side light, dark ground', src: '/media/dish-panna', alt: 'Panna cotta in a jar with a caramel top' },
  },
];

/**
 * Fourteen tiles, read top to bottom. The shapes and proportions belong to the
 * layout (components/sections/Gallery.astro), not to the photo — a picture is
 * cropped to whatever tile it lands in. `video` marks the two short loops.
 */
export const galleryTiles = [
  { slug: 'Guests at the counter', src: '/media/g-counter', alt: 'Customers ordering at a food counter' },
  { slug: 'The pit door, ember glow', src: '/media/g-embers', alt: 'Glowing embers in the dark' },
  { slug: 'Pitmaster at the smoker, portrait', src: '/media/g-pitmaster', alt: 'A cook working a smoking grill' },
  { slug: 'Dining room, wide, golden hour', src: '/media/g-dining', alt: 'Diners at checkered-cloth tables' },
  { slug: 'Full spread on butcher paper, overhead', src: '/media/g-spread', alt: 'Sliced beef sandwich tray on paper' },
  { slug: 'Brisket slice, slow motion', src: '/media/g-brisket-poster', alt: 'Meat searing on a grill', clip: '/media/g-brisket.mp4', video: true },
  { slug: 'Chocolate bars wrapped, flat lay', src: '/media/g-chocbars', alt: 'A dark chocolate bar' },
  { slug: 'Post oak stacked by the pit', src: '/media/g-oak', alt: 'Stacked firewood, ends facing out' },
  { slug: 'Elm Street storefront, evening', src: '/media/g-store', alt: 'Restaurant storefront with an awning' },
  { slug: 'Truffles in the case, close', src: '/media/g-case', alt: 'Chocolates in a display case' },
  { slug: 'Tempering chocolate on the slab · 10s loop', src: '/media/g-temper', alt: 'White chocolate in a tempering wheel' },
  { slug: 'Butcher paper and a pen, receipts', src: '/media/g-paper', alt: 'A tray of sliced meat on paper' },
  { slug: 'The line out the door, Saturday', src: '/media/g-line', alt: 'A queue along the sidewalk' },
  { slug: 'Cacao pods split open', src: '/media/g-cacao', alt: 'Cacao tree leaves' },
];

export const merch = [
  { name: '10 year anniversary tee', price: '$32', mask: 'arch',  slug: '10 Year tee, flat lay on post oak', src: '/media/m-tee', alt: 'A grey t-shirt laid flat' },
  { name: 'embroidered dad hat',     price: '$28', mask: 'leaf',  slug: 'Dad hat, 3/4 on neutral ground' },
  { name: 'richardson trucker cap',  price: '$30', mask: 'petal', slug: 'Richardson trucker cap, front', src: '/media/m-cap', alt: 'Trucker caps in a red bin' },
  { name: 'organic cotton apron',    price: '$46', mask: 'dome',  slug: 'Organic cotton apron, hanging, worn', src: '/media/m-apron', alt: 'A cook wearing a canvas apron' },
];
