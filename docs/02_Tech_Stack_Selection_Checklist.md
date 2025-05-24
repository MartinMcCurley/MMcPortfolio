# Checklist: Step 2 - Choose the Right Tech Stack (GoDaddy Deluxe Compatible)

This step focuses on selecting a technology stack that aligns with your project goals, modern development practices, your minimalist design, and crucially, the constraints of GoDaddy Deluxe (cPanel) shared hosting. The primary constraint is that **the build process must happen locally or via a CI/CD service, and you will deploy static files.**

## Hosting Environment Understanding (GoDaddy Deluxe)
- [ ] **Acknowledge Shared Hosting Limitations:** Understand that GoDaddy Deluxe is shared hosting. This means:
    - [ ] No direct `npm run build` or similar complex build commands on the server.
    - [ ] Limited server-side processing power for Node.js applications (if any version is even available/usable for builds, it's not officially supported or reliable for this).
    - [ ] Deployment will primarily be via FTP/SFTP or cPanel File Manager for pre-built static files.
- [ ] **Supported Technologies by GoDaddy:** Primarily HTML, CSS, JavaScript, PHP. Apache server is common, meaning `.htaccess` can be used.
- [ ] **Custom Domain:** `MartinMcCurley.com` will be used.
- [ ] **SSL:** Free SSL is available via GoDaddy.

## Framework/Technology Evaluation Criteria
- [ ] **Static Site Generation (SSG):** Prioritize frameworks that excel at generating pure static HTML, CSS, and JavaScript.
- [ ] **Performance:** The framework should produce optimized, lightweight sites.
- [ ] **Developer Experience:** Choose something you are comfortable with or interested in learning, that has good documentation.
- [ ] **Minimalism & Interactivity:** Ability to implement your desired subtle animations and interactions without excessive JavaScript.
- [ ] **GitHub Integration:** The framework should allow fetching data from GitHub at build time.
- [ ] **Ecosystem & Community:** Consider the availability of resources, libraries, and community support.

## Recommended Tech Stack Options
Choose **one** primary framework:

### Option 1: Astro
- [ ] **Evaluate Astro:**
    - [ ] **Pros:** Excellent for content-focused static sites, ships zero JS by default ("Islands Architecture" for opt-in client-side JS), fantastic performance, supports components from React/Svelte/Vue if needed for specific interactive islands (though aim for minimal JS), good for minimalist designs. Build output is clean static files in a `dist/` folder.
    - [ ] **GoDaddy Compatibility:** Ideal. Build locally (`npm run build`), upload `dist/` folder.
- [ ] **Decision for Astro:** `Yes / No / Undecided`

### Option 2: SvelteKit (with Static Adapter)
- [ ] **Evaluate SvelteKit:**
    - [ ] **Pros:** Compiler that writes efficient imperative code, results in small bundles and fast performance. `adapter-static` allows pre-rendering the entire site. Great developer experience and built-in transitions/animations can be very minimal. Build output (e.g., in `build/` folder) is static.
    - [ ] **GoDaddy Compatibility:** Excellent with `adapter-static`. Build locally (`npm run build`), upload output folder.
- [ ] **Decision for SvelteKit:** `Yes / No / Undecided`

### Option 3: Next.js (with Static Export)
- [ ] **Evaluate Next.js:**
    - [ ] **Pros:** Popular React framework, large ecosystem. Can be configured for full static export (`output: 'export'` in `next.config.js`).
    - [ ] **Cons for this use case:** Can be overkill for a simple static portfolio, potentially larger JS bundles than Astro/SvelteKit unless carefully managed. `next export` has some limitations compared to a live Next.js app (e.g., dynamic routes might need specific configuration, API routes won't work directly on GoDaddy).
    - [ ] **GoDaddy Compatibility:** Good with `output: 'export'`. Build locally (`npm run build`), upload `out/` folder. May require `.htaccess` for routing if SPA-like navigation is used.
- [ ] **Decision for Next.js:** `Yes / No / Undecided`

### Option 4: Plain HTML, CSS, and Vanilla JavaScript
- [ ] **Evaluate Plain HTML/CSS/JS:**
    - [ ] **Pros:** Maximum control, potentially the most lightweight if done well. No build step required beyond your own organization.
    - [ ] **Cons:** Can be more work to structure, maintain, and implement features like templating or GitHub data fetching (would require client-side JS fetch or a separate build script).
    - [ ] **GoDaddy Compatibility:** Perfect. Directly upload files.
- [ ] **Decision for Plain HTML/CSS/JS:** `Yes / No / Undecided`

## Styling Solution
- [ ] **Choose a Styling Approach:**
    - [ ] **Tailwind CSS:** Utility-first framework, great for rapid UI development and maintaining consistency. Pairs well with minimalist designs and all recommended frameworks.
    - [ ] **Plain CSS/SASS:** Write custom CSS or SASS. Gives full control but might take longer.
    - [ ] **CSS-in-JS (if using React/Next.js):** E.g., Styled Components, Emotion. Be mindful of potential runtime overhead for a static site.
    - [ ] **Framework-specific styling (e.g., Svelte's scoped styles):** Often a good default.

## Version Control & Development Environment
- [ ] **Git & GitHub:** Use Git for version control. Host repository on GitHub (`MartinMcCurley/MMcPortfolio`).
- [ ] **Node.js & npm/pnpm/yarn:** Ensure Node.js and a package manager are installed locally for development, dependency management, and running build scripts.

## Final Tech Stack Decision
- [ ] **Selected Framework:** _________________________
- [ ] **Selected Styling Solution:** _________________________
- [ ] **Rationale (briefly):** _________________________________________________________

This checklist will help you choose a tech stack optimized for both your design goals and GoDaddy's hosting environment.