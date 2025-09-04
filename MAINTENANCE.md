# Portfolio Maintenance Guide

> **Last Updated**: January 2025  
> **Next Review**: April 2025

## 🔧 Routine Maintenance Tasks

### Monthly Tasks
- [ ] **Performance Audit** - Run Lighthouse and check Core Web Vitals
- [ ] **Browser Testing** - Test latest browser versions using `browser-testing-checklist.md`
- [ ] **Security Updates** - Update any third-party dependencies
- [ ] **Content Review** - Update project descriptions and resume if needed
- [ ] **Analytics Review** - Check Google Analytics for performance insights

### Quarterly Tasks
- [ ] **Dependency Updates** - Update jQuery, WebFont.js if new versions available
- [ ] **Image Optimization** - Compress and optimize any new images
- [ ] **SEO Review** - Update meta descriptions and structured data
- [ ] **Accessibility Audit** - Run WAVE or axe-core accessibility checks
- [ ] **Cross-Device Testing** - Test on actual mobile devices and tablets

### Annual Tasks
- [ ] **Complete Redesign Review** - Evaluate current design trends
- [ ] **Technology Stack Assessment** - Consider modern framework adoption
- [ ] **Performance Baseline Update** - Update performance targets
- [ ] **Documentation Review** - Update all documentation and guides

## 🚀 Performance Monitoring

### Key Metrics to Track
```javascript
// Use these commands in browser console for quick checks
enableDebug();                          // Enable debug logging
getLogStats();                          // Check error statistics
window.performanceOptimizer?.getPerformanceMetrics(); // Get performance data
```

### Performance Targets
- **FCP (First Contentful Paint)**: < 1.2s
- **LCP (Largest Contentful Paint)**: < 2.0s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms
- **Lighthouse Score**: 95+ across all categories

### Warning Signs
- Console errors in production mode
- FPS dropping below 30 on interactions
- Memory usage warnings in performance monitoring
- Failed template loading in SPA navigation

## 🛠️ Development Workflow

### Adding New Projects

1. **Create Project Page**
   ```bash
   # Copy the template
   cp templates/project-template.html project-5.html
   ```

2. **Replace Placeholders**
   - See `templates/README.md` for complete placeholder list
   - Update all 22 variables with project-specific content
   - Ensure image paths point to optimized assets

3. **Add to Navigation**
   - Update `templates/projects-grid-section.html`
   - Add new project card with appropriate styling
   - Test SPA navigation to new project

4. **Optimize Images**
   ```bash
   # Create responsive variants (use image optimization tools)
   project-5-banner-p-500.png   # Mobile
   project-5-banner-p-800.png   # Tablet  
   project-5-banner-p-1080.png  # Desktop
   project-5-banner-p-1600.png  # High-res
   ```

### Making Style Changes

1. **CSS Organization**
   ```css
   /* Add new styles to css/custom.css */
   /* Task [Number]: [Description] */
   .new-feature {
       /* Styles here */
   }
   ```

2. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify mobile responsiveness
   - Check legacy browser fallbacks

3. **Performance Impact**
   - Monitor animation performance (60fps target)
   - Check for layout shift with new elements
   - Verify loading performance isn't degraded

### JavaScript Updates

1. **Error Handling**
   ```javascript
   // Always use safe execution for new features
   safeLog.safe(() => {
       // Your new functionality here
   }, null, 'Feature name');
   ```

2. **Logging Best Practices**
   ```javascript
   // Use appropriate log levels
   safeLog.error('Critical errors only');
   safeLog.warn('Important warnings');
   safeLog.info('General information (dev only)');
   safeLog.debug('Detailed debugging (dev only)');
   ```

3. **Performance Monitoring**
   ```javascript
   // Measure performance of new features
   const startTime = performance.now();
   // ... your code ...
   safeLog.perf('Feature Name', performance.now() - startTime);
   ```

## 🧪 Testing Procedures

### Before Each Deployment

1. **Functional Testing**
   - [ ] SPA navigation works (Work ↔ Info)
   - [ ] All project cards display correctly
   - [ ] Logo navigation returns to work page
   - [ ] Mobile menu functions properly
   - [ ] All external links open correctly

2. **Visual Testing**
   - [ ] Project card hover effects work
   - [ ] Color themes display distinctly
   - [ ] Responsive layouts adapt properly
   - [ ] Loading animations smooth

3. **Performance Testing**
   - [ ] Run Lighthouse audit (95+ score)
   - [ ] Check console for errors/warnings
   - [ ] Test slow 3G network simulation
   - [ ] Verify Core Web Vitals

4. **Accessibility Testing**
   - [ ] Keyboard navigation works
   - [ ] Screen reader compatibility
   - [ ] Color contrast compliance
   - [ ] Focus indicators visible

### Cross-Browser Testing Checklist

Use the comprehensive `browser-testing-checklist.md` for detailed testing procedures.

**Quick Test Matrix:**
- Chrome (latest) ✅
- Firefox (latest) ✅  
- Safari (latest) ✅
- Edge (latest) ✅
- iOS Safari ✅
- Chrome Mobile ✅

## 🚨 Troubleshooting Common Issues

### SPA Navigation Not Working
```javascript
// Debug SPA navigation
console.log('Current page:', window.templateLoader?.currentPage);
window.templateLoader?.navigateTo('work'); // Test navigation
```

**Common Causes:**
- Template loading errors (check Network tab)
- JavaScript errors preventing navigation
- Cache issues (clear browser cache)

### Performance Issues
```javascript
// Check performance metrics
window.performanceOptimizer?.getPerformanceMetrics();
// Monitor FPS
// Check memory usage in DevTools
```

**Common Causes:**
- Large unoptimized images
- Too many will-change properties
- JavaScript errors causing loops
- Missing fallbacks for older browsers

### Visual Layout Issues
```css
/* Debug layout issues */
.debug * {
    border: 1px solid red !important;
}
```

**Common Causes:**
- Missing vendor prefixes
- CSS Grid not supported (needs fallback)
- Aspect-ratio not supported (needs fallback)
- Z-index conflicts

### Error Logging Issues
```javascript
// Check logger status
window.logger?.getStats();
// Enable debug mode temporarily
enableDebug();
```

**Common Causes:**
- Error spam limiting triggered
- Wrong environment detection
- Console methods overridden

## 🔄 Update Procedures

### Updating Dependencies

1. **jQuery Updates**
   ```html
   <!-- Update version in index.html and all project pages -->
   <script src="js/jquery-3.X.X.min.js"></script>
   ```

2. **Font Updates**
   ```javascript
   // Update font families in WebFont.load() calls
   families: ["Inter:100,200,300,regular,500,600,700,800,900"]
   ```

3. **CSS Framework Updates**
   - Test thoroughly after any main.css changes
   - Verify responsive breakpoints still work
   - Check animation performance

### Content Updates

1. **Project Information**
   - Update project descriptions in templates
   - Replace project images with optimized versions
   - Update technology tags and links

2. **Personal Information**
   - Update resume.pdf
   - Refresh bio content in info.html
   - Update social media links

3. **SEO Content**
   - Update meta descriptions
   - Refresh Open Graph images
   - Update structured data

## 📊 Analytics & Monitoring

### Google Analytics Events
The site automatically tracks:
- Performance metrics (FCP, LCP, CLS)
- Error events and exceptions
- User interactions and navigation

### Performance Monitoring
```javascript
// Custom performance tracking
if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
        name: 'custom_metric',
        value: measurementValue
    });
}
```

### Error Tracking
All JavaScript errors are automatically tracked and sent to analytics in production.

## 🔒 Security Considerations

### Content Security Policy
```html
<!-- Consider adding CSP headers for enhanced security -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

### External Dependencies
- Regularly update jQuery to latest stable version
- Monitor for security advisories on WebFont.js
- Keep Google Analytics tracking code updated

### User Data
- No personal user data is collected or stored
- Only anonymous analytics data is gathered
- All external links use proper rel attributes

## 📱 Mobile Considerations

### Touch Interactions
- All interactive elements have 44px minimum touch targets
- Touch gestures work properly on all devices
- No 300ms tap delays on interactive elements

### Performance on Mobile
- Images load appropriate sizes for device
- Animations maintain 60fps on mobile devices
- Network-aware optimizations for slow connections

### iOS Safari Specific
- Test scroll behavior and fixed positioning
- Verify backdrop-filter effects work
- Check viewport meta tag handling

## 🚀 Future Planning

### Potential Improvements
- Service Worker for offline functionality
- Dark mode implementation
- Contact form integration
- Blog section for technical articles
- CMS integration for easier updates

### Technology Considerations
- Consider React/Vue.js migration for complex interactions
- Evaluate modern CSS features adoption
- Assess PWA implementation benefits
- Consider TypeScript for larger JavaScript files

---

## 📞 Emergency Contacts

**Repository**: [GitHub - MMcPortfolio](https://github.com/MartinMcCurley/MMcPortfolio)  
**Live Site**: [martinmccurley.github.io/MMcPortfolio](https://martinmccurley.github.io/MMcPortfolio/)  
**Issues**: Use GitHub Issues for bug reports and feature requests

**Quick Recovery Commands:**
```bash
# Revert to last working commit
git revert HEAD

# Deploy specific commit
git checkout [commit-hash]
git push origin main --force-with-lease

# Clear all caches
# (Use browser dev tools or incognito mode)
```

---

*This maintenance guide should be reviewed and updated quarterly to ensure it remains current with the latest web standards and best practices.* 