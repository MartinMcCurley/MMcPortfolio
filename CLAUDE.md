# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
# No build process - static HTML/CSS/JS portfolio
# Open directly in browser or use Live Server extension
# Right-click index.html → "Open with Live Server" (VS Code)

# Alternative: Use built-in HTTP server
npm run serve  # Serves on http://localhost:3000
```

### Testing Commands
```bash
# Use browser dev tools for testing - no CLI tools
# Performance: Run Lighthouse audits (target: 95+ score)
# Cross-browser: Follow browser-testing-checklist.md procedures
# Responsive: Use browser responsive design mode

# Playwright MCP Server (for automated browser testing)
npm run playwright-mcp  # Start MCP server manually
npm run playwright      # Run Playwright CLI commands
```

### Debug Commands (Browser Console)
```javascript
// Enable debug logging in development
enableDebug();

// Check performance metrics and error stats
getLogStats();
window.performanceOptimizer?.getPerformanceMetrics();

// Test SPA navigation system
window.templateLoader.navigateTo('info');
window.templateLoader.navigateTo('work');

// Monitor logger health
window.logger.getStats();
```

## Architecture Overview

### SPA Navigation System
The portfolio uses a custom Single Page Application system without framework dependencies:
- **template-loader.js**: Handles navigation between Work/Info pages without full page reloads
- **Templates are cached** after first load for instant subsequent navigation
- **URL state management** with hash-based routing
- **Error boundaries** provide fallback to full page navigation if SPA fails

### Enhanced Logging & Error Handling
- **Smart environment detection**: Debug logs in development, error-only in production
- **Error spam limiting**: Prevents console flooding from repeated errors
- **Performance monitoring**: Tracks FCP, LCP, CLS with automatic analytics reporting
- **Safe execution wrappers**: All major functions wrapped in try/catch with logging

### Cross-Browser Compatibility Strategy
- **Polyfills in main.js**: Fetch, Promise.all for older browsers
- **Feature detection**: WebP support, Intersection Observer, CSS Grid
- **Graceful degradation**: Fallbacks for modern CSS features (aspect-ratio, backdrop-filter)
- **Vendor prefixes**: Automatically handled in css/custom.css

### Performance Architecture
- **Responsive images**: 4-breakpoint strategy (500px, 800px, 1080px, 1600px) with srcset
- **Resource preloading**: Critical fonts and images preloaded in HTML head
- **GPU acceleration**: will-change and transform3d for smooth animations
- **Lazy loading**: Images and non-critical resources loaded on demand

## Project Template System

### Creating New Project Pages
1. Copy `templates/project-template.html` to root directory
2. Rename to `project-X.html` (where X is next number)
3. Replace 22 placeholders with actual content (see templates/README.md)
4. Update navigation in `templates/main-projects-section.html` or `projects-grid-section.html`

### Template Placeholders (Key Ones)
```html
{{PROJECT_TITLE}} - SEO title
{{PROJECT_CLASS}} - CSS class for styling
{{PROJECT_TYPE}} - Category (Full-Stack, Frontend, etc.)
{{PROJECT_TAGLINE}} - Hero section description
{{TECHNOLOGY_TAGS}} - HTML for tech stack tags
{{DETAIL_SECTION_X_*}} - Content sections with images
```

## CSS Architecture

### File Organization
- **css/main.css**: Core styles, should rarely be modified
- **css/custom.css**: All customizations and new features go here
- **Task-based comments**: New features should include "Task [Number]: [Description]"

### Performance CSS Patterns
```css
/* GPU acceleration for animations */
.animated-element {
    will-change: transform, opacity;
    transform: translate3d(0, 0, 0);
}

/* Responsive images with aspect ratio */
.responsive-image {
    aspect-ratio: 16 / 9;
    object-fit: cover;
}
```

## JavaScript Patterns

### Error-Safe Execution
```javascript
// Use safeLog.safe() for all new functionality
safeLog.safe(() => {
    // Your code here
}, null, 'Feature Name');

// Logging levels
safeLog.error('Critical errors only');
safeLog.warn('Important warnings'); 
safeLog.info('Dev-only information');
safeLog.debug('Detailed debugging');
```

### Performance Monitoring
```javascript
// Measure feature performance
const startTime = performance.now();
// ... feature code ...
safeLog.perf('Feature Name', performance.now() - startTime);
```

## Critical Performance Targets

### Core Web Vitals
- **FCP**: < 1.2s (First Contentful Paint)
- **LCP**: < 2.0s (Largest Contentful Paint)  
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FID**: < 100ms (First Input Delay)

### Testing Requirements
- All features must work without JavaScript as fallback
- Cross-browser testing matrix in browser-testing-checklist.md must pass
- Mobile responsiveness required for all new components
- No console errors in production mode

## Playwright MCP Server

This project now includes Microsoft's Playwright MCP (Model Context Protocol) server for automated browser testing and interaction. The MCP server enables:

- **Browser automation**: Launch and control browsers (Chromium, Firefox, Safari)
- **Web scraping**: Extract structured data from web pages
- **Visual testing**: Compare screenshots and detect visual regressions
- **Accessibility testing**: Analyze accessibility tree and compliance
- **Performance testing**: Measure page load times and Core Web Vitals

### MCP Server Configuration
The server is configured in Claude Code's local config (`~/.claude.json`) and can be used through Claude's interface for automated testing tasks.

### Available Browsers
- Chromium 140.0.7339.24 (playwright build v1188)  
- Firefox 141.0 (playwright build v1490)
- Webkit 26.0 (playwright build v2206)

## Critical Development Notes

### SPA Navigation Dependencies
- Changes to header/footer templates require updating ALL project pages manually
- Template caching means changes need hard refresh to see during development
- Navigation failures fall back to full page loads automatically

### Image Optimization Requirements
New images must include 4 responsive variants:
```
image-name-p-500.png   # Mobile (≤ 500px)
image-name-p-800.png   # Tablet (≤ 800px)  
image-name-p-1080.png  # Desktop (≤ 1080px)
image-name-p-1600.png  # High-res (> 1080px)
```

### Error Logging Behavior
- Production mode: Only errors logged, info/debug suppressed
- Error spam limiting: Repeated errors throttled after 10 occurrences
- Performance events automatically sent to Google Analytics in production