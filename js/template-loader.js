/** Work/Info navigation, retaining the existing templates and transitions. */
class TemplateLoader {
  constructor() {
    this.cache = new Map();
    this.currentPage = this.pageFromLocation();
    this.requestId = 0;
    this.isLoading = false;
  }
  pageFromLocation() {
    return /info(?:\.html)?$/.test(location.pathname) || /^#\/?info$/.test(location.hash) ? 'info' : 'work';
  }
  async loadTemplate(file) {
    if (!this.cache.has(file)) {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Unable to load ${file}: ${response.status}`);
      this.cache.set(file, await response.text());
    }
    return this.cache.get(file);
  }
  setActiveNav(page) {
    this.currentPage = page;
    for (const name of ['work', 'info']) {
      const link = document.getElementById(`nav-${name}`);
      link?.classList.toggle('active', name === page);
      if (name === page) link?.setAttribute('aria-current', 'page');
      else link?.removeAttribute('aria-current');
    }
    document.getElementById('nav-glow')?.classList.toggle('info', page === 'info');
    document.getElementById('nav-pill')?.classList.toggle('info', page === 'info');
    document.title = page === 'info' ? 'Info - Martin McCurley' : 'Martin McCurley - Software Developer';
    document.querySelector('.swipe-indicator-wrapper')?.classList.toggle('is-hidden', page === 'info');
  }
  async loadMainContent(page, {initial = false} = {}) {
    const main = document.getElementById('main-content');
    if (!main) return false;
    const requestId = ++this.requestId;
    this.isLoading = true;
    main.setAttribute('aria-busy', 'true');
    try {
      const hasMatchingContent = page === 'info' ? !!main.querySelector('.about-page') : !!main.querySelector('.section-hero');
      if (!initial || !hasMatchingContent) {
        const files = page === 'info' ? ['templates/info-content.html'] : ['templates/hero-section.html', 'templates/main-projects-section.html'];
        const content = await Promise.all(files.map(file => this.loadTemplate(file)));
        if (requestId !== this.requestId) return null;
        main.innerHTML = content.join('\n');
      }
      this.setActiveNav(page);
      document.querySelector('.loading-overlay')?.classList.add('is-hidden');
      document.dispatchEvent(new CustomEvent('portfolio:content-ready', {detail: {page}}));
      return true;
    } catch (error) {
      console.warn('Page navigation failed:', error.message);
      return false;
    } finally {
      if (requestId === this.requestId) {
        this.isLoading = false;
        main.removeAttribute('aria-busy');
      }
    }
  }
  async navigateTo(page, {history = true} = {}) {
    if (!['work', 'info'].includes(page)) return;
    if (page === this.currentPage && !this.isLoading) {
      window.scrollTo({top: 0, behavior: 'auto'});
      return;
    }
    const loaded = await this.loadMainContent(page);
    if (!loaded) {
      if (loaded === false && !this.isLoading) location.assign(page === 'info' ? 'info.html' : 'index.html');
      return;
    }
    if (history) window.history.pushState({page}, '', page === 'info' ? 'info.html' : 'index.html');
    window.scrollTo({top: 0, behavior: 'auto'});
    document.getElementById('main-content')?.focus({preventScroll: true});
  }
  init() {
    document.addEventListener('click', event => {
      const link = event.target.closest('.nav-toggle, .nav-logo-link, .footer-link');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      const target = url.pathname.split('/').pop();
      if (!['index.html', 'info.html', ''].includes(target)) return;
      event.preventDefault();
      this.navigateTo(target === 'info.html' ? 'info' : 'work');
    });
    window.addEventListener('popstate', () => this.navigateTo(this.pageFromLocation(), {history: false}));
    window.addEventListener('hashchange', () => {
      if (/^#\/?(?:info|work)$/.test(location.hash)) this.navigateTo(this.pageFromLocation(), {history: false});
    });
    this.loadMainContent(this.currentPage, {initial: true});
  }
}
window.templateLoader = new TemplateLoader();
document.addEventListener('DOMContentLoaded', () => window.templateLoader.init());
