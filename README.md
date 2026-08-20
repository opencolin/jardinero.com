# jardinero.com

Launch landing page for **Jardinero** — the open-source, always-on AI engineer from [Tenki](https://tenki.cloud).

Single static page (`index.html`), no build step, no dependencies.

## Preview locally

```
python3 -m http.server 4519
```

Then open http://localhost:4519.

## Deploy

Any static host works (Vercel, Netlify, Cloudflare Pages). For Vercel: `vercel deploy --prod` from this directory.

## Before launch — TODOs

- [ ] Confirm the GitHub repo URL (all links currently point to `github.com/LuxorLabs/jardinero`)
- [ ] Swap the placeholder logo mark and CSS hills for Miko's real exports (Figma: Marketing file, node 11834-81)
- [ ] Replace the CSS dashboard mockup with a real screenshot or screen recording if preferred (the mockup mirrors Factory Overview v0.3.0)
- [ ] Add `og.png` (1200×630) — `index.html` already references `/og.png`
- [ ] Decide canonical domain (jardinero.dev is owned; add canonical/og:url tags once chosen)
- [ ] Confirm license name once decided (page currently says "open source" without naming one)
- [ ] Real Tenki for Startups URL for the button in the Tenki section
