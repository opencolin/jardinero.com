# Prompt: "A Day in the Garden" — the jardinero.com hero

A complete specification of the live hero: a photograph of a formal parterre
garden, cut into parallax layers, living through a never-ending cycle of days,
with a planted foreground that grows across three of them.

Companion documents: [`GARDEN-PLANTS.md`](GARDEN-PLANTS.md) breaks the
photograph down into its plant types and records the sampled palette.

---

## The base: a photograph in seven layers

The backdrop is `assets/hero-1920.webp`, a formal French parterre — clipped
columnar yews in two receding rows, a broderie of pale gravel cut into lawn,
stone urns, a reflecting basin, deep woodland behind. It is cut into seven
transparent WebP layers, back to front:

| # | Layer | Contains |
| --- | --- | --- |
| 1 | `sky` | the flat blue gradient |
| 2 | `trees` | the horizon woodland between the yew rows |
| 3 | `columns` | both flanking rows plus the small central cluster at the vanishing point |
| 4 | `lawn` | tapis vert, parterre lawn, gravel broderie |
| 5 | `urns` | the two stone pedestal urns |
| 6 | `pool` | the reflecting basin and its lilies |
| 7 | `flowers` | foreground mixed border and the bottom hedge band |

**Cut them by measurement, not by eye.** A row profile locates the horizontal
bands (sky is 100% blue to y=430; gravel peaks at y=1104; water sits at
y=1296). A *skyline* profile — the first non-sky pixel in every column —
separates the flanking yew rows from the woodland between them: the rows break
the sky at y≈430–520 while the treeline tops out at y≈560–744. Mask with a
blue-key for sky plus those measured bands, feather the alpha so each seam
falls beneath the layer in front, and verify by recompositing all seven back
into the original.

Anchor every layer `background-position: center 84%`. On a wide viewport the
image is cropped ~400px vertically; at 84% almost all of that comes off the
flat sky, which costs nothing, instead of off the foreground border, which is
the most detailed and nearest part of the scene.

Use transparent **WebP**, not PNG — identical alpha, roughly a sixth of the
weight (700KB for the set against ~4MB). Ship a 960px set for small screens.

## The backdrop is still

The photograph does not move. An earlier build cut it into seven parallax
layers — sky, treeline, columns, lawn, urns, pool, foreground border — each
drifting on its own clock and following the cursor by depth. The layer assets
are still in `assets/layers/` and the technique is recorded under "Still on the
shelf" below, but the live hero uses the single image: with the motion gone the
split was seven requests and 700KB where one image is 585KB and looks identical.

## The day

**Master clock: one solar day = 40 seconds; the planting epoch is 120 seconds —
three days.** Everything is `linear infinite` on one of those two durations and
they all start together, so the scene is synchronised purely by keyframe
percentage. Pausing every animation at the same `currentTime` must always
produce one coherent moment. Animate only `transform`, `opacity`,
`stroke-dashoffset` and `filter`.

**Sun and moon cross level, and never set.** Both are anchored to the *top* of
the hero with a viewport-relative clamp — not to a horizon offset from the
bottom, which cannot survive a change of viewport height. The sun enters off the
left edge, traverses the full width at constant height (measured drift: 8px
across the whole crossing) and exits right, fading at both ends. The moon does
the same through the night window. Neither dips behind the garden.

**Nightfall.** A warm sunset veil peaks as the sun leaves; a deep blue-navy dusk
veil holds through the night. Both sit *above* the photograph and above the
planted foreground, so dusk darkens the whole scene together — an early build
left the CSS planting glowing bright green at midnight while the photograph went
dark. Stars and fireflies sit *above* the veils, or the veil dims the very
things it is meant to reveal.

## The planting: grass, topiary, sunflowers

The photograph supplies the middle and far distance. The CSS planting is the
**near foreground** — a bed in front of the basin, occupying the same plane as
layer 7. Give it the foreground depth (`--d: 42`) so it tracks the cursor with
the border it stands in.

**Match the photograph's palette, which is the whole trick.** Its greens are
near-black and cool (`#04180d`, `#012715`); the only bright green is a
yellow-olive where sun strikes clipped foliage (`#484e0f` — the single largest
colour in the image). Friendly mid-greens read instantly as a different garden:
an earlier build's bright CSS columns looked like a different plant species
standing in front of the photograph's own.

### Topiary — clipped columnar yews
Narrow dome-topped columns at the photograph's own proportion, roughly 1:6
width to height, in two rows that recede toward the central vista: tall at the
frame edges, shrinking toward the middle, exactly as the real rows do. Three
paths each — body, sunlit face, lit crown — filled from shared gradients
(`#04170c`→`#2b4d13` vertically; a warm right-edge highlight to `#6a8f28`; a
crown wash to `#88ad39`). Flat fills read as a picket fence; the gradients are
what make them foliage. Add clipped box balls on short stone plinths
(`#8d7f5e`) nearer the centre and lower down.

### Grass — a fringe, not a meadow
This is a formal garden: no wild meadow, no drifts. Grass belongs as a fine
fringe along the top edge of the foreground hedge band and at the feet of the
columns — short dark tufts (`#0a2612`) with occasional yellow flecks
(`#c3ad3c`), echoing the flowering hedge at the very front of the photograph.
Generate them by sampling along the hedge line with jittered height and lean,
two or three curved stroke blades each, `vector-effect: non-scaling-stroke`.

### Sunflowers — in the border beds, in the photograph's own gold
Sunflowers are not native to a French parterre, so plant them where the
photograph already has mixed flowering shrubs: the border beds at the frame
edges, scaled small, never in the formal centre. Use the image's amber and gold
(`#d18d47`, `#c3ad3c`) rather than a bright cartoon yellow. Stem draws itself at
sunrise, two leaves, then a 12-petal head — petal ellipses rotated around a
brown disc — that pops open mid-morning.

**Heliotropism follows the level traverse.** Because the sun now crosses
horizontally rather than arcing, the heads should *turn* rather than tilt:
sweep the head from facing left at dawn, through square-on at midday, to facing
right at dusk, on a bottom-centre pivot, closing at nightfall. Put the rotation
on the head and the pop-scale on a wrapper group so the two transforms compose.

### Growth across three days
Every planted thing arrives on one of three waves (`d1`/`d2`/`d3`) and **keeps
growing after it arrives** — scale from its sprout moment toward full across the
whole 120s epoch, so the garden both gains members and matures. Day one plants
the first columns and border, day two adds more, day three more again; the
epoch clears only in the deep night of day three so the loop restarts unseen.

Growth needs its own nesting level. A plant element already carries a static
mirror transform and a night filter, and its SVG carries the wind sway, so put
the growth scale on a wrapper between them — three transforms, three elements,
no collisions.

## Ambience

Flat rounded clouds drift across the sky band on very long loops, dimmed at
night because they live below the veils. Butterflies work the day shift: real
anatomy — separate forewing and hindwing beating *out of phase*, which is what
makes flight read as fluttering rather than flapping — with a nested wrapper so
body bank and bob compose with the path animation. Fireflies blink and drift
upward through the night window, above the veils. Wind is a slow `skewX(±0.6°)`
ease-in-out alternate on each plant SVG, durations and negative delays varied so
gusts never synchronise.

## Performance architecture

1. **Never animate a transform on a `<g>` inside a large SVG continuously.** SVG
   children are not promoted to their own compositor layer in Chrome, so one
   animated `<g>` re-rasterises the entire SVG every frame, forever. Do the
   arithmetic first: a 0.7° skew moves a 20px blade tip **0.24px** — invisible,
   while repainting everything. Keep sway only where the element is tall enough
   to see it *and* is a separately-composited HTML element.
2. **Animate wave groups, not individual plants.** Wrapping tufts into shared
   wave groups took one build from 1,884 running animations to 241, and forced
   style+layout from 8.9ms to 3.5ms per pass. Never per-element delays — they
   break the shared clock.
3. **Promote only the continuous movers** — sun, moon, clouds, butterflies,
   fireflies, and the seven parallax wrappers — with `will-change: transform`.
   Every layer costs memory; keep the list short.
4. **Stop the scene off-screen.** One IntersectionObserver toggles a
   `.hero-paused` class whose `animation-play-state: paused !important` cascades
   to every descendant.
5. **Isolate the hero.** `isolation: isolate` on the hero, or a foreground layer
   with a high z-index will escape into the root stacking context and paint over
   the product card below.

## Accessibility

Every animation lives inside `@media (prefers-reduced-motion: no-preference)`,
and the cursor parallax is skipped entirely for those users. Base styles are a
pleasant static midday — sun up, planting fully grown, veils off — so
reduced-motion visitors get the finished garden, not an empty bed.

---

## Open-source reference scenes

All public CodePen pens are MIT by CodePen's terms of service.

**Same medium (CSS/SVG day-night landscapes):**
- [Day-Night Cycle Animated With SVG & CSS](https://codepen.io/chiranjeeb/pen/vYJjmY) (MIT) — keyframed sun arc and sky sweep.
- [SVG Animated Day-Night Sky Cycle](https://codepen.io/kpk/pen/LYWgOd) (MIT) — animates the sky *gradient stops* through the cycle; a richer alternative to opacity veils.
- [Day-Night Cycle Animated With CSS](https://codepen.io/zenete/pen/jOOQqrQ) (MIT) and [Svg and css landscape animation](https://codepen.io/guillaume_lt/pen/qdgoNL) (MIT) — layered landscapes.

**Vibe reference and upgrade path (Three.js):**
- [craftzdog/ghibli-style-shader](https://github.com/craftzdog/ghibli-style-shader) (MIT) — gradient-lit stylised foliage; safe to copy.
- [fromtheghost/ghibli-grass](https://github.com/fromtheghost/ghibli-grass) (no license file — reference only), [live demo](https://ghibli-grass.vercel.app).
- [Fluffiest Grass with Three.js](https://tympanus.net/codrops/2025/02/04/how-to-make-the-fluffiest-grass-with-three-js/) (Codrops license) — its wind term translates to the CSS sway above.
- [Breath of the Wild-style grass in WebGL](https://smythdesign.com/blog/stylized-grass-webgl/) — the clearest written account of stylised grass motion.
- [yakudoo/TheAviator](https://github.com/yakudoo/TheAviator) (Codrops license) + [Karim Maaloul's CodePens](https://codepen.io/Yakudoo) (MIT) — canonical soft low-poly scenes.
- [jeromeetienne/threex.daynight](https://github.com/jeromeetienne/threex.daynight) (MIT) — sun-angle→sky-colour mapping worth stealing for veil timing.
- [jasonsturges/three-low-poly](https://github.com/jasonsturges/three-low-poly) — procedural low-poly scenery; check license before copying.

## Still on the shelf

- **Sky-gradient cycling** — animate the sky layer through dawn-pink → day-blue → dusk-orange → night-navy the way the kpk pen animates gradient stops, instead of veiling it.
- **Depth from the pool** — a true reflection of the animated sky and planting in the basin layer.
- **Parallax, if it is ever wanted back** — `assets/layers/` holds the seven-way cut (see `GARDEN-PLANTS.md` for how it was measured). Each layer needs a wrapper for the cursor offset and an inner element for its ambient drift, because one `transform` cannot carry both; depth runs sky 5 → foreground 42. Amplitude discipline matters: motion under about a pixel a second reads as static however long you watch.
- **WebGL rebuild** — keep this document's timeline percentages as the choreography spec.
