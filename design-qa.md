# Portfolio — full-page data-lineage design QA

## Evidence

- Source visual truth: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-option-2-lineage.png`
- Browser-rendered desktop implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-option-2-full-page-lineage-desktop.jpg`
- Browser-rendered mobile implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-option-2-full-page-lineage-mobile.jpg`
- Source-versus-implementation comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-vs-full-page-lineage-design.png`
- Source pixels: 1585 × 992.
- Desktop QA state: English, Pro selected, 1536 × 1024 requested viewport; the active browser stage was normalized to the rendered portfolio region for comparison.
- Mobile QA state: English, Pro selected, 390 × 844 requested viewport; the active browser stage was normalized to the rendered viewport region.
- The source is an art-direction image rather than a page mock, so fidelity is judged by the translated visual grammar: complexity → governance checkpoint → trusted output.

## Findings

- No actionable P0/P1/P2 issues remain.
- The selected lineage composition now defines the whole page: the hero explains the three-stage system, proof points align to the same rail, case studies use a governance gate, and experience, notes, contact, and footer share the same structured editorial language.
- The visual still reads as a data-engineering system at both desktop and mobile sizes without resorting to cloud icons, dashboards, code screenshots, or decorative diagrams.
- English and French, plus Pro and Perso modes, retain the same architecture and interaction behavior.

## Required fidelity surfaces

- Fonts and typography: near-black Helvetica headlines, Georgia editorial case-study titles, and monospace operational labels preserve the established typographic hierarchy. The desktop headline was reduced and the hero columns rebalanced after QA exposed clipping at intermediate widths; the final measurements show no overflow.
- Spacing and layout rhythm: the page repeats a consistent source/gate/output cadence through the hero steps, metric rail, project grid, experience rows, notes, and contact block. Desktop density remains editorial; mobile stacks into clear bordered rows.
- Colors and visual tokens: the source ivory, near-black, and vermilion are used consistently for the paper field, structure, governance checkpoints, selection states, and calls to action.
- Image quality and asset fidelity: the selected generated asset remains a real optimized 1585 × 992 JPEG. It is placed with an intentional crop and an overlaid real portrait, with no CSS drawing, SVG approximation, placeholder, or stretching.
- Copy and content: Pro and Perso hero stages, proof points, image captions, and flow labels are localized in English and French. Existing portfolio copy, links, structured metadata, and SEO content remain intact.

## Functional verification

- Desktop and mobile checks reported zero horizontal overflow.
- Pro and Perso controls update `aria-pressed`, reveal the correct panel, and preserve the page title.
- English defaults to Pro; the French route loads localized copy, the French CV, and localized image alternative text.
- Browser console errors: none.
- Navigation, selected-work CTA, CV link, language switch, and primary contact links remain available in both modes.

## Comparison history

1. Source direction: complex data converges through a vermilion governance checkpoint and resolves into an ordered trusted output.
2. First implementation pass: extended that logic into the hero, proof strip, case study, experience, notes, and contact sections.
3. QA issue found: the desktop headline clipped at an intermediate browser width.
4. Correction: rebalanced the hero columns and reduced the responsive headline scale; subsequent measurements showed equal client and scroll widths and zero page overflow.
5. Final comparison: the source composition and browser render share the same left-to-right hierarchy, restrained palette, fine-line structure, and central governance emphasis with no P0/P1/P2 mismatch.

## Follow-up polish

- Optional P3: the case study intentionally repeats the hero lineage image to reinforce the system; a future project-specific lineage asset could add more visual variety without changing the design language.

final result: passed
