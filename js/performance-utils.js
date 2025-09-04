/**
 * Performance Optimization Utilities
 * Advanced loading strategies and performance monitoring
 */

class PerformanceOptimizer {
    constructor() {
        this.webpSupported = false;
        this.performanceData = {};
        this.init();
    }

    /**
     * Initialize performance optimizations
     */
    init() {
        safeLog.info('🚀 Initializing Performance Optimizer...');
        
        // Detect WebP support
        this.detectWebPSupport();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Optimize critical resources
        this.optimizeCriticalResources();
        
        // Setup advanced lazy loading
        this.setupAdvancedLazyLoading();
        
        safeLog.info('✅ Performance Optimizer ready');
    }

    /**
     * Detect WebP support and add class to html element
     */
    detectWebPSupport() {
        const webpTestImages = {
            lossy: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
            lossless: 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
            alpha: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
        };

        const testWebP = (data, callback) => {
            const img = new Image();
            img.onload = () => callback(img.width === 1 && img.height === 1);
            img.onerror = () => callback(false);
            img.src = data;
        };

        // Test WebP support
        testWebP(webpTestImages.lossy, (supported) => {
            this.webpSupported = supported;
            if (supported) {
                document.documentElement.classList.add('webp');
                safeLog.debug('✅ WebP support detected');
            } else {
                document.documentElement.classList.add('no-webp');
                safeLog.debug('⚠️ No WebP support');
            }
        });
    }

    /**
     * Setup advanced performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                this.performanceData.fps = fps;
                
                if (fps < 30) {
                    safeLog.warn('⚠️ Low FPS detected:', fps);
                    this.optimizeForLowPerformance();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                this.performanceData.memory = {
                    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
                    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
                };
                
                // Warn if memory usage is high
                const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                if (usagePercent > 80) {
                    safeLog.warn('⚠️ High memory usage:', Math.round(usagePercent) + '%');
                }
            }, 5000);
        }

        // Connection quality monitoring
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.performanceData.connection = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                saveData: connection.saveData
            };
            
            // Optimize for slow connections
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.optimizeForSlowConnection();
            }
            
            safeLog.debug('🌐 Connection:', connection.effectiveType, 'Downlink:', connection.downlink + 'Mbps');
        }
    }

    /**
     * Optimize critical resources loading
     */
    optimizeCriticalResources() {
        // Preload critical images based on viewport
        const criticalImages = [
            'images/wch-logomark-vert-fill.svg',
            'images/stadiabt-banner-mobile-p-800.png',
            'images/spotlight-tb-p-800.png',
            'images/thn-banner-mobile-p-800.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Preload critical CSS
        const criticalCSS = document.querySelector('link[href*="main.css"]');
        if (criticalCSS) {
            criticalCSS.setAttribute('rel', 'preload');
            criticalCSS.setAttribute('as', 'style');
            criticalCSS.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
        }
    }

    /**
     * Setup advanced lazy loading with intersection observer
     */
    setupAdvancedLazyLoading() {
        // Enhanced intersection observer for better performance
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add loading class for better UX
                        img.classList.add('loading');
                        
                        // Load high-res image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        
                        // Load srcset if available
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        
                        // Remove loading class when loaded
                        img.onload = () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        };
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px', // Load 50px before entering viewport
                threshold: 0.1
            });

            // Observe all lazy-loadable images
            document.querySelectorAll('img[loading="lazy"], img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Setup progressive image loading
        this.setupProgressiveLoading();
    }

    /**
     * Setup progressive image loading (low-res to high-res)
     */
    setupProgressiveLoading() {
        const progressiveImages = document.querySelectorAll('.project-thumbnail');
        
        progressiveImages.forEach(img => {
            // Create low-res placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #f2f2f20d 25%, transparent 25%),
                           linear-gradient(-45deg, #f2f2f20d 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, #f2f2f20d 75%),
                           linear-gradient(-45deg, transparent 75%, #f2f2f20d 75%);
                background-size: 20px 20px;
                opacity: 0.3;
                transition: opacity 0.3s ease;
                z-index: -1;
            `;
            
            img.parentNode.style.position = 'relative';
            img.parentNode.insertBefore(placeholder, img);
            
            // Remove placeholder when image loads
            img.onload = () => {
                placeholder.style.opacity = '0';
                setTimeout(() => placeholder.remove(), 300);
            };
        });
    }

    /**
     * Optimize for low performance devices
     */
    optimizeForLowPerformance() {
        safeLog.info('🔧 Optimizing for low performance device...');
        
        // Reduce animation complexity
        document.documentElement.classList.add('low-performance');
        
        // Disable complex transitions
        const style = document.createElement('style');
        style.textContent = `
            .low-performance * {
                transition-duration: 0.1s !important;
                animation-duration: 0.1s !important;
            }
            .low-performance .project-card {
                will-change: auto !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // Reduce image quality for low-end devices
        const images = document.querySelectorAll('img[srcset]');
        images.forEach(img => {
            const srcsetArray = img.srcset.split(',');
            // Use smaller images for low performance
            if (srcsetArray.length > 2) {
                img.srcset = srcsetArray.slice(0, 2).join(',');
            }
        });
    }

    /**
     * Optimize for slow connections
     */
    optimizeForSlowConnection() {
        safeLog.info('🔧 Optimizing for slow connection...');
        
        // Prioritize critical content
        document.documentElement.classList.add('slow-connection');
        
        // Defer non-critical images
        const nonCriticalImages = document.querySelectorAll('.project-thumbnail');
        nonCriticalImages.forEach(img => {
            img.loading = 'lazy';
            
            // Use smallest available image
            if (img.srcset) {
                const srcsetArray = img.srcset.split(',');
                const smallestSrc = srcsetArray[0].split(' ')[0];
                img.src = smallestSrc;
            }
        });
        
        // Reduce animation frequency
        const style = document.createElement('style');
        style.textContent = `
            .slow-connection .project-card {
                transition-duration: 0.2s !important;
            }
            .slow-connection .loading-overlay {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceData,
            webpSupported: this.webpSupported,
            timestamp: Date.now()
        };
    }
}

// Initialize performance optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceOptimizer = new PerformanceOptimizer();
    });
} else {
    window.performanceOptimizer = new PerformanceOptimizer();
} 