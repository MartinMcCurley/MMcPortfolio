# Checklist: Step 6 - Optimize for Performance and Accessibility (for GoDaddy)

With the site functionally complete and GitHub data integrated, this step focuses on polishing it for fast load times (especially crucial on shared hosting like GoDaddy) and ensuring it's usable by everyone.

## Performance Optimization
- [ ] **Image Optimization:**
    - [ ] **Compression:** Compress all images (JPG, PNG, SVG) using tools like TinyPNG/TinyJPG, ImageOptim, or automated build tools/plugins.
    - [ ] **Correct Format:** Use WebP for images where appropriate if you can manage fallbacks or if browser support is sufficient for your audience (though for simplicity on static hosting, well-optimized JPGs/PNGs are fine). SVGs for icons and logos.
    - [ ] **Responsive Images:** Use `<picture>` element or `srcset` attribute for `<img>` if you need to serve different image sizes for different screen resolutions (can be overkill for a very minimal portfolio if images are already small).
    - [ ] **Dimensions:** Ensure images are served at the size they are displayed. Don't use large images scaled down by CSS.
    - [ ] **Lazy Loading:** Implement `loading="lazy"` attribute on `<img>` tags for images below the fold to improve initial page load.
- [ ] **Code Minification:**
    - [ ] **CSS:** Ensure your build process minifies CSS files. Most modern frameworks/build tools do this automatically for production builds.
    - [ ] **JavaScript:** Ensure your build process minifies JS files.
    - [ ] **HTML:** HTML minification is often handled by frameworks during static generation.
- [ ] **Minimize JS & CSS:**
    - [ ] **Remove Unused Code:** Use linters and code analysis tools to identify and remove dead code or unused CSS selectors (Tailwind CSS does this with `purge`/`content` options).
    - [ ] **Limit Libraries:** Only use JavaScript libraries that are essential. Prioritize CSS for animations and interactions where possible.
    - [ ] **Bundle Analysis (if applicable):** Use tools like `webpack-bundle-analyzer` (for Next.js/Webpack) or `rollup-plugin-visualizer` (for SvelteKit/Rollup) to inspect your JS bundles and identify large dependencies.
- [ ] **Leverage Browser Caching (`.htaccess` on GoDaddy):**
    - [ ] Create/Update an `.htaccess` file in your `public_html` (or relevant deployment directory) to instruct browsers to cache static assets (CSS, JS, images) for longer periods. (Refer to specific `.htaccess` rules in Step 7).
- [ ] **Reduce Server Requests:**
    - [ ] Combine CSS/JS files if not handled by your framework's build process (though most modern frameworks do this well).
    - [ ] Use SVG icons directly in HTML (inline SVG) or as part of a sprite sheet to reduce requests, if using many small icons.
- [ ] **Font Loading Optimization:**
    - [ ] **Host fonts locally** if using custom fonts, or ensure your font provider (e.g., Google Fonts) uses efficient loading.
    - [ ] Use `font-display: swap;` in `@font-face` to ensure text remains visible while custom fonts load.
- [ ] **Performance Testing:**
    - [ ] **Lighthouse:** Run Lighthouse audits in Chrome DevTools. Aim for high scores (90+) in Performance. Analyze and address reported issues.
    - [ ] **WebPageTest:** For more detailed performance analysis from different locations and devices.
    - [ ] **Check Load Times:** Test on simulated slower network conditions.

## Accessibility (a11y) Improvements
- [ ] **Semantic HTML:**
    - [ ] Use HTML5 semantic elements correctly (`<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<header>`).
    - [ ] Ensure a logical content structure.
- [ ] **Image Alt Text:**
    - [ ] Provide descriptive `alt` text for all informative images (e.g., project screenshots `alt="Screenshot of Project X interface"`).
    - [ ] Use empty `alt=""` for purely decorative images that screen readers should ignore.
- [ ] **Keyboard Navigation:**
    - [ ] Ensure all interactive elements (links, buttons, form fields) are focusable and operable using only the keyboard.
    - [ ] Check for a logical tab order.
    - [ ] Visible Focus Indicators: Do not remove default browser focus outlines unless you provide a clear, high-contrast custom alternative.
- [ ] **Color Contrast:**
    - [ ] Use tools (e.g., WebAIM Contrast Checker, browser dev tools) to verify that text and UI elements have sufficient color contrast against their background (WCAG AA minimum). This is especially important for your dark theme.
- [ ] **Forms (if applicable for contact form):**
    - [ ] Associate `<label>` elements with their form controls using `for` and `id` attributes.
    - [ ] Use appropriate `input` types (e.g., `type="email"`).
    - [ ] Provide clear error messages if validation is handled client-side (though for static forms, validation might be by the third-party service).
- [ ] **ARIA Roles & Attributes (Use Sparingly and Correctly):**
    - [ ] Only use ARIA if semantic HTML is insufficient to convey roles, states, or properties of custom widgets or complex UI elements. For a simple portfolio, this might not be heavily needed.
    - [ ] Example: If you have a custom dark/light mode toggle button, ensure it has an appropriate `aria-label` and `aria-pressed` state if it's not a standard HTML button.
- [ ] **Respect User Preferences:**
    - [ ] Implement `prefers-reduced-motion` media query to disable or reduce animations for users who prefer it.
    ```css
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```
- [ ] **Content Readability:**
    - [ ] Ensure text is clear, concise, and easy to understand.
    - [ ] Use appropriate font sizes and line heights.
- [ ] **Accessibility Testing:**
    - [ ] **Automated Tools:** Use tools like Axe DevTools browser extension or Lighthouse accessibility audit to catch common issues.
    - [ ] **Manual Testing:**
        - [ ] Navigate using only the keyboard.
        - [ ] Test with a screen reader (e.g., NVDA, VoiceOver, JAWS) to understand how it's experienced by visually impaired users.
        - [ ] Zoom text up to 200% to check for layout breaks.

## Final Review
- [ ] **Check for Broken Links:** Test all internal and external links.
- [ ] **Proofread Content:** Check for typos and grammatical errors.
- [ ] **Console Errors:** Open the browser developer console and check for any errors or warnings.
- [ ] **Cross-Browser Testing:** Test the site on major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent appearance and functionality.

By completing this checklist, your portfolio will be performant, accessible, and professional, providing a great experience for all visitors.