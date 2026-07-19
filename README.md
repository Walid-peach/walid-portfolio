# Walid El Khoukh — Portfolio

Static bilingual portfolio for Walid El Khoukh. Perso presents the AI Lab, products, tools, and field notes; Pro presents Cloud Data Engineering experience and professional conversion paths.

Production: [walidelkhoukh.com](https://walidelkhoukh.com/)

## Structure

- `index.html` — English portfolio
- `fr/index.html` — French portfolio
- `monelu/` — English MonÉlu case study
- `fr/monelu/` — French MonÉlu case study
- `notes/` — owned AI and data engineering field notes
- `tools/token-budget/` — private, client-side token budget estimator
- `privacy/` — bilingual analytics and privacy disclosure
- `assets/` — optimized portraits, product captures, project artwork, social preview, and browser icons
- `feed.xml` and `llms.txt` — RSS and an AI-readable site guide
- `.agents/` — product positioning and content strategy
- `AGENTS.md` — invariants that future frontend work must preserve
- `.htmlvalidate.json` — validation rules matching the existing HTML style

## Local Preview

Run a static server from the repository root:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`. The local `/_vercel/insights/script.js` request returns 404 by design; Vercel serves it in production.

## Deployment

The site deploys to Vercel without a build command. The canonical production origin is always `https://walidelkhoukh.com`.

After deployment, verify:

- `/`, `/fr/`, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, and `/llms.txt` return 200.
- English Pro downloads `/walid-el-khoukh-cv-en.pdf`.
- French Pro downloads `/walid-el-khoukh-cv-fr.pdf`.
- Perso/Pro switching does not change `document.title`.
- The Clarity project reports that installation is detected.

## Analytics

The site uses Vercel Web Analytics for aggregate page visits and Microsoft Clarity for free interaction measurement. Clarity project `xp45kxu65a` is configured in `assets/analytics.js`. The shared integration sends Consent V2 signals, denies advertising storage, and presents a compact consent choice before analytics storage is allowed.

- `mode_viewed` - initial Perso view and Pro/Perso switches
- `monelu_clicked` - navigation, feature, product, and case-study clicks
- `cv_downloaded` - English or French CV download
- `contact_clicked` - LinkedIn or X contact intent
- `note_opened` - owned note opens
- `token_estimator_opened` and `token_estimate_generated` - tool interest and use

Tracked elements use `data-analytics-event` and optional `data-analytics-detail` attributes. New frontend code should call `window.portfolioAnalytics.track(name, data)` instead of creating another analytics implementation. No paid Vercel custom-event plan is required for these events.

## SEO and Content Invariants

The current design can be replaced, but these behaviors must remain:

- Stable homepage title: `Walid El Khoukh — Cloud Data Engineer in Paris`.
- Absolute canonicals under `https://walidelkhoukh.com`.
- Accurate Open Graph, X card, robots, and JSON-LD metadata.
- English/French `hreflang` links for bilingual page pairs.
- New public pages added to `sitemap.xml` and, when relevant, `llms.txt`.
- New field notes added to `notes/`, `feed.xml`, and the Notes hub.
- Privacy disclosure and consent-aware analytics remain reachable.
- No fake keywords, hidden repetitive SEO copy, or JavaScript title changes.

See `AGENTS.md` for the complete change contract.

## Validation

Run before deployment:

```sh
npx --yes html-validate index.html fr/index.html monelu/index.html fr/monelu/index.html notes/index.html notes/claude-code-token-optimization/index.html notes/government-api-did-not-exist/index.html tools/token-budget/index.html privacy/index.html
xmllint --noout sitemap.xml feed.xml
node --check assets/analytics.js
git diff --check
```

Also test desktop and mobile layouts, both portfolio modes, internal links, the token estimator, and both consent choices in a browser.
