# Project Checklist Guide

This document outlines the recommended order for progressing through the project checklists. Each checklist corresponds to a specific phase of development for the Martin McCurley Portfolio.

Refer to the [overall Progress Report](progress.md) to see the current status of each phase.

**Important Design Documents:**
Throughout the process, especially during frontend implementation and design phases, refer to:
- [Color Palette](color-palette.md) for all color specifications.
- [Typography System](typography-system.md) for font choices, sizes, and hierarchy.

## Checklist Order:

1.  **[01_UI_UX_Trends_Checklist.md](01_UI_UX_Trends_Checklist.md)**
    *   Focus: Researching and defining the visual and interactive style of your portfolio, aligning with modern UI/UX trends (minimalism, minimalist futurism).
    *   Key for establishing the core design philosophy, color palette, and typography.

2.  **[02_Tech_Stack_Selection_Checklist.md](02_Tech_Stack_Selection_Checklist.md)**
    *   Focus: Choosing the right technology stack compatible with GoDaddy Deluxe shared hosting, prioritizing static site generation.
    *   Key for decisions on frameworks (Next.js decided), styling solutions (Tailwind CSS decided).

3.  **[03_Design_And_Layout_Checklist.md](03_Design_And_Layout_Checklist.md)**
    *   Focus: Translating the UI/UX vision into a concrete plan for the portfolio's structure, content, and key visual components.
    *   Define overall structure, navigation, and layout for sections like Hero, About, Projects, and Contact. *Refer heavily to `color-palette.md` and `typography-system.md` here.*

4.  **[04_Frontend_Implementation_Checklist.md](04_Frontend_Implementation_Checklist.md)**
    *   Focus: Coding the frontend of the portfolio based on the defined design and layout, using the selected tech stack.
    *   Implement core layout, components, sections, styling, and responsiveness. *Refer heavily to `color-palette.md` and `typography-system.md` here.*

5.  **[05_GitHub_Integration_Checklist.md](05_GitHub_Integration_Checklist.md)**
    *   Focus: Integrating dynamic project information from GitHub repositories at build time.
    *   Plan API strategy, fetch data, and display it in the projects showcase section.

6.  **[06_Optimization_Accessibility_Checklist.md](06_Optimization_Accessibility_Checklist.md)**
    *   Focus: Polishing the site for performance (especially for shared hosting) and ensuring accessibility (a11y).
    *   Includes image optimization, code minification, caching, semantic HTML, ARIA roles, and testing.

7.  **[07_Deployment_GoDaddy_Checklist.md](07_Deployment_GoDaddy_Checklist.md)**
    *   Focus: Deploying the optimized, statically built portfolio to GoDaddy Deluxe hosting and configuring the custom domain.
    *   Covers pre-deployment checks, deployment methods (manual or GitHub Actions), and post-deployment testing.

By following these checklists in order, you can systematically build and deploy your portfolio. 