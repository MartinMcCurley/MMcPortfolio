/**
 * Locomotive Scroll Initialization
 * Common script to initialize smooth scrolling across all pages
 */

function initLocomotiveScroll() {
    // Check if LocomotiveScroll is available
    if (typeof LocomotiveScroll === 'undefined') {
        console.warn('LocomotiveScroll not loaded, skipping initialization');
        return;
    }

    // Check if the locomotive-scroll container exists
    const scrollContainer = document.querySelector(".locomotive-scroll");
    
    if (!scrollContainer) {
        console.warn('Locomotive scroll container not found');
        return;
    }

    // Destroy existing instance if it exists
    if (window.locomotiveScroll) {
        try {
            window.locomotiveScroll.destroy();
        } catch (e) {
            console.log('Error destroying existing locomotive scroll:', e);
        }
    }

    // Add the data-scroll-container attribute
    scrollContainer.setAttribute('data-scroll-container', '');
    
    try {
        // Initialize locomotive scroll
        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });
        
        // Update scroll after content is loaded
        setTimeout(() => {
            locoScroll.update();
        }, 1000);
        
        // Make locoScroll available globally
        window.locomotiveScroll = locoScroll;
        
        // Update on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                if (window.locomotiveScroll) {
                    window.locomotiveScroll.update();
                }
            }, 500);
        });
        
        console.log('Locomotive scroll initialized successfully');
        
    } catch (error) {
        console.error('Error initializing Locomotive Scroll:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initLocomotiveScroll();
    }, 100);
});

// Export for use in template loader
window.initLocomotiveScroll = initLocomotiveScroll; 