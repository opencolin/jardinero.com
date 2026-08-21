# The garden in the photograph

> **Not the live design.** This documents a photographic parterre direction the
> hero briefly used. The live hero is the CSS-drawn rolling garden described in
> [`ANIMATION-PROMPT.md`](ANIMATION-PROMPT.md). Kept because the palette analysis
> and the seven-layer segmentation are reusable, and the assets are still in
> `assets/` and `assets/layers/`.

A breakdown of `assets/hero-1920.webp` into its distinct plant types, and how each
one is represented in the animated CSS foreground. Colours are sampled from the
image itself (median-cut quantisation plus point sampling), not eyeballed.

## Palette sampled from the image

| Swatch | Hex | Share | Where it comes from |
| --- | --- | --- | --- |
| olive sunlight | `#484e0f` | 13.1% | sunlit faces of clipped foliage, lawn in full sun |
| deepest yew | `#011b0f` | 10.9% | shadow side of the clipped columns |
| sky mid | `#0069bf` | 10.1% | the flat upper sky |
| sky horizon | `#408aca` | 10.3% | sky just above the treeline |
| shadow green | `#012715` · `#092b14` | 11.6% | box hedging, woodland shade |
| mid foliage | `#1e3f12` · `#164409` | ~6% | lit hedge tops, tapis vert |
| stone | `#a4a181` · `#d7b182` | ~5% | gravel broderie, urn plinths |

The defining fact of this palette: the greens are **near-black and cool**, and the
only bright green is a **yellow-olive** where sun strikes clipped foliage. Nothing
in this garden is the friendly mid-green of a meadow.

## The plant types

### 1. Clipped columnar yew — the signature
Tall, narrow, dome-topped columns (*Taxus baccata*, clipped), planted in two rows
that recede toward the central vista. Roughly a 1:6 width-to-height ratio. Shadow
side almost black, sunlit face and crown a strong yellow-olive.
**In the animation:** the `.yew` elements — the dominant foreground motif. Three
SVG paths per column (body, sunlit face, lit crown) filled with shared gradients
`#yg` / `#yl` / `#yt`. Scaled by distance from centre so the row recedes exactly
as the photograph's does.

### 2. Clipped box balls on plinths
Spherical box (*Buxus*) on short square stone plinths, set nearer the centre and
lower than the columns.
**In the animation:** the `.box` elements — a circle plus a `.plinth` rectangle in
sampled stone `#8d7f5e`.

### 3. Low box edging hedge
Flat-topped clipped bands that frame the parterre and separate it from the basin.
Reads as a continuous dark green ribbon.
**In the animation:** the `.hedge` band across the foot of the scene, a three-stop
vertical gradient from `#163a17` down to `#061705`.

### 4. Mixed flowering border
At the foot of the columns: white roses, amber and rust autumn-toned shrubs, and
small yellow blooms scattered through dark foliage.
**In the animation:** the `.bloom` clusters — a dark shrub mass with scattered
petal circles in three colourways drawn from the image (`rose` `#e6e4cf`,
`amber` `#d18d47`, `gold` `#c3ad3c`).

### 5. Parterre de broderie
Not a plant so much as a plant *pattern*: pale gravel arabesques cut into lawn and
edged in clipped box. This is the photograph's centrepiece and is left to the
photograph — the CSS foreground deliberately does not compete with it.

### 6. Tapis vert and woodland
A long lawn ride running to the vanishing point, flanked by mature deciduous
woodland with rounded canopies and amber autumn tints. Both sit in the middle
distance and belong to the photograph.

### 7. Water lilies
Pale floating pads on the reflecting basin. Background only.

## What was retired, and why

The previous animation was a different garden idiom entirely and fought this
photograph on every axis:

| Retired | Why it clashed |
| --- | --- |
| rolling hills | the photograph is rigidly flat, axial and geometric |
| wild meadow grass | a meadow is uncultivated; this garden is the opposite |
| wildflower drifts | drifts are naturalistic planting; parterres are patterned |
| sunflowers | not present in the garden, and the wrong register entirely |
| cloud-pruned niwaki topiary | Japanese idiom against a French formal one |
| bright friendly greens | the photograph's greens are near-black and cool |

Kept, because they belong to any garden and to the day: the sun and moon arcs, the
drifting clouds, the sunset and dusk veils, the stars, the fireflies, and the
butterflies.

## Choreography

Unchanged from the original specification, and documented in
[`ANIMATION-PROMPT.md`](ANIMATION-PROMPT.md): one solar day is 40 seconds, the
planting epoch is 120 seconds — three days. Each sunrise brings a new planting
(`.d1` / `.d2` / `.d3`), and every plant keeps growing after it arrives, so the
garden both gains members and matures. Columns rise from their base
(`transform-origin: 50% 100%`), and everything sways on desynchronised skew loops.
