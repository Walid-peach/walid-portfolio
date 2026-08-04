# Portfolio — MonÉlu civic architecture visual QA

## Evidence

- Source visual truth: `/Users/walidelkhoukh/.codex/generated_images/019fc958-c310-7da3-aa7c-954394205b83/exec-a79352eb-1afc-464e-bb79-73402b7b88ea.png`
- Optimized implementation asset: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/assets/images/monelu-civic-architecture.jpg`
- Browser-rendered implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-monelu-civic-architecture-desktop.png`
- Full-view comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-vs-monelu-civic-architecture.png`
- Source pixels: 1536 × 1024 PNG.
- Implementation asset: 1536 × 1024 JPEG, approximately 504 KB.
- Desktop browser capture: 1910 × 1074 pixels at a measured 1910 × 1075 CSS viewport and device pixel ratio 1.34.
- Desktop rendered image slot: 521 × 390 CSS pixels; natural dimensions 1536 × 1024.
- Mobile check: 390 × 844 requested browser viewport; responsive stage measured 582 × 1260 CSS pixels, rendered image 554 × 360 CSS pixels, and zero horizontal overflow.
- State: English and French homepages with Perso selected and the MonÉlu project visible.

## Findings

- No actionable P0/P1/P2 differences remain.
- The selected visual is reproduced as the real raster asset rather than approximated with CSS, SVG, or placeholder elements.
- At portfolio-card size, the Palais Bourbon façade remains immediately recognizable and the curved parliamentary seats remain legible as the primary civic-data metaphor.
- The existing `object-fit: cover` crop removes only peripheral network detail; the façade, hemicycle, red axis, and ordered grid remain visible.
- The image now reads as editorial civic architecture rather than a product screenshot, matching the user-selected direction.

## Required fidelity surfaces

- Fonts and typography: surrounding portfolio typography, weights, wrapping, and captions are unchanged. The image contains no generated text that could conflict with the page hierarchy.
- Spacing and layout rhythm: the asset fills the existing 521 × 390 desktop slot and responsive 554 × 360 mobile slot without changing the project grid, section spacing, or caption alignment.
- Colors and visual tokens: warm ivory, near-black linework, pale graphite, and the restrained vermilion axis match the portfolio and the existing modern data-platform artwork.
- Image quality and asset fidelity: the optimized 1536 × 1024 JPEG keeps architectural linework and chair nodes sharp at rendered size, loads successfully in both languages, and replaces the previous 266 KB UI mockup with a 504 KB lazy-loaded image.
- Copy and content: project copy, facts, actions, URLs, and captions remain unchanged. English and French alternative text describe the Assemblée nationale façade, hemicycle, and governed data lines.

## Functional verification

- Pro and Perso controls were switched in the browser; Perso retains `aria-pressed="true"` and exposes the MonÉlu section.
- English and French pages load `/assets/images/monelu-civic-architecture.jpg` at natural dimensions 1536 × 1024.
- Broken-image checks returned none in desktop, mobile, English, and French states.
- Desktop and mobile checks returned zero horizontal overflow.
- Browser `pageerror` and console-event checks returned no events during navigation.

## Focused comparison

- The combined source-versus-live image is sufficient for the key fidelity decision because the only changed surface is the project raster asset. The full source remains readable beside its complete live card context; no additional typography or control close-up was needed.

## Comparison history

1. Previous implementation: a generated editorial treatment of the MonÉlu interface still read as a product screenshot.
2. User-selected source: combined the frontal Palais Bourbon exterior, empty parliamentary seating, data-network linework, and a central vermilion governance axis.
3. Implementation: replaced the screenshot-derived asset in English and French, localized alternative text, and removed the superseded image.
4. Post-build comparison: no P0/P1/P2 mismatch was found; no corrective visual iteration was required.

## Follow-up polish

- Optional P3: a future responsive `<picture>` derivative could reduce transfer size further on very narrow screens.

final result: passed
