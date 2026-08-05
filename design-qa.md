# Portfolio — interactive Pro systems shelf and warm-paper cursor portrait design QA

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
- Cursor portrait source truth, left: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-gaze-left.png` (524 × 326 pixels).
- Cursor portrait source truth, up: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-gaze-up.png` (478 × 344 pixels).
- Cursor portrait source truth, down: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-gaze-down.png` (558 × 410 pixels).
- Browser-rendered neutral hero: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-gaze-center.png` (1910 × 1074 pixels at a 1910 × 1075 CSS viewport).
- Focused browser crops: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-gaze-left-focus.jpg`, `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-gaze-up-focus.jpg`, and `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-gaze-down-focus.jpg` (each 440 × 455 pixels, matching the rendered portrait component).
- Combined behavior and asset comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-vs-implementation-gaze.png` (1910 × 1074 pixels). The source and implementation frames are normalized into matching visual cells; the nine production frames are shown together beneath them.
- Selected casual source truth: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-casual-quarter-zip.jpg` (960 × 960 pixels, navy fine-knit quarter-zip).
- Browser-rendered casual Pro hero: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-casual-gaze-desktop.png` (1910 × 1074 pixels at a 1910 × 1075 CSS viewport).
- Previous grayscale comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-vs-implementation-casual-gaze.png` (920 × 463 pixels), retained as iteration history.
- Selected warm-paper source truth: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-warm-paper-center.jpg` (1254 × 1254 pixels).
- Browser-rendered warm-paper Pro hero: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-warm-paper-gaze-desktop.png` (1212 × 1152 capture from a 1910 × 1075 CSS viewport; the Codex browser surface scaled the visual capture).
- Full-view comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-preview-vs-production-warm-paper-gaze.jpg` (2448 × 1198 pixels). The static option-01 preview and production page were padded to matching 1212 × 1152 cells before comparison.
- Current same-state focused comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/reference-vs-implementation-warm-paper-gaze.jpg` (848 × 444 pixels). Both cells use the same 408 × 392 hero crop.
- Production nine-frame matrix: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-warm-paper-gaze-matrix.jpg` (900 × 990 pixels).
- Compact Pro check: the browser surface reported a 582 × 1260 CSS viewport for the requested 390 × 844 override; the portrait loaded at 960 × 960 natural pixels and the page retained zero horizontal overflow.

## Design translation

- The reference contributes two interaction ideas: a portrait that responds subtly to the pointer and a shelf where objects can be selected, pulled forward, and rotated.
- The implementation deliberately keeps the portfolio’s warm ivory, near-black, and vermilion editorial language instead of reproducing the reference site’s dark interface.
- Books become professional case files for platform modernization, ERP coexistence, and global finance analytics. The visual interaction therefore reinforces Walid’s data-engineering positioning rather than behaving as decoration.
- Two new portrait editorial covers were generated as real raster assets, then compressed from approximately 2.3 MB PNG sources to 396 KB and 420 KB JPEGs for production use. The first case reuses the existing governed-lineage artwork.
- The cursor portrait now uses the user's selected warm-paper, navy quarter-zip portrait as the neutral center plus eight identity-preserving generated directions. All nine production frames share a 960 × 960 crop and total approximately 1.6 MB.

## Findings

- No actionable P0/P1/P2 visual or functional differences remain.
- Desktop composition preserves a clear hierarchy: section proposition, tactile shelf, selected case, measurable outcome, and technical stack.
- The selected case is visibly larger, elevated, and given depth; adjacent cases remain recognizable without competing with it.
- Inspecting a case completes a 180-degree rotation and reveals a compact outcome-focused back cover. Returning restores the generated editorial cover.
- Moving the cursor across a different cover now updates the selected book, counter, case heading, copy, and facts immediately. A desktop pointer click on a cover no longer drives selection or inspection.
- The compact layout switches to one column, removes the inherited detail-panel height, preserves a 40-pixel shelf-to-detail gap, and keeps controls at comfortable widths.
- The portrait now follows the cursor across the full Pro viewport through a nine-state direction grid. Left, up, down, right, and all four diagonal states change the head angle and eye gaze rather than merely tilting a flat image.
- Source-vs-implementation comparison confirms the selected identity, navy quarter-zip, tortoiseshell glasses, warm-paper backdrop, and natural color treatment survive the production crop. The page no longer applies a grayscale filter.
- The 120 ms two-layer crossfade removes loading flashes, while a restrained 2.5-pixel parallax and sub-1.1-degree frame tilt add depth without changing the editorial composition.

## Cursor portrait fidelity surfaces

- **Fonts and typography:** no type styles, wrapping, weights, or copy changed. The hero hierarchy and figcaption remain aligned with the existing editorial system.
- **Spacing and layout rhythm:** the portrait stays in the existing 440 × 455 rendered slot; its border, vermilion offset block, caption line, hero grid, and surrounding whitespace are unchanged.
- **Colors and visual tokens:** the warm paper, near-black, and vermilion tokens remain unchanged. The portrait now keeps its natural skin, navy knit, tortoiseshell glasses, and warm-ivory backdrop without a CSS color filter.
- **Image quality and asset fidelity:** each production frame is 960 × 960 and renders above the component’s CSS size. All nine frames share the selected wardrobe, background, lighting, and editorial crop; no stretching, transparent halos, placeholder assets, or CSS-drawn substitutes are present.
- **Copy and content:** English and French hero text, alternative text, navigation, CV links, and SEO metadata remain unchanged. The second crossfade layer is decorative and hidden from assistive technology.

## Accessibility and progressive enhancement

- All three cases are real buttons inside a named listbox, expose `aria-selected`, and maintain a roving tab stop.
- Previous, next, and inspect controls retain visible focus states and meaningful accessible names.
- Arrow Left/Right, Home, End, Enter, Space, and Escape are supported. Browser verification confirmed Arrow Right moves both selection and focus from case 01 to case 02.
- Explicit Enter/Space handling on each case preserves keyboard inspection after desktop pointer clicks were removed from the interaction model.
- Selection changes are announced through an `aria-live` status region in English and French.
- All case details remain semantic HTML in the document, so the measurable outcomes and stack are indexable without relying on a canvas or WebGL scene.
- Pointer-driven portrait and cover tilt are disabled for coarse pointers and `prefers-reduced-motion`; the shelf remains fully usable without motion.
- Coarse pointers and reduced-motion users keep the neutral center portrait; no cursor tracking, crossfade loop, or parallax is initialized for those preferences.

## Functional verification

- English selection test: case 02 updated the selected option, counter, and detail heading to “Keep commerce moving while the core changes.”
- Cursor-only test: moving from outside the shelf onto case 02 selected ERP coexistence; moving onto case 03 selected global finance analytics and updated the counter to `03` without clicking.
- Desktop click test: clicking the already hover-selected case left `aria-pressed="false"` and did not rotate the cover.
- Keyboard regression test: pressing Enter on the selected case changed the inspect control to `aria-pressed="true"` and “Return.”
- Inspect test: `aria-pressed` changed to `true`, the control label changed to “Return,” and the selected case rotated to its outcome side.
- French page exposes three localized case panels, a localized selection label, and the “Inspecter” control.
- Compact Pro image check loaded all four relevant assets successfully with non-zero natural dimensions.
- Browser console logs returned no errors during English, French, selection, inspection, and keyboard checks.
- Full HTML validation, XML validation, `node --check` for both shared scripts, and `git diff --check` passed. The validator's native-element preference is disabled for the intentional custom ARIA region/listbox used by the 3D case shelf.
- Cursor matrix test moved the real browser pointer through all nine target regions. Every expected value matched `data-gaze-direction`, and every visible layer loaded the corresponding 960 × 960 frame.
- The regenerated casual matrix passed the same nine-region test: center, four cardinals, and four diagonals each loaded the expected navy quarter-zip asset.
- English neutral, left, up, and down states were captured from the rendered page. The French page loaded the up-right frame, retained the localized title, and had zero horizontal overflow.
- Switching to Perso reset the hidden Pro portrait from `down-right` to `center`; the AI Lab logo retained natural dimensions and computed opacity `1`.
- The desktop hero retained zero horizontal overflow, the neutral portrait loaded at 960 × 960 natural pixels, and browser error logs were empty.
- The warm-paper production route loaded the versioned stylesheet with computed `filter: none`, the renamed neutral asset at 960 × 960, and zero horizontal overflow.
- The local server returned HTTP 200 for the neutral frame and all eight directional `walid-warm-gaze-*` preloads. The only local 404 was the expected Vercel Insights endpoint, which is not available under a plain static server.

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

## Cursor portrait iteration history

1. The earlier implementation only translated and tilted one flat portrait, which did not satisfy the reference’s head-and-eye tracking behavior.
2. A nine-frame identity-preserving set was generated from the existing professional portrait. The exact source portrait was retained as the center state to avoid neutral-state identity drift.
3. The hero was upgraded to two stacked image layers, page-wide pointer mapping, a three-by-three direction grid, preloading, and a 120 ms crossfade.
4. Visual QA compared left, up, and down states directly with the user-provided frames, then reviewed all nine assets together. No P0/P1/P2 visual or functional issue remained.
5. The user selected the casual navy quarter-zip direction. That exact image became the new neutral frame, and eight new gaze directions were generated from it while preserving identity, wardrobe, lighting, and white studio background.
6. The production assets were resized to 960 × 960 JPEGs at quality 84 and replaced in place, so the existing crossfade and cursor mapping required no behavioral rewrite.
7. Post-replacement browser QA exercised all nine cursor regions on English and the up-right state on French, checked desktop and compact overflow, confirmed stable titles, and found no console errors.
8. The user selected color option 01. That exact warm-paper portrait became the new neutral source, and eight matching directional frames were regenerated with identity, wardrobe, crop, lighting, and backdrop locked.
9. The nine production JPEGs were renamed to the cache-safe `walid-warm-gaze-*` family, the HTML preload and gaze base were updated in English and French, the stylesheet cache key advanced to `v=6`, and the grayscale filter was removed.
10. Final browser QA compared the selected static preview to the production hero, inspected the focused source/render crop, confirmed all nine frame requests returned HTTP 200, and found no P0/P1/P2 mismatch.

final result: passed
