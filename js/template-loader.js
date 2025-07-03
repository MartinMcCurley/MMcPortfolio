/**
 * Template Loader Utility
 * Loads header and footer templates to reduce code duplication
 */

class TemplateLoader {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Load and cache template content
   */
  async loadTemplate(templatePath) {
    if (this.cache.has(templatePath)) {
      return this.cache.get(templatePath);
    }

    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
      }
      const content = await response.text();
      this.cache.set(templatePath, content);
      return content;
    } catch (error) {
      console.error('Template loading error:', error);
      return '';
    }
  }

  /**
   * Insert template into DOM element
   */
  async insertTemplate(elementId, templatePath) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    const content = await this.loadTemplate(templatePath);
    element.innerHTML = content;
  }

  /**
   * Set active navigation state
   */
  setActiveNav(page) {
    // Wait a bit for templates to load
    setTimeout(() => {
      const workNav = document.getElementById('nav-work');
      const infoNav = document.getElementById('nav-info');
      const navGlow = document.getElementById('nav-glow');
      const navPill = document.getElementById('nav-pill');

      if (!workNav || !infoNav) return;

      // Reset states
      workNav.classList.remove('active');
      infoNav.classList.remove('active');
      navGlow.classList.remove('info');
      navPill.classList.remove('info');

      // Set active state
      if (page === 'info') {
        infoNav.classList.add('active');
        navGlow.classList.add('info');
        navPill.classList.add('info');
      } else {
        workNav.classList.add('active');
      }
    }, 100);
  }

  /**
   * Initialize templates for a page
   */
  async init(page = 'work') {
    await Promise.all([
      this.insertTemplate('header-placeholder', 'templates/header.html'),
      this.insertTemplate('footer-placeholder', 'templates/footer.html')
    ]);
    
    this.setActiveNav(page);
  }
}

// Global template loader instance
window.templateLoader = new TemplateLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Determine page type from URL or data attribute
  const isInfoPage = window.location.pathname.includes('info');
  const pageType = isInfoPage ? 'info' : 'work';
  
  window.templateLoader.init(pageType);
}); 