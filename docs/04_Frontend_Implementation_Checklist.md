# Checklist: Step 4 - Implement the Frontend (Building the Site Locally)

This step involves coding the frontend of your portfolio based on the design and layout defined in Step 3, using the tech stack chosen in Step 2. All development and building will happen on your local machine.

## Project Setup
- [ ] **Initialize Project:**
    - [ ] Based on your chosen framework (Astro, SvelteKit, Next.js, or plain HTML/CSS):
        - [ ] Astro: `npm create astro@latest`
        - [ ] SvelteKit: `npm create svelte@latest your-app-name` (choose "Skeleton project" and "TypeScript" if desired, ensure `adapter-static` is set up later)
        - [ ] Next.js: `npx create-next-app@latest your-app-name` (ensure `output: 'export'` in `next.config.js` for static export)
        - [ ] Plain HTML/CSS: Create your project folder and initial `index.html`, `style.css`, `script.js` files.
- [ ] **Version Control:**
    - [ ] Initialize a Git repository: `git init`
    - [ ] Create an initial commit.
    - [ ] Connect to your GitHub repository: `git remote add origin https://github.com/MartinMcCurley/MMcPortfolio.git`
    - [ ] Push initial setup: `git push -u origin main` (or `master`)
- [ ] **Install Dependencies:**
    - [ ] Install any chosen styling libraries (e.g., Tailwind CSS) or animation libraries (e.g., AOS, Typed.js if selected).
    - [ ] Configure Tailwind CSS if used (e.g., `tailwind.config.js`, import into main CSS file).
- [ ] **Directory Structure:** Organize your project files logically (e.g., components, pages/routes, assets, styles).

## Develop Core Layout & Components
- [ ] **Main Layout Shell:**
    - [ ] Create the primary layout component/template that includes the header, footer, and a placeholder for page/section content.
- [ ] **Header/Navigation Component:**
    - [ ] Implement the navigation bar with links as planned.
    - [ ] Style it according to your design, ensuring responsiveness (hamburger menu for mobile).
    - [ ] Implement sticky behavior if decided.
- [ ] **Footer Component:**
    - [ ] Implement the footer with copyright, social links, etc.
- [ ] **Reusable Components (if applicable based on framework):**
    - [ ] Project Card component.
    - [ ] Button component.
    - [ ] Section wrapper component.

## Implement Sections
Develop each section based on your design from Step 3:

- [ ] **Hero Section:**
    - [ ] Add your name, tagline, and any introductory text.
    - [ ] Apply typography and styling.
    - [ ] Implement any subtle background effects or text animations (e.g., Typed.js).
- [ ] **About Section:**
    - [ ] Add your bio text and optional photo.
    - [ ] Style for readability.
- [ ] **Projects Showcase Section:**
    - [ ] Create the grid or list layout.
    - [ ] Develop the `ProjectCard` component (or equivalent structure).
        - [ ] Props: title, description, image URL, tech tags, live link, repo link.
        - [ ] Implement project card styling and hover micro-interactions (CSS preferred).
    - [ ] Populate with placeholder project data initially (actual GitHub data integration is in Step 5, but have a structure for project details).
- [ ] **Skills/Tech Stack Section (if applicable):**
    - [ ] Add content and style minimally.
- [ ] **Contact Section:**
    - [ ] Add email link, social media links.
    - [ ] If including a contact form with a third-party service (e.g., Formspree):
        - [ ] Set up the form HTML.
        - [ ] Configure it to point to the service endpoint.
        - [ ] Style the form.
- [ ] **Resume Link:** Add the link to your PDF resume in the designated spot.

## Styling and Animations
- [ ] **Apply Global Styles:**
    - [ ] Set up base styles (fonts, colors, dark theme defaults) in your global CSS/styling configuration.
- [ ] **Component-Level Styles:**
    - [ ] Style each component and section according to your design mockups/plans.
    - [ ] Implement the minimalist futuristic aesthetic.
- [ ] **Micro-interactions & Animations:**
    - [ ] Implement hover effects for links, buttons, project cards using CSS transitions/animations.
    - [ ] Add any subtle scroll-triggered animations (e.g., using Intersection Observer API or a lightweight library like AOS). Ensure they respect `prefers-reduced-motion`.
    - [ ] Test animations for smoothness and subtlety.

## Responsive Design
- [ ] **Mobile-First Approach:** Start styling for mobile screens and then scale up, or regularly test on various screen sizes during development.
- [ ] **Breakpoints:** Use CSS media queries to adjust layout, font sizes, and element visibility for different screen sizes (mobile, tablet, desktop).
- [ ] **Touch Devices:** Ensure interactions are touch-friendly (e.g., hover effects that reveal critical info should have a fallback or alternative for touch).
- [ ] **Test Thoroughly:** Use browser developer tools to simulate different devices. Test on actual physical devices if possible.

## Local Build and Test
- [ ] **Run Development Server:** Use your framework's command (e.g., `npm run dev`, `npm run start`) to view the site locally as you develop.
- [ ] **Run Local Build:** Periodically run the build command (e.g., `npm run build`) to ensure the static site generation process works correctly.
    - [ ] Astro: `dist/` folder.
    - [ ] SvelteKit (static): `build/` folder (or as configured).
    - [ ] Next.js (static): `out/` folder.
- [ ] **Inspect Build Output:** Check the generated static files to ensure they are as expected.

## Commit Regularly
- [ ] **Make frequent Git commits** with clear messages as you complete features or sections.
- [ ] **Push changes to your GitHub repository** regularly.

By the end of this step, you should have a visually complete, responsive, and locally buildable version of your portfolio website, ready for GitHub data integration and optimization.