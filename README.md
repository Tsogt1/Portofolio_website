# tsogtb.com — personal portfolio

Personal site for **Tsogt Batjargal — Data Platform / DataOps Engineer**. Static site built with
[Astro](https://astro.build). The current public domain may still serve the older AWS S3/CloudFront
site until the new Astro build is deployed and DNS/cache cutover is complete.

## Stack

- **Astro 4** — static output, ships (almost) zero JavaScript.
- Plain CSS (`src/styles/global.css`), Google Fonts (Inter + JetBrains Mono).
- No client framework, no build server needed — output is plain HTML/CSS.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to ./dist
npm run preview    # serve the built ./dist locally
```

Requires Node 18.20+ / 20.3+ / 22+ (Astro 4 requirement).

## Editing content

Almost all content lives in one place: **`src/pages/index.astro`** — the `skillGroups`,
`experience`, `projects`, and `contact` arrays at the top. Change the data, not the markup.

- **Site title / meta / social preview:** `src/layouts/Layout.astro`.
- **Colours / spacing / fonts:** the CSS variables at the top of `src/styles/global.css`.
- **Add a headshot (optional):** drop a square, web-optimized photo (~400×400, <150 KB) at
  `public/img/profile.jpg`, then add an `<img>` in the About section of `index.astro`. *(The old
  site's only photo was a wide tourist shot at Niagara Falls — replace it with a real headshot.)*
- **Add your résumé:** export `../job-search-2026/resume.md` to PDF and save it as
  `public/resume.pdf` — the hero's "Résumé (PDF)" button already links to `/resume.pdf`.

## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this folder to a GitHub repo (e.g. a fresh `tsogtb-website`, or replace the old
   `Portofolio_website`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Every push to the main branch auto-builds and ships.

### Option B — Direct upload with Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name tsogtb
```

## Custom domain — moving tsogtb.com off AWS

The domain currently resolves through **Route 53 → CloudFront → S3**. Two ways to point it at
Cloudflare Pages:

### Recommended: move the domain onto Cloudflare (free plan)

1. Cloudflare dashboard → **Add a site** → `tsogtb.com` → Free plan. Cloudflare imports your DNS
   records and gives you **two nameservers**.
2. At your **domain registrar**, replace the Route 53 nameservers with the Cloudflare ones. (Wait for
   propagation — minutes to a few hours.)
3. In your Pages project → **Custom domains** → add `tsogtb.com` and `www.tsogtb.com`. Cloudflare
   creates the records and provisions SSL automatically.

### Alternative: keep Route 53 as DNS

- In Route 53, change the `tsogtb.com` / `www` records from the CloudFront alias to a **CNAME**
  pointing at your Pages URL (`<project>.pages.dev`). Apex/root CNAME may need an ALIAS-type record;
  moving nameservers to Cloudflare (above) avoids that headache and is why it's recommended.

### After cutover — decommission AWS (stop paying for it)

Once `tsogtb.com` serves from Cloudflare and looks correct:

1. Disable, then delete the **CloudFront** distribution.
2. Delete the **S3** bucket that held the old static site (download a backup first if you want one).
3. If Route 53 is no longer hosting the domain, delete the **hosted zone** to stop its monthly charge.
4. Remove any ACM certificate you no longer need.

## Notes

- The old site lived at `github.com/Tsogt1/Portofolio_website` (vanilla HTML template, 2022). This is
  a full rebuild — content is genericized for any current-employer work.
- Lighthouse should be ~100 across the board; there's no client JS to speak of.
