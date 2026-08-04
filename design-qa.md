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
- User-marked source for the hover-selection revision: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-hover-selection-request.png` (1674 × 1038 pixels, case 01 selected).
- Browser-rendered hover result: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-pro-hover-selection.png` (1079 × 1152 pixels, case 03 selected by cursor movement).
- Hover revision comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-vs-implementation-hover-selection.jpg`; both captures were normalized to 1038 pixels high with an ivory canvas and a 32-pixel divider. This is intentionally a before/after interaction comparison rather than a same-state fidelity comparison; the existing same-state comparison above remains the visual-fidelity source.
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
- Moving the cursor across a different cover now updates the selected book, counter, case heading, copy, and facts immediately. A desktop pointer click on a cover no longer drives selection or inspection.
- The compact layout switches to one column, removes the inherited detail-panel height, preserves a 40-pixel shelf-to-detail gap, and keeps controls at comfortable widths.

## Accessibility and progressive enhancement

- All three cases are real buttons inside a named listbox, expose `aria-selected`, and maintain a roving tab stop.
- Previous, next, and inspect controls retain visible focus states and meaningful accessible names.
- Arrow Left/Right, Home, End, Enter, Space, and Escape are supported. Browser verification confirmed Arrow Right moves both selection and focus from case 01 to case 02.
- Explicit Enter/Space handling on each case preserves keyboard inspection after desktop pointer clicks were removed from the interaction model.
- Selection changes are announced through an `aria-live` status region in English and French.
- All case details remain semantic HTML in the document, so the measurable outcomes and stack are indexable without relying on a canvas or WebGL scene.
- Pointer-driven portrait and cover tilt are disabled for coarse pointers and `prefers-reduced-motion`; the shelf remains fully usable without motion.

## Functional verification

- English selection test: case 02 updated the selected option, counter, and detail heading to “Keep commerce moving while the core changes.”
- Cursor-only test: moving from outside the shelf onto case 02 selected ERP coexistence; moving onto case 03 selected global finance analytics and updated the counter to `03` without clicking.
- Desktop click test: clicking the already hover-selected case left `aria-pressed="false"` and did not rotate the cover.
- Keyboard regression test: pressing Enter on the selected case changed the inspect control to `aria-pressed="true"` and “Return.”
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

## Hover-selection iteration history

1. User feedback identified a P2 interaction mismatch: case changes required a click, but the intended behavior was cursor-driven browsing.
2. First implementation used entry-based selection; browser pointer automation did not produce a reliable state change on the moving-width shelf.
3. The fix moved selection into the existing per-cover pointer-move path, before motion-specific tilt logic. This makes selection immediate, retains reduced-motion compatibility, and avoids relying on image clicks.
4. Post-fix browser evidence shows cases 02 and 03 selecting from cursor movement alone, with no console errors and keyboard inspection preserved.

final result: passed
