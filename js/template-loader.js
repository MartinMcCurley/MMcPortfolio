/**
 * Template Loader Utility - Cross-Browser Compatible
 * Enhanced SPA-style content switching with fallbacks for better compatibility
 */

class TemplateLoader {
  constructor() {
    // Use Map if available, otherwise fallback to Object
    this.cache = window.Map ? new Map() : {};
    this.currentPage = 'work';
    this.isLoading = false;
    this.isNavigating = false; // Flag to prevent hashchange loops
    
    // Cross-browser detection
    this.supportsMap = !!window.Map;
    this.supportsFetch = !!window.fetch;
    this.supportsPromise = !!window.Promise;
    
    safeLog.debug('TemplateLoader initialized with browser capabilities:', {
      map: this.supportsMap,
      fetch: this.supportsFetch,
      promise: this.supportsPromise
    });
  }

  /**
   * Cross-browser cache management
   */
  getCacheItem(key) {
    if (this.supportsMap) {
      return this.cache.get(key);
    } else {
      return this.cache[key];
    }
  }
  
  setCacheItem(key, value) {
    if (this.supportsMap) {
      this.cache.set(key, value);
    } else {
      this.cache[key] = value;
    }
  }
  
  hasCacheItem(key) {
    if (this.supportsMap) {
      return this.cache.has(key);
    } else {
      return this.cache.hasOwnProperty(key);
    }
  }

  /**
   * Cross-browser fetch with XMLHttpRequest fallback
   */
  fetchContent(url) {
    if (this.supportsFetch) {
      return fetch(url);
    } else {
      // XMLHttpRequest fallback for older browsers
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              ok: true,
              status: xhr.status,
              text: function() {
                return Promise.resolve(xhr.responseText);
              }
            });
          } else {
            reject(new Error('HTTP ' + xhr.status + ': Failed to load ' + url));
          }
        };
        xhr.onerror = function() {
          reject(new Error('Network error loading ' + url));
        };
        xhr.ontimeout = function() {
          reject(new Error('Timeout loading ' + url));
        };
        xhr.timeout = 10000; // 10 second timeout
        xhr.send();
      });
    }
  }

  /**
   * Load and cache template content with enhanced error handling
   */
  async loadTemplate(templatePath) {
    console.log('Loading template:', templatePath);
    
    if (this.hasCacheItem(templatePath)) {
      console.log('Template found in cache:', templatePath);
      return this.getCacheItem(templatePath);
    }

    try {
      const response = await this.fetchContent(templatePath);
      if (!response.ok) {
        throw new Error('Failed to load template: ' + templatePath + ' (' + response.status + ')');
      }
      const content = await response.text();
      console.log('Template loaded successfully:', templatePath, 'Content length:', content.length);
      
      // Validate content
      if (!content || content.length === 0) {
        console.warn('Template appears to be empty:', templatePath);
        return '<div class="error-message">Template content is empty</div>';
      }
      
      this.setCacheItem(templatePath, content);
      return content;
    } catch (error) {
      safeLog.error('Template loading error:', error);
      
      // Return fallback content instead of empty string
      var fallbackContent = '<div class="error-message" style="padding: 20px; text-align: center; color: #f2f2f2;">' +
                           '<h3>Content Loading Error</h3>' +
                           '<p>Unable to load: ' + templatePath + '</p>' +
                           '<p>Error: ' + error.message + '</p>' +
                           '</div>';
      return fallbackContent;
    }
  }

  /**
   * Set active navigation state with enhanced error handling
   */
  setActiveNav(page) {
    console.log('Setting active nav:', page);
    
    try {
      const workNav = document.getElementById('nav-work');
      const infoNav = document.getElementById('nav-info');
      const navGlow = document.getElementById('nav-glow');
      const navPill = document.getElementById('nav-pill');

      if (!workNav || !infoNav) {
        console.warn('Navigation elements not found');
        return;
      }

      // Reset states with safety checks
      if (workNav.classList) {
        workNav.classList.remove('active');
      } else {
        // Fallback for older browsers
        workNav.className = workNav.className.replace(/\bactive\b/g, '');
      }
      
      if (infoNav.classList) {
        infoNav.classList.remove('active');
      } else {
        infoNav.className = infoNav.className.replace(/\bactive\b/g, '');
      }
      
      if (navGlow && navGlow.classList) {
        navGlow.classList.remove('info');
      } else if (navGlow) {
        navGlow.className = navGlow.className.replace(/\binfo\b/g, '');
      }
      
      if (navPill && navPill.classList) {
        navPill.classList.remove('info');
      } else if (navPill) {
        navPill.className = navPill.className.replace(/\binfo\b/g, '');
      }

      // Set active state
      if (page === 'info') {
        if (infoNav.classList) {
          infoNav.classList.add('active');
        } else {
          infoNav.className += ' active';
        }
        
        if (navGlow && navGlow.classList) {
          navGlow.classList.add('info');
        } else if (navGlow) {
          navGlow.className += ' info';
        }
        
        if (navPill && navPill.classList) {
          navPill.classList.add('info');
        } else if (navPill) {
          navPill.className += ' info';
        }
      } else {
        if (workNav.classList) {
          workNav.classList.add('active');
        } else {
          workNav.className += ' active';
        }
      }

      this.currentPage = page;
      console.log('Active nav set to:', page);
    } catch (error) {
      console.error('Error setting active nav:', error);
    }
  }

  /**
   * Enhanced Promise.all fallback for older browsers
   */
  promiseAllFallback(promises) {
    if (this.supportsPromise && Promise.all) {
      return Promise.all(promises);
    } else {
      // Manual Promise.all implementation
      return new Promise(function(resolve, reject) {
        var results = [];
        var completed = 0;
        
        if (promises.length === 0) {
          resolve(results);
          return;
        }
        
        promises.forEach(function(promise, index) {
          Promise.resolve(promise).then(function(value) {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          }).catch(reject);
        });
      });
    }
  }

  /**
   * Cross-browser delay function
   */
  delay(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Load main content based on page type with enhanced cross-browser support
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
      safeLog.error('Main content container not found');
      this.isLoading = false;
      return;
    }

    try {
      console.log('Starting fade out...');
      // Cross-browser fade out effect
      if (mainContent.style) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        // Fallback for browsers that don't support transform
        if (!mainContent.style.transform) {
          mainContent.style.top = '20px';
        }
      }

      // Wait for fade out with fallback
      await this.delay(200);
      console.log('Fade out complete, loading content...');

      let contentHtml = '';
      
      if (page === 'work') {
        console.log('Loading work page templates...');
        try {
          // Load work page content (hero + projects) with proper error handling
          const templatePromises = [
            this.loadTemplate('templates/hero-section.html'),
            this.loadTemplate('templates/main-projects-section.html')
          ];
          
          const [heroContent, mainProjectsContent] = await this.promiseAllFallback(templatePromises);
          
          contentHtml = heroContent + mainProjectsContent;
          console.log('Work content assembled, length:', contentHtml.length);
        } catch (error) {
          safeLog.error('Error loading work templates:', error);
          contentHtml = '<div class="error-message">Error loading work content. Please refresh the page.</div>';
        }
      } else if (page === 'info') {
        console.log('Loading info page template...');
        try {
          // Load info page content
          contentHtml = await this.loadTemplate('templates/info-content.html');
          console.log('Info content loaded, length:', contentHtml.length);
        } catch (error) {
          safeLog.error('Error loading info template:', error);
          contentHtml = '<div class="error-message">Error loading info content. Please refresh the page.</div>';
        }
      }

      console.log('Updating main content HTML...');
      // Update content with safety check
      if (mainContent) {
        mainContent.innerHTML = contentHtml;
      }
      
      console.log('Content updated, starting fade in...');
      // Wait a bit then fade in
      await this.delay(50);
      
      // Cross-browser fade in with multiple fallbacks
      if (mainContent && mainContent.style) {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
        mainContent.style.top = '0';
      }
      
      console.log('Fade in complete');
      
      // Enhanced visual debugging for cross-browser issues
      console.log('=== CROSS-BROWSER DEBUG INFO ===');
      console.log('Browser support:', {
        map: this.supportsMap,
        fetch: this.supportsFetch,
        promise: this.supportsPromise,
        classList: !!document.documentElement.classList,
        transform: !!mainContent.style.transform
      });
      
      if (mainContent) {
        console.log('Main content element:', mainContent);
        console.log('Main content innerHTML length:', mainContent.innerHTML.length);
        
        // Get computed styles with fallback
        var computedStyles;
        if (window.getComputedStyle) {
          computedStyles = window.getComputedStyle(mainContent);
        } else if (mainContent.currentStyle) {
          // IE8 fallback
          computedStyles = mainContent.currentStyle;
        }
        
        if (computedStyles) {
          console.log('Main content computed styles:');
          console.log('- opacity:', computedStyles.opacity);
          console.log('- display:', computedStyles.display);
          console.log('- visibility:', computedStyles.visibility);
          console.log('- position:', computedStyles.position);
          console.log('- z-index:', computedStyles.zIndex || computedStyles['z-index']);
        }
      }
      
      // Enhanced loading overlay handling
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        console.log('Loading overlay found, ensuring it is hidden');
        
        // Multiple methods to hide the overlay for cross-browser compatibility
        if (loadingOverlay.style) {
          loadingOverlay.style.display = 'none';
          loadingOverlay.style.opacity = '0';
          loadingOverlay.style.visibility = 'hidden';
          loadingOverlay.style.zIndex = '-1';
        }
        
        // Additional class-based hiding
        if (loadingOverlay.classList) {
          loadingOverlay.classList.add('hidden');
        } else {
          loadingOverlay.className += ' hidden';
        }
        
        console.log('Loading overlay hidden using multiple methods');
      } else {
        console.log('Loading overlay not found');
      }
      
      // Ensure main content visibility with multiple approaches
      if (mainContent) {
        console.log('Main content children count:', mainContent.children.length);
        
        // Force ensure main content is visible
        if (mainContent.style) {
          mainContent.style.display = 'block';
          mainContent.style.visibility = 'visible';
          mainContent.style.opacity = '1';
          mainContent.style.transform = 'translateY(0)';
          mainContent.style.top = '0';
        }
        
        console.log('Main content visibility forced');
      }
      
      // CRITICAL: Enhanced body opacity handling
      const body = document.body || document.getElementsByTagName('body')[0];
      if (body && body.style) {
        body.style.opacity = '1';
        body.style.visibility = 'visible';
        console.log('Body opacity set to 1');
      }
      
      // Additional debugging for black screen issue
      setTimeout(function() {
        console.log('=== POST-LOAD VISUAL CHECK ===');
        var isVisible = mainContent && mainContent.offsetHeight > 0 && mainContent.offsetWidth > 0;
        console.log('Main content is visible:', isVisible);
        
        if (!isVisible) {
          console.warn('VISUAL ISSUE DETECTED: Main content may not be visible');
          
          // Emergency visibility fix
          if (mainContent) {
            mainContent.style.display = 'block !important';
            mainContent.style.opacity = '1 !important';
            mainContent.style.visibility = 'visible !important';
            console.log('Emergency visibility fix applied');
          }
        }
      }, 100);
      
    } catch (error) {
      safeLog.error('Critical error in loadMainContent:', error);
      
      // Emergency fallback
      if (mainContent) {
        mainContent.innerHTML = '<div class="error-message" style="padding: 40px; text-align: center; color: #f2f2f2;">' +
                               '<h2>Content Loading Failed</h2>' +
                               '<p>There was an error loading the page content.</p>' +
                               '<p>Please refresh the page or try again.</p>' +
                               '<button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #f2f2f2; color: #101010; border: none; border-radius: 5px; cursor: pointer;">Refresh Page</button>' +
                               '</div>';
        mainContent.style.opacity = '1';
        mainContent.style.display = 'block';
        mainContent.style.visibility = 'visible';
      }
    } finally {
      this.isLoading = false;
      console.log('loadMainContent completed');
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