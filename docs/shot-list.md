# Shot list — Tejas home page

The build is complete and every image slot is wired. What is missing is the
photography. Until it lands, each slot renders a labelled placeholder naming
the shot it is waiting for, so nothing is silently blank.

This is the blocking dependency for launch (task 7.3).

## Delivery format

| | |
|---|---|
| Stills | 3000px on the long edge, sRGB, minimal retouching |
| Video | 1920×1080, H.264 + WebM, **silent**, 12s loop, ≤ 3MB after compression |
| Poster | one frame from the hero video, ≤ 120KB as AVIF |

**Framing margin matters.** Photographs are masked into arches, domes, leaves
and circles — not rectangles. Leave 15% headroom around the subject on every
shot so the mask never crops into it.

Files go in `public/media/` named as below. `Plate` resolves `src` by appending
`.avif`, `.webp` and `.jpg`, so deliver all three per still.

## Hero — 1 video + 1 poster

| File | Shot |
|---|---|
| `hero-pit` | The pit at first light. Smoke moving, fire visible, no people. Slow push in or locked off. Silent 12s loop. |

Below 768px only the poster loads; the video never downloads on a phone.

## Cover dish — 1 still

| File | Mask | Shot |
|---|---|---|
| `dish-brisket` | circle | Brisket plate, overhead, on butcher paper, hard directional light |

## The two crafts — 2 stills

| File | Mask | Shot |
|---|---|---|
| `craft-cacao` | arch | Cacao nibs on the winnower, overhead, raking light |
| `craft-smoke` | dome | Brisket bark sliced, close crop, steam visible |

## Carousel — 5 stills

All arch masks, shot consistently so the rail reads as one set.

| File | Shot |
|---|---|
| `dish-brisket-blues` | Brisket & Blues sandwich, 3/4 view |
| `dish-elm-tacos` | Elm Street tacos, three on a tray |
| `dish-burnt-ends` | Pork belly burnt ends, overhead in butcher paper |
| `dish-relleno` | Chile relleno sausage, sliced on the bias |
| `dish-panna-cotta` | Chocolate panna cotta, side light, dark ground |

## Gallery — 8 stills + 2 video loops

| File | Mask | Shot |
|---|---|---|
| `gal-counter` | circle | Guests at the counter |
| `gal-pit` | arch | Pitmaster at the smoker, portrait |
| `gal-slicing` **(video)** | leaf | Brisket slice, slow motion, 12s loop |
| `gal-bars` | soft | Chocolate bars wrapped, flat lay |
| `gal-room` | wide | Dining room, wide, golden hour |
| `gal-spread` | dome | Full spread on butcher paper, overhead |
| `gal-tempering` **(video)** | petal | Tempering chocolate on the slab, 10s loop |
| `gal-oak` | circle | Post oak stacked by the pit |
| `gal-storefront` | dome-r | Elm Street storefront, evening |
| `gal-truffles` | soft | Truffles in the case, close |

## Merch — 4 stills

| File | Mask | Shot |
|---|---|---|
| `merch-tee` | arch | 10 Year anniversary tee, flat lay on post oak |
| `merch-dadhat` | leaf | Embroidered dad hat, 3/4 on neutral ground |
| `merch-trucker` | petal | Richardson trucker cap, front |
| `merch-apron` | dome | Organic cotton apron, hanging, worn |

## Wiring an asset up

Add `src` and `alt` to the entry in `src/content/`:

```js
{ name: 'elm street tacos',
  desc: '…',
  photo: { mask: 'arch', src: '/media/dish-elm-tacos', alt: 'Three Elm Street tacos on a metal tray' } }
```

`Plate` switches from the placeholder to a real `<picture>` the moment `src` is
present. `alt` is required — an empty string is only correct for a photograph
that adds nothing the caption does not already say.
