# Portfolio — MonÉlu editorial product visual QA

## Evidence

- User-supplied portfolio reference: `/var/folders/cr/l93r26m13rn04rc5rgspzdq00000gn/T/codex-clipboard-885e5a04-e00c-4de5-a5b1-53d2730bc9d0.png`
- Authentic MonÉlu interface reference: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/tmp/monelu-chat.jpg`
- Final generated asset: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/assets/images/monelu-editorial-product.jpg`
- Browser-rendered desktop implementation: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/implementation-monelu-editorial-product-desktop.png`
- Source, generated asset, and live implementation comparison: `/Users/walidelkhoukh/Desktop/Career/walid-portfolio/design-qa-evidence/source-vs-monelu-editorial-product.png`
- Source interface pixels: 1280 × 720.
- Final generated asset pixels: 1536 × 1024; optimized JPEG size approximately 266 KB.
- Desktop state: English, Perso selected, MonÉlu section in view.
- Mobile state: English, Perso selected, 390 × 844 requested viewport; rendered image measured 554 × 360 CSS pixels on the browser stage with zero horizontal overflow.

## Findings

- No actionable P0/P1/P2 issues remain.
- The generated asset keeps the real MonÉlu product recognizable: navy conversation rail, white civic-data interface, French question prompts, central parliament mark, and the genuine MonÉlu wordmark.
- A separate outlined MonÉlu logo plaque, warm paper field, fine border, and offset vermilion block make the image feel native to the portfolio rather than like an untreated screenshot.
- Removing the first generated draft’s duplicated metadata rail keeps the interface large enough to read inside the existing project card.
- The asset remains a product visual rather than a device mockup and does not introduce gradients, 3D treatment, people, or unrelated interface elements.

## Required fidelity surfaces

- Fonts and typography: the portfolio’s surrounding headings and captions are unchanged. The generated image preserves the MonÉlu serif wordmark and core French interface hierarchy without adding external marketing copy.
- Spacing and layout rhythm: the 3:2 asset fits the existing bordered image frame and 390 px desktop image height. Its logo plaque and vermilion offset create clear breathing room around the enlarged interface.
- Colors and visual tokens: warm ivory, ink, MonÉlu navy, white, and restrained vermilion align with the portfolio tokens while retaining the product’s small multicolor parliament mark.
- Image quality and asset fidelity: the final real raster asset is 1536 × 1024 and approximately 266 KB. It is lazy-loaded, declared at intrinsic dimensions, and uses no CSS/SVG reconstruction or placeholder.
- Copy and content: English and French alternative text now describe the branded civic-intelligence product visual. Project copy, links, facts, and SEO metadata remain unchanged.

## Functional verification

- Perso switching exposes the Lab panel and retains `aria-pressed` behavior.
- Browser inspection confirmed `/assets/images/monelu-editorial-product.jpg` at natural dimensions 1536 × 1024.
- Desktop and mobile checks report zero horizontal overflow.
- Browser console errors: none.
- English and French markup reference the same optimized asset with localized alternative text.

## Comparison history

1. Previous state: a raw MonÉlu application screenshot sat inside the otherwise editorial project section.
2. First ImageGen pass: preserved the authentic interface and added the MonÉlu logo, paper texture, fine frame, vermilion offset, and a left metadata rail.
3. P2 found: the duplicated metadata rail repeated copy already present in the HTML and reduced the visible product area.
4. Fix: removed the rail, enlarged the application interface, retained the logo plaque and editorial framing, and regenerated the asset.
5. Post-fix comparison: source UI, generated asset, and live portfolio render preserve the same product identity with no remaining P0/P1/P2 mismatch.

## Follow-up polish

- Optional P3: if MonÉlu’s production UI changes materially, refresh the authentic reference before regenerating this editorial asset.

final result: passed
