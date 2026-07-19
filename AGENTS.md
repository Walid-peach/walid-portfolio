# Portfolio Change Contract

This file applies to the entire repository. Frontend visuals, layout, copy, and animation may evolve freely, but every change must preserve the infrastructure and behaviors below.

## Product Modes

- Keep two clearly distinct modes on both homepages: Perso / AI Lab and Pro / Data Engineering.
- Perso prioritizes MonÉlu, owned field notes, practical AI tools, and X.
- Pro prioritizes Cloud Data Engineering proof, experience, LinkedIn, and the language-matched CV.
- English Pro must download `/walid-el-khoukh-cv-en.pdf`.
- French Pro must download `/walid-el-khoukh-cv-fr.pdf`.
- Mode switching must not modify `document.title`, duplicate transitions, or create horizontal overflow.

## Stable SEO

- Production origin: `https://walidelkhoukh.com`.
- Homepage title: `Walid El Khoukh — Cloud Data Engineer in Paris`.
- Every indexable page needs a unique title, accurate description, absolute canonical, robots metadata, Open Graph metadata, X card metadata, and valid JSON-LD appropriate to the page.
- Preserve the homepage `ProfilePage` + `Person` identity graph and its `sameAs` links.
- Preserve English/French `hreflang` links for bilingual equivalents.
- Do not add fake keywords, hidden SEO copy, repetitive paragraphs, or claims without evidence.
- JavaScript must never change the document title during Perso/Pro switching.

## Crawling and Publishing

- Add every new canonical public page to `/sitemap.xml` with an accurate `lastmod` date.
- Keep `/robots.txt` crawlable and pointing to `https://walidelkhoukh.com/sitemap.xml`.
- Add important durable pages to `/llms.txt`.
- Publish field notes under `/notes/<slug>/` on this domain first.
- Add new notes to `/notes/`, `/feed.xml`, `/sitemap.xml`, and `/llms.txt`.
- Medium may host a cross-post, but the portfolio version should remain the owned source.

## Analytics and Privacy

- Keep Vercel Web Analytics pageview scripts on public content pages.
- Keep `/assets/analytics.js` and `/assets/analytics.css` shared; do not duplicate analytics snippets inside page-specific scripts.
- Preserve Microsoft Clarity project ID `xp45kxu65a` unless ownership intentionally moves to another project.
- Preserve Clarity Consent V2 behavior. Advertising storage must remain denied. Analytics storage is granted only after an explicit Allow action.
- Keep `/privacy/` linked from the portfolio and content footers.
- Track interactions with `data-analytics-event` and optional `data-analytics-detail`, or call `window.portfolioAnalytics.track(name, data)`.
- Keep these stable event names:
  - `mode_viewed`
  - `monelu_clicked`
  - `cv_downloaded`
  - `contact_clicked`
  - `note_opened`
  - `token_estimator_opened`
  - `token_estimate_generated`
- Do not send email addresses, names, free-form user text, or other personal data in event details.

## Design and Accessibility

- Preserve the current high-contrast editorial identity unless a redesign is explicitly requested.
- Keep semantic heading order, keyboard focus states, sufficient contrast, reduced-motion behavior, descriptive image alternatives, and touch targets suitable for mobile.
- Verify that the longest labels fit, Walid's displayed name does not wrap unintentionally, and no element causes horizontal scrolling.
- Use native links for navigation and buttons for actions or mode controls.

## New Page Checklist

1. Add complete metadata and an absolute canonical.
2. Add valid JSON-LD with Walid as the author where appropriate.
3. Include Vercel Analytics and the shared Clarity integration when the page is measured.
4. Link to `/privacy/`.
5. Add the page to the sitemap and relevant discovery files.
6. Verify internal links, responsive layout, keyboard access, and no console errors.

## Required Validation

Run before considering frontend work complete:

```sh
npx --yes html-validate index.html fr/index.html monelu/index.html fr/monelu/index.html notes/index.html notes/claude-code-token-optimization/index.html notes/government-api-did-not-exist/index.html tools/token-budget/index.html privacy/index.html
xmllint --noout sitemap.xml feed.xml
node --check assets/analytics.js
git diff --check
```

Also perform browser checks at desktop and mobile widths for both Perso and Pro. Confirm that the title stays stable, there is no horizontal overflow, the token estimator responds, and both analytics consent choices persist after reload.

## Repository Hygiene

- Do not edit or remove unrelated files in `tmp/`.
- Do not commit or push unless the user explicitly requests it.
- Keep changes scoped and preserve existing user work in a dirty worktree.
