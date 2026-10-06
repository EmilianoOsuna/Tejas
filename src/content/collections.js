/** Dishes, gallery pieces and merch. Copy only — no markup. */

// Plates on the rail. Every photo is masked to a circle — it is a plate.
export const dishes = [
  {
    name: 'brisket & blues sandwich',
    desc: 'Chopped brisket, blue cheese, pickled red onion, on a soft bun.',
    photo: { slug: 'Brisket & Blues sandwich, 3/4 view, plate cut-out' },
  },
  {
    name: 'elm street tacos',
    desc: 'Three flour tortillas, your meat, queso fresco, salsa verde.',
    photo: { slug: 'Elm Street tacos, three on a tray' },
  },
  {
    name: 'pork belly burnt ends',
    desc: 'Cubed, glazed, and back on the smoker until the edges candy.',
    photo: { slug: 'Pork belly burnt ends, overhead in butcher paper' },
  },
  {
    name: 'chile relleno sausage',
    desc: 'Roasted poblano and cheese, stuffed into a coarse-ground link.',
    photo: { slug: 'Chile relleno sausage, sliced on the bias' },
  },
  {
    name: 'chocolate panna cotta',
    desc: 'Made with our own 70% bar. Both halves of the shop on one spoon.',
    photo: { slug: 'Chocolate panna cotta, side light, dark ground' },
  },
];

/**
 * Fourteen tiles, read top to bottom. The shapes and proportions belong to the
 * layout (components/sections/Gallery.astro), not to the photo — a picture is
 * cropped to whatever tile it lands in. `video` marks the two short loops.
 */
export const galleryTiles = [
  { slug: 'Guests at the counter' },
  { slug: 'The pit door, ember glow' },
  { slug: 'Pitmaster at the smoker, portrait' },
  { slug: 'Dining room, wide, golden hour' },
  { slug: 'Full spread on butcher paper, overhead' },
  { slug: 'Brisket slice, slow motion', video: true },
  { slug: 'Chocolate bars wrapped, flat lay' },
  { slug: 'Post oak stacked by the pit' },
  { slug: 'Elm Street storefront, evening' },
  { slug: 'Truffles in the case, close' },
  { slug: 'Tempering chocolate on the slab · 10s loop', video: true },
  { slug: 'Butcher paper and a pen, receipts' },
  { slug: 'The line out the door, Saturday' },
  { slug: 'Cacao pods split open' },
];

export const merch = [
  { name: '10 year anniversary tee', price: '$32', mask: 'arch',  slug: '10 Year tee, flat lay on post oak' },
  { name: 'embroidered dad hat',     price: '$28', mask: 'leaf',  slug: 'Dad hat, 3/4 on neutral ground' },
  { name: 'richardson trucker cap',  price: '$30', mask: 'petal', slug: 'Richardson trucker cap, front' },
  { name: 'organic cotton apron',    price: '$46', mask: 'dome',  slug: 'Organic cotton apron, hanging, worn' },
];
