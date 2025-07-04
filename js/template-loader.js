/**
 * Template Loader Utility
 * Handles SPA-style content switching for portfolio
 */

class TemplateLoader {
  constructor() {
    this.cache = new Map();
    this.currentPage = 'work';
    this.isLoading = false;
    this.isNavigating = false; // Flag to prevent hashchange loops
  }

  /**
   * Load and cache template content
   */
  async loadTemplate(templatePath) {
    console.log('Loading template:', templatePath);
    
    if (this.cache.has(templatePath)) {
      console.log('Template found in cache:', templatePath);
      return this.cache.get(templatePath);
    }

    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath} (${response.status})`);
      }
      const content = await response.text();
      console.log('Template loaded successfully:', templatePath, 'Content length:', content.length);
      this.cache.set(templatePath, content);
      return content;
    } catch (error) {
      console.error('Template loading error:', error);
      return '';
    }
  }

  /**
   * Set active navigation state
   */
  setActiveNav(page) {
    console.log('Setting active nav:', page);
    
    const workNav = document.getElementById('nav-work');
    const infoNav = document.getElementById('nav-info');
    const navGlow = document.getElementById('nav-glow');
    const navPill = document.getElementById('nav-pill');

    if (!workNav || !infoNav) {
      console.warn('Navigation elements not found');
      return;
    }

    // Reset states
    workNav.classList.remove('active');
    infoNav.classList.remove('active');
    
    if (navGlow) {
      navGlow.classList.remove('info');
    }
    if (navPill) {
      navPill.classList.remove('info');
    }

    // Set active state
    if (page === 'info') {
      infoNav.classList.add('active');
      if (navGlow) navGlow.classList.add('info');
      if (navPill) navPill.classList.add('info');
    } else {
      workNav.classList.add('active');
    }

    this.currentPage = page;
    console.log('Active nav set to:', page);
  }

  /**
   * Load main content based on page type
   */
  async loadMainContent(page) {
    if (this.isLoading) {
      console.log('Already loading, skipping');
      return;
    }
    
    console.log('Loading main content for page:', page);
    this.isLoading = true;

    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
      console.error('Main content container not found');
      this.isLoading = false;
      return;
    }

    try {
      console.log('Starting fade out...');
      // Add fade out effect
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(20px)';

      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log('Fade out complete, loading content...');

      let contentHtml = '';
      
      if (page === 'work') {
        console.log('Loading work page templates...');
        // Load work page content (hero + projects)
        const [heroContent, mainProjectsContent, projectsGridContent] = await Promise.all([
          this.loadTemplate('templates/hero-section.html'),
          this.loadTemplate('templates/main-projects-section.html'),
          this.loadTemplate('templates/projects-grid-section.html')
        ]);
        
        contentHtml = heroContent + mainProjectsContent + projectsGridContent;
        console.log('Work content assembled, length:', contentHtml.length);
      } else if (page === 'info') {
        console.log('Loading info page template...');
        // Load info page content
        contentHtml = await this.loadTemplate('templates/info-content.html');
        console.log('Info content loaded, length:', contentHtml.length);
      }

      console.log('Updating main content HTML...');
      // Update content
      mainContent.innerHTML = contentHtml;
      
      console.log('Content updated, starting fade in...');
      // Wait a bit then fade in
      await new Promise(resolve => setTimeout(resolve, 50));
      
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
      console.log('Fade in complete');
      
      // Detailed debugging for the black screen issue
      console.log('=== VISUAL DEBUG INFO ===');
      console.log('Main content element:', mainContent);
      console.log('Main content innerHTML length:', mainContent.innerHTML.length);
      console.log('Main content computed styles:');
      const computedStyles = window.getComputedStyle(mainContent);
      console.log('- opacity:', computedStyles.opacity);
      console.log('- display:', computedStyles.display);
      console.log('- visibility:', computedStyles.visibility);
      console.log('- position:', computedStyles.position);
      console.log('- z-index:', computedStyles.zIndex);
      
      // Check loading overlay
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        const overlayStyles = window.getComputedStyle(loadingOverlay);
        console.log('Loading overlay found:');
        console.log('- display:', overlayStyles.display);
        console.log('- opacity:', overlayStyles.opacity);
        console.log('- z-index:', overlayStyles.zIndex);
        console.log('- visibility:', overlayStyles.visibility);
        
        // Force hide the loading overlay
        loadingOverlay.style.display = 'none';
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
        console.log('Loading overlay force hidden');
      } else {
        console.log('Loading overlay not found');
      }
      
      // Check if main content has any children
      console.log('Main content children count:', mainContent.children.length);
      if (mainContent.children.length > 0) {
        console.log('First child:', mainContent.children[0]);
        const firstChild = mainContent.children[0];
        if (firstChild) {
          const childStyles = window.getComputedStyle(firstChild);
          console.log('First child styles:');
          console.log('- display:', childStyles.display);
          console.log('- opacity:', childStyles.opacity);
          console.log('- visibility:', childStyles.visibility);
        }
      }
      
      // Force ensure main content is visible
      mainContent.style.display = 'block';
      mainContent.style.visibility = 'visible';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
      console.log('Main content visibility forced');
      
      // CRITICAL: Fix body opacity issue
      const body = document.body;
      if (body) {
        body.style.opacity = '1';
        body.style.visibility = 'visible';
        console.log('Body opacity set to 1');
      }
      
      // CRITICAL: Ensure all loading overlays are hidden
      const allLoadingOverlays = document.querySelectorAll('.loading-overlay, [data-w-id="a91daa17-edea-3045-e068-85775e828427"]');
      allLoadingOverlays.forEach((overlay, index) => {
        if (overlay) {
          overlay.style.display = 'none';
          overlay.style.opacity = '0';
          overlay.style.visibility = 'hidden';
          overlay.style.zIndex = '-1';
          console.log(`Loading overlay ${index + 1} force hidden`);
        }
      });
      
      console.log('=== END VISUAL DEBUG ===');
      
      // Note: Locomotive scroll is disabled for now due to module import issues
      // The site works fine with regular scrolling
      console.log('Content ready (locomotive scroll disabled)');
      
    } catch (error) {
      console.error('Error loading content:', error);
      // Fallback: restore opacity
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    } finally {
      this.isLoading = false;
      console.log('Content loading complete');
    }
  }

  /**
   * Handle navigation click
   */
  async navigateTo(page) {
    if (this.currentPage === page || this.isLoading) {
      console.log('Navigation skipped - already on page or loading');
      return;
    }

    console.log(`=== NAVIGATING FROM ${this.currentPage} TO ${page} ===`);

    // Set flag to prevent conflicts
    this.isNavigating = true;

    // NO URL CHANGES - pure JavaScript state management
    console.log('Using pure JS state management (no URL changes)');

    // Update navigation state
    this.setActiveNav(page);

    // Load new content
    await this.loadMainContent(page);
    
    // Clear flag after navigation complete
    setTimeout(() => {
      this.isNavigating = false;
    }, 100); // Reduced timeout
    
    console.log(`=== NAVIGATION TO ${page} COMPLETE ===`);
  }

  /**
   * Initialize navigation event listeners
   */
  initNavigation() {
    console.log('Initializing navigation listeners...');
    
    const workNav = document.getElementById('nav-work');
    const infoNav = document.getElementById('nav-info');

    if (workNav) {
      workNav.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Work nav clicked');
        this.navigateTo('work');
      });
      console.log('Work nav listener added');
    }

    if (infoNav) {
      infoNav.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Info nav clicked');
        this.navigateTo('info');
      });
      console.log('Info nav listener added');
    }

    // Handle browser back/forward
    // DISABLED - using pure JS state management instead of URL changes
    /*
    window.addEventListener('popstate', (e) => {
      // Only handle popstate if it's from browser navigation, not our programmatic changes
      console.log('Popstate event triggered');
      console.log('Event state:', e.state);
      console.log('Current hash:', window.location.hash);
      console.log('Current path:', window.location.pathname);
      
      // Add a small delay to avoid interfering with our hash changes
      setTimeout(() => {
        const hash = window.location.hash.slice(1);
        const path = window.location.pathname;
        const page = (hash === 'info' || path.includes('info')) ? 'info' : 'work';
        
        console.log('Delayed popstate check - target page:', page, 'current page:', this.currentPage);
        
        // Only navigate if we're not already on the target page
        if (this.currentPage !== page && !this.isLoading) {
          console.log('Popstate navigation to:', page);
          this.setActiveNav(page);
          this.loadMainContent(page);
        } else {
          console.log('Popstate ignored - already on target page or loading');
        }
      }, 100);
    });
    */
    console.log('URL-based navigation disabled - using pure JS state');
    
    // Handle hash changes (when someone manually changes the URL)
    // DISABLED - using pure JS state management instead
    /*
    window.addEventListener('hashchange', (e) => {
      // Ignore hashchange events during programmatic navigation
      if (this.isNavigating) {
        console.log('Hashchange ignored - programmatic navigation in progress');
        return;
      }
      
      const hash = window.location.hash.slice(1);
      const page = hash === 'info' ? 'info' : 'work';
      
      console.log('Hashchange event');
      console.log('Hash changed to:', hash);
      console.log('Target page:', page);
      console.log('Current page:', this.currentPage);
      
      // Only navigate if we're not already on the target page and not currently loading
      if (this.currentPage !== page && !this.isLoading) {
        console.log('Hashchange navigation to:', page);
        this.setActiveNav(page);
        this.loadMainContent(page);
      } else {
        console.log('Hashchange ignored - already on target page or loading');
      }
    });
    */
    console.log('Hash-based navigation disabled - using pure JS state');
  }

  /**
   * Initialize SPA functionality
   */
  async init(page = 'work') {
    console.log('=== INITIALIZING SPA ===');
    console.log('🎯 PURE JAVASCRIPT STATE MANAGEMENT (NO URL CHANGES)');
    console.log('Initial page:', page);
    
    // Set up main content container with transition styles
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      console.log('Main content transition styles applied');
    } else {
      console.error('Main content element not found during init');
    }

    // Load initial content
    console.log('Loading initial content...');
    await this.loadMainContent(page);
    
    // Set initial navigation state
    this.setActiveNav(page);
    
    // Initialize navigation
    this.initNavigation();
    
    console.log('=== SPA INITIALIZATION COMPLETE ===');
  }
}

// Global template loader instance
window.templateLoader = new TemplateLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Always start with work page (pure JS state management)
  const pageType = 'work';
  
  console.log('DOM ready, initializing template loader');
  console.log('Starting with page type:', pageType);
  window.templateLoader.init(pageType);
}); 