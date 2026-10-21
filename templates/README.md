# Project templates

These templates use the existing dark glass design. Keep layout and typography consistent with the current site.

## Shared page content

- `hero-section.html`: original homepage hero and video.
- `main-projects-section.html`: only n8nfinity, MetaMMA, and E-Commerce Platform are real published projects.
- `info-content.html`: the single About introduction and its background sections.
- `header.html` and `footer.html`: reference markup for the shared navigation and footer.

When changing shared content, update the corresponding markup in the standalone page too. Run `npm test` to catch mismatches in the About content and homepage project list.

## Adding a project

1. Copy `project-template.html` to a named HTML file at the repository root.
2. Replace every `{{PLACEHOLDER}}` with actual project content.
3. Supply a real image or a clearly described illustration. Remove sections that have no content.
4. Keep links relative to the project root and load jQuery, the logger, and `main.js` in order.
5. Add the project card to `main-projects-section.html` and the homepage copy only when the project is real and ready to publish.
6. Check desktop and mobile alignment, back navigation, images, and console errors.

Styling is shared through `css/main.css` and scoped maintenance rules in `css/custom.css`. Avoid adding page-specific inline style blocks, duplicate headings, placeholder metrics, or the retired Locomotive/WebFont scripts.
