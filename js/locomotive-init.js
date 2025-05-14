/**
 * Locomotive Scroll Initialization
 * Common script to initialize smooth scrolling across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if the locomotive-scroll container exists
    const scrollContainer = document.querySelector(".locomotive-scroll");
    
    if (scrollContainer) {
        // Add the data-scroll-container attribute
        scrollContainer.setAttribute('data-scroll-container', '');
        
        // Initialize locomotive scroll after a short delay
        setTimeout(function() {
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
            setTimeout(function() {
                locoScroll.update();
            }, 1000);
            
            // Make locoScroll available globally
            window.locoScroll = locoScroll;
            
            // Update on window resize
            window.addEventListener('resize', function() {
                setTimeout(function() {
                    locoScroll.update();
                }, 500);
            });
        }, 500);
    }
}); 