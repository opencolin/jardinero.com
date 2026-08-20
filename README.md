# jardinero.com

Landing page for **Jardinero** — the open-source, always-on AI engineer from [Tenki](https://tenki.cloud).

A single static page: no build step, no dependencies, no framework. The animated hero — a garden that lives through an endless cycle of days — is pure CSS, apart from a few lines of IntersectionObserver that pause the scene when it scrolls out of view.

## Run it locally

```bash
python3 -m http.server 4519
```

Then open http://localhost:4519.

## Deploy

Any static host works — Vercel, Netlify, Cloudflare Pages. There is nothing to compile; ship the directory as-is.

## The hero animation

[`ANIMATION-PROMPT.md`](ANIMATION-PROMPT.md) is a complete written specification of the scene: the shared 40-second solar day, the sun and moon arcs, the plants that grow and track the sun, the three-day meadow, and the performance rules that keep ~1,800 SVG paths cheap to animate. It doubles as a prompt you can hand to a coding agent to rebuild the whole thing from scratch.

## Structure

| File | What it is |
| --- | --- |
| `index.html` | The entire page — markup, styles, and scene |
| `ANIMATION-PROMPT.md` | Specification for the animated hero |
| `favicon.svg` | Site icon |

## License

See the [Jardinero repository](https://github.com/LuxorLabs/jardinero) for project licensing.
