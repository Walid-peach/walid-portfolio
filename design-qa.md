# Portfolio redesign — option 1 design QA

## Evidence

- Source visual truth: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-option-1.png`
- Browser-rendered desktop implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-option-1-desktop.png`
- Full-view comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-vs-implementation-option-1.png`
- Mobile implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-option-1-mobile-pro.png`
- Source pixels: 1536 × 1024.
- Desktop CSS viewport: 1536 × 1024. The in-app browser returned a 2293 × 1528 stage capture; the active 1536 × 1024 viewport region was cropped and normalized to 1536 × 1024 for equal-size comparison.
- Mobile CSS viewport: 389 × 843, checked against a 390 × 844 normalized evidence capture.
- State: English, Pro selected, page loaded, motion settled. Mobile evidence includes the visible keyboard-focus treatment on the selected Pro control.

## Findings

- No actionable P0/P1/P2 issues remain.
- The implementation preserves the selected concept's editorial hierarchy: centered mode control, two-line governed-data statement, warm paper surface, restrained vermilion accent, formal portrait, thin rules, focused CTAs, and a three-column selected-work story.
- The live project and experience copy replaces the mockup's generic placeholder wording with evidence already present in the portfolio. This is an intentional content-quality improvement, not visual drift.
- P3: the source's circular `DATA ENGINEER` stamp and decorative hand-drawn underline are omitted. Their absence makes the production layout calmer and avoids introducing decorative image assets that add no information.
- P3: the portrait is slightly squarer and the selected-work image slightly wider than the mockup so both crops remain stable across responsive widths.

## Required fidelity surfaces

- Fonts and typography: the implementation uses a system neo-grotesk stack for the hero and controls plus Georgia for editorial project and section titles. Weight, line height, letter spacing, two-line hero wrapping, small mono labels, and mobile wrapping match the intended hierarchy. The selected-work title was reduced during QA to a two-line desktop measure.
- Spacing and layout rhythm: the 1400 px shell, 86 px masthead, 701 px start of selected work, asymmetrical hero grid, portrait offset, button spacing, rules, and project columns closely track the source. Mobile stacks actions and imagery without horizontal overflow.
- Colors and visual tokens: warm ivory `#f2eee5`, near-black `#11110f`, and vermilion `#e6432f` are consistently mapped to page, type, active mode, CTAs, and image accents. Contrast remains high.
- Image quality and asset fidelity: the existing 640/960 AVIF portrait sources remain responsive. The project bridge is a dedicated 1800 × 1126 raster asset generated from the selected mockup's art direction, with no placeholder, CSS drawing, or stretched sprite.
- Copy and content: the hero, project facts, experience, CV links, contact paths, Perso content, and French localization use real portfolio evidence. English and French SEO copy remains accurate and claims are not inflated.

## Functional and SEO verification

- Perso and Pro controls update `aria-pressed`, reveal the correct static content panel, and keep the homepage title unchanged.
- English Pro downloads `/walid-el-khoukh-cv-en.pdf`; French Pro downloads `/walid-el-khoukh-cv-fr.pdf`.
- Desktop and 389 px mobile widths report no horizontal overflow in both Pro and Perso modes.
- English and French titles, canonicals, reciprocal hreflang links, Open Graph, X cards, and `WebSite` + `ProfilePage` + `Person` JSON-LD are present in the initial HTML.
- The token estimator responded after changing output units from 5 to 7, updating the estimate to 8.28K.
- Shared analytics and consent code is preserved unchanged; Vercel Analytics, Clarity Consent V2, privacy links, and stable event attributes remain in place.
- Browser console errors: none on the verified English and French homepages.
- `html-validate`, `xmllint`, JavaScript syntax checks, and `git diff --check`: passed.

## Comparison history

1. Initial implementation findings:
   - P1: the hero headline wrapped to four lines instead of the source's two-line statement.
   - P2: the bridge image inherited an excessive intrinsic height, pushing project copy below the visible comparison frame.
   - P2: the selected-work title was too large and wrapped across four lines.
2. Fixes made:
   - Added explicit hero line grouping and tuned the display scale.
   - Added an explicit responsive image height and `object-fit: cover`.
   - Tuned portrait aspect ratio, hero height, project title size, and selected-work vertical position.
3. Post-fix evidence:
   - The 1536 × 1024 implementation now starts selected work at 701 px, has a two-line hero, a two-line project title, the intended three-column composition, and no overflow.
   - The 390 × 844 mobile evidence shows readable heading wraps, full-width CTAs, a visible focus state, and no horizontal overflow.

## Follow-up polish

- Optional P3: add a small generated stamp asset only if the stronger poster-like personality is preferred over the current quieter editorial treatment.

final result: passed
