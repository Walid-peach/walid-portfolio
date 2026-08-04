# Portfolio — interactive Pro systems shelf design QA

## Evidence

- Interaction reference: `https://x.com/dahbiahmed/status/2084346264326451289?s=46`
- Live reference site: `https://dahbiahmed.com/`
- Reference cursor portrait frame: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-x-cursor-portrait.png`
- Reference 3D shelf frame: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-x-3d-shelf.png`
- Reference live shelf: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-live-bookshelf.png`
- Implemented shelf, selected state: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-pro-systems-shelf.png`
- Implemented shelf, inspected state: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-pro-systems-shelf-inspected.png`
- Side-by-side visual comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-vs-implementation-pro-shelf.jpg`
- Desktop browser viewport: 1910 × 1075 CSS pixels at device pixel ratio 1.34.
- Compact check: 390 × 844 requested browser viewport, reported as 582 × 1260 CSS pixels by the browser surface; one-column responsive shelf measured 554 pixels wide with zero horizontal overflow.

## Design translation

- The reference contributes two interaction ideas: a portrait that responds subtly to the pointer and a shelf where objects can be selected, pulled forward, and rotated.
- The implementation deliberately keeps the portfolio’s warm ivory, near-black, and vermilion editorial language instead of reproducing the reference site’s dark interface.
- Books become professional case files for platform modernization, ERP coexistence, and global finance analytics. The visual interaction therefore reinforces Walid’s data-engineering positioning rather than behaving as decoration.
- Two new portrait editorial covers were generated as real raster assets, then compressed from approximately 2.3 MB PNG sources to 396 KB and 420 KB JPEGs for production use. The first case reuses the existing governed-lineage artwork.

## Findings

- No actionable P0/P1/P2 visual or functional differences remain.
- Desktop composition preserves a clear hierarchy: section proposition, tactile shelf, selected case, measurable outcome, and technical stack.
- The selected case is visibly larger, elevated, and given depth; adjacent cases remain recognizable without competing with it.
- Inspecting a case completes a 180-degree rotation and reveals a compact outcome-focused back cover. Returning restores the generated editorial cover.
- The compact layout switches to one column, removes the inherited detail-panel height, preserves a 40-pixel shelf-to-detail gap, and keeps controls at comfortable widths.

## Accessibility and progressive enhancement

- All three cases are real buttons inside a named listbox, expose `aria-selected`, and maintain a roving tab stop.
- Previous, next, and inspect controls retain visible focus states and meaningful accessible names.
- Arrow Left/Right, Home, End, Enter, Space, and Escape are supported. Browser verification confirmed Arrow Right moves both selection and focus from case 01 to case 02.
- Selection changes are announced through an `aria-live` status region in English and French.
- All case details remain semantic HTML in the document, so the measurable outcomes and stack are indexable without relying on a canvas or WebGL scene.
- Pointer-driven portrait and cover tilt are disabled for coarse pointers and `prefers-reduced-motion`; the shelf remains fully usable without motion.

## Functional verification

- English selection test: case 02 updated the selected option, counter, and detail heading to “Keep commerce moving while the core changes.”
- Inspect test: `aria-pressed` changed to `true`, the control label changed to “Return,” and the selected case rotated to its outcome side.
- French page exposes three localized case panels, a localized selection label, and the “Inspecter” control.
- Compact Pro image check loaded all four relevant assets successfully with non-zero natural dimensions.
- Browser console logs returned no errors during English, French, selection, inspection, and keyboard checks.
- `node --check assets/portfolio-v3.js` and `git diff --check` passed.

## Intentional differences from the reference

- The portfolio uses three professional systems rather than a personal reading list.
- Typography, color, spacing, borders, and controls follow the established portfolio design system.
- The interaction uses semantic DOM and CSS 3D transforms rather than a WebGL scene, keeping the content lightweight, accessible, and SEO-readable.
- Mobile retains selection and inspection but removes pointer tilt and exaggerated perspective.

final result: passed
