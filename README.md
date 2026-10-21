# Martin McCurley Portfolio

A software development portfolio based in Glasgow, Scotland. The site retains its dark glass styling, animated homepage, and Work / Info navigation.

[Live site](https://martinmccurley.github.io/MMcPortfolio/)

## Run locally

Use Node.js 20 or later.

```sh
npm ci
npm run serve
```

Open http://127.0.0.1:3000. There is no bundler or production build step: GitHub Pages serves the committed HTML, CSS, JavaScript, and assets directly.

```sh
npm test                 # Local references, page setup, and template consistency
npm audit                # Development dependency advisories
npm run playwright       # Installed Playwright CLI
npm run playwright-mcp   # Installed Playwright MCP server
```

## Active pages

- `index.html`: homepage with the three real projects.
- `info.html`: About page, also available through the Info navigation.
- `n8nfinity.html`: n8nfinity project information.
- `metamma.html`: MetaMMA project information.
- `project-1.html`: E-Commerce Platform project information.

`project-2.html`, `project-3.html`, and `project-4.html` are unpublished placeholder case studies. They remain in the repository for reference, are not linked from the homepage, and have `noindex` metadata. `old/`, `perryw/`, and `MMcPortfolioPerry/` contain earlier versions/reference material and are not part of the active site.

## Editing

- Preserve the existing design in `css/main.css`; targeted layout fixes belong in `css/custom.css`.
- Homepage sections live in `templates/hero-section.html` and `templates/main-projects-section.html`.
- About content lives in `templates/info-content.html`.
- Work and Info also contain a copy of their initial content so direct loads show content immediately. When editing a template, update the matching `<main>` in `index.html` or `info.html`. `npm test` checks the About and project-list copies.
- `js/template-loader.js` handles Work / Info switching, URLs, browser history, active navigation, and effect initialization.
- `js/main.js` handles the existing shine, video, navigation, and interaction effects. It requires jQuery and `js/logger.js`, in that order before `main.js`.
- Project pages use the existing layout in `templates/project-template.html`. Remove sections without actual content; do not publish placeholder image boxes or invented project results.
- Internal links must be relative (`info.html`, `resume.pdf`), because the deployed site runs under `/MMcPortfolio/`.

## Assets and behavior

Fonts are served locally from `fonts/`. The active pages use jQuery 3.7.1 and native scrolling. Legacy WebFont and Locomotive scripts remain for archived versions but are not loaded by active pages.

The n8nfinity artwork in `images/n8nfinity-art.png` is an AI-generated illustration, not a product screenshot. The existing MetaMMA images are responsive screenshots. The homepage video and original hover colors are retained.

The shine uses the original light bands: it sweeps on load, responds when scrolling past 100px, resets when scrolling back, and initializes again after returning from Info. Reduced-motion preferences suppress the shine and background video.

## Validation before publishing

Run `npm test` and `npm audit`, then check desktop and mobile layouts in a browser. Exercise Work → Info → Work, browser Back/Forward, the three project links, the mobile social menu, CV links, and the homepage shine. Automated link checks do not prove external services are available or validate project claims.

Commit `package-lock.json` so development-tool installations are reproducible. No analytics service is configured; the old placeholder tracking script has been removed.
