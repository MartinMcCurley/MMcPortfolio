/**
 * Custom Main JS - Cross-Browser Compatible
 * Enhanced version with polyfills and fallbacks for better compatibility
 */
!function($){"use strict";

// Cross-browser polyfills and feature detection
function addPolyfills() {
    // Fetch polyfill for older browsers
    if (!window.fetch) {
        safeLog.debug('Adding fetch polyfill for older browsers');
        window.fetch = function(url, options) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(options && options.method || 'GET', url);
                xhr.onload = function() {
                    resolve({
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        text: function() { return Promise.resolve(xhr.responseText); },
                        json: function() { return Promise.resolve(JSON.parse(xhr.responseText)); }
                    });
                };
                xhr.onerror = function() { reject(new Error('Network error')); };
                xhr.send(options && options.body || null);
            });
        };
    }
    
    // Promise.all polyfill for IE
    if (!Promise.all) {
        Promise.all = function(promises) {
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
        };
    }
}

// Enhanced animation functions with fallbacks
function initAnimations(){
    $(".loading-overlay").fadeOut(800);
    animateHeroSection();
    setupProjectCardEffects();
    fadeInContent();
    initShineEffect();
}

function fadeInContent(){
    // Cross-browser compatible fade-in with fallback
    try {
        $("body").css("opacity",0).animate({opacity:1},1200);
    } catch(e) {
        safeLog.warn('Animation fallback used:', e);
        $("body").css("opacity", 1);
    }
}

function animateHeroSection(){
    try {
        $(".hero-text-content").css({
            opacity:1,
            transform:"translateY(0px)",
            transition:"opacity 0.8s ease, transform 0.8s ease"
        });
        animateScrollIndicator();
    } catch(e) {
        safeLog.warn('Hero animation fallback used:', e);
        $(".hero-text-content").css({opacity:1});
    }
}

function animateScrollIndicator(){
    try {
        setInterval(function(){
            $(".icon-scroll-down").animate({opacity:.5,marginTop:"10px"},800)
                                  .animate({opacity:1,marginTop:"0px"},800);
        },1600);
    } catch(e) {
        safeLog.warn('Scroll indicator animation failed:', e);
    }
}

function initShineEffect(){
    try {
        // Initial shine animation on page load
        setTimeout(function(){
            $(".shine-wrapper").addClass("animate-initial");
        },800);
        
        // Setup scroll-based shine animation with better performance
        var shineScrolled=false;
        var scrollTimer = null;
        
        $(window).on("scroll",function(){
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            scrollTimer = setTimeout(function() {
                var scrollTop=$(window).scrollTop();
                if(scrollTop>100&&!shineScrolled){
                    $(".shine-wrapper").removeClass("animate-initial").addClass("animate-scroll");
                    shineScrolled=true;
                } else if(scrollTop<=100&&shineScrolled){
                    $(".shine-wrapper").removeClass("animate-scroll").addClass("animate-initial");
                    shineScrolled=false;
                }
            }, 16); // ~60fps throttling
        });
    } catch(e) {
        safeLog.warn('Shine effect failed:', e);
    }
}

function setupProjectCardEffects(){
    // Project card hover effects are now handled entirely by CSS
    // This prevents JavaScript from overriding the CSS hover transitions
    // Added cross-browser event handling
    try {
        $(".project-card").on('mouseenter mouseleave', function(e) {
            // Ensure CSS transitions work even if JS hover effects interfere
            if (e.type === 'mouseenter') {
                $(this).addClass('hover-active');
            } else {
                $(this).removeClass('hover-active');
            }
        });
    } catch(e) {
        console.warn('Project card effects fallback used:', e);
    }
}

function setupPageTransitions(){
    // Enhanced cross-browser page transitions
    function safePageTransition(goTo, delay) {
        delay = delay || 1200;
        try {
            $("body").css("opacity",0);
            setTimeout(function(){
                window.location.href = goTo;
            }, delay);
        } catch(e) {
            console.warn('Page transition fallback used:', e);
            window.location.href = goTo;
        }
    }
    
    $(".nav-toggle").click(function(e){
        e.preventDefault();
        var goTo = this.getAttribute("href") || this.href;
        if (goTo) {
            safePageTransition(goTo, 1200);
        }
    });
    
    $(".project-card").click(function(e){
        e.preventDefault();
        var goTo = this.getAttribute("href") || this.href;
        if (goTo) {
            safePageTransition(goTo, 1200);
        }
    });
    
    $(".button-project-back").click(function(e){
        e.preventDefault();
        var goTo = this.getAttribute("href") || this.href || "/";
        safePageTransition(goTo, 1000);
    });
    
    // Cross-browser back/forward cache handling
    try {
        $(window).bind("pageshow",function(event){
            if (event.originalEvent && event.originalEvent.persisted) {
                window.location.reload();
            }
        });
    } catch(e) {
        console.warn('Pageshow event handling failed:', e);
    }
}

function setupMobileMenu(){
    try {
        $(".nav-menu-button").click(function(){
            $(".mobile-popup-menu").toggle();
            $(".icon-contact").toggle();
            $(".icon-contact-close").toggle();
        });
    } catch(e) {
        console.warn('Mobile menu setup failed:', e);
    }
}

function setupNavPill(){
    try {
        $(".nav-toggle").click(function(){
            $(".nav-toggle").removeClass("active");
            $(this).addClass("active");
            
            if($(this).hasClass("work")){
                $(".nav-indicator-pill").css("left","6px").css("right","auto");
                $(".nav-indicator-glow").css("margin-left","33px");
            } else {
                $(".nav-indicator-pill").css("left","auto").css("right","6px");
                $(".nav-indicator-glow").css("margin-left","121px");
            }
        });
        
        // Set initial state based on current page
        if(window.location.pathname.includes("info")){
            $(".nav-toggle.work").removeClass("active");
            $(".nav-toggle").not(".work").addClass("active");
            $(".nav-indicator-pill").css("left","auto").css("right","6px");
            $(".nav-indicator-glow").css("margin-left","121px");
        } else {
            $(".nav-toggle").not(".work").removeClass("active");
            $(".nav-toggle.work").addClass("active");
            $(".nav-indicator-pill").css("left","6px").css("right","auto");
            $(".nav-indicator-glow").css("margin-left","33px");
        }
    } catch(e) {
        console.warn('Nav pill setup failed:', e);
    }
}

function setupLazyLoading(){
    try {
        // Modern Intersection Observer with fallback
        if ("IntersectionObserver" in window) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            safeLog.debug('Using scroll-based lazy loading fallback');
            $(window).on('scroll resize', function() {
                $('img[loading="lazy"]').each(function() {
                    var img = $(this)[0];
                    var rect = img.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight) {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            $(img).removeAttr('loading');
                        }
                    }
                });
            });
        }
    } catch(e) {
        console.warn('Lazy loading setup failed:', e);
        // Load all images immediately as fallback
        $('img[loading="lazy"]').each(function() {
            if (this.dataset.src) {
                this.src = this.dataset.src;
            }
        });
    }
}

function initResponsiveHandling(){
    try {
        // Cross-browser media query handling
        function checkViewport() {
            var isMobile = window.innerWidth <= 767;
            if (isMobile) {
                handleMobileView();
            } else {
                handleDesktopView();
            }
        }
        
        // Modern approach with fallback
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia("(max-width: 767px)");
            function handleMediaChange(e) {
                if (e.matches) {
                    handleMobileView();
                } else {
                    handleDesktopView();
                }
            }
            
            handleMediaChange(mediaQuery);
            if (mediaQuery.addListener) {
                mediaQuery.addListener(handleMediaChange);
            } else if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleMediaChange);
            }
        } else {
            // Fallback for older browsers
            checkViewport();
            $(window).on('resize', checkViewport);
        }
    } catch(e) {
        console.warn('Responsive handling fallback used:', e);
        handleDesktopView(); // Default to desktop view
    }
}

function handleMobileView(){
    try {
        $(".section-hero-portrait").show();
        $(".section-hero").hide();
        $(".nav-right-wrapper").css("flex","0 auto");
    } catch(e) {
        console.warn('Mobile view handling failed:', e);
    }
}

function handleDesktopView(){
    try {
        $(".section-hero").show();
        $(".section-hero-portrait").hide();
        $(".nav-right-wrapper").css("flex","1");
    } catch(e) {
        console.warn('Desktop view handling failed:', e);
    }
}

function isInViewport(element){
    try {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    } catch(e) {
        console.warn('Viewport detection failed:', e);
        return true; // Assume visible as fallback
    }
}

// Enhanced initialization with error handling
$(document).ready(function(){
    try {
        safeLog.debug('Initializing portfolio with cross-browser support');
        
        // Add polyfills first
        addPolyfills();
        
        // Set initial opacity to 0
        $("body").css("opacity",0);
        
        // Immediately start fading out the loading overlay
        $(".loading-overlay").fadeOut(800);
        
        // Initialize all components with error handling
        initAnimations();
        setupPageTransitions();
        setupMobileMenu();
        setupNavPill();
        setupLazyLoading();
        initResponsiveHandling();
        
        safeLog.info('Portfolio initialization complete');
    } catch(e) {
        safeLog.error('Portfolio initialization failed:', e);
        // Ensure basic functionality works even if advanced features fail
        $("body").css("opacity", 1);
        $(".loading-overlay").hide();
    }
});

// Enhanced scroll handling with better performance
$(window).on("scroll",function(){
    if (!window.scrollThrottle) {
        window.scrollThrottle = true;
        
        // Use requestAnimationFrame for better performance, with setTimeout fallback
        var scheduleUpdate = window.requestAnimationFrame || function(callback) {
            return setTimeout(callback, 16);
        };
        
        scheduleUpdate(function(){
            try {
                $(".project-card-outline").each(function(){
                    if (isInViewport(this) && !$(this).hasClass("animated")) {
                        $(this).addClass("animated");
                        $(this).css({
                            opacity: 1,
                            transform: "translateY(0px)",
                            transition: "opacity 0.8s ease, transform 0.8s ease"
                        });
                    }
                });
            } catch(e) {
                console.warn('Scroll animation failed:', e);
            }
            
            window.scrollThrottle = false;
        });
    }
});

// Enhanced load handling
$(window).on("load",function(){
    try {
        // Ensure loading overlay is hidden when everything is loaded
        $(".loading-overlay").hide();
        
        // Update locomotive scroll if available
        if (typeof locoScroll !== "undefined") {
            setTimeout(function(){
                locoScroll.update();
            }, 500);
        }
        
        safeLog.debug('Page load complete');
    } catch(e) {
        safeLog.warn('Load event handling failed:', e);
    }
});

}(jQuery);

// Enhanced GitHub API function with better error handling
function updateLastUpdatedDate() {
    const lastUpdatedElement = document.getElementById('last-updated');
    
    if (!lastUpdatedElement) {
        console.log('Last updated element not found');
        return;
    }

    // GitHub API endpoint for repository commits
    const apiUrl = 'https://api.github.com/repos/MartinMcCurley/MMcPortfolio/commits';
    
    // Use cross-browser compatible fetch
    var fetchPromise;
    if (window.fetch) {
        fetchPromise = fetch(apiUrl);
    } else {
        // XMLHttpRequest fallback
        fetchPromise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiUrl);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        ok: true,
                        json: function() {
                            return Promise.resolve(JSON.parse(xhr.responseText));
                        }
                    });
                } else {
                    reject(new Error('HTTP ' + xhr.status));
                }
            };
            xhr.onerror = function() {
                reject(new Error('Network error'));
            };
            xhr.send();
        });
    }
    
    fetchPromise
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (data && data.length > 0 && data[0].commit && data[0].commit.committer) {
                var lastCommitDate = new Date(data[0].commit.committer.date);
                var formattedDate = lastCommitDate.toLocaleDateString('en-GB', {
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric'
                });
                lastUpdatedElement.textContent = 'Last updated: ' + formattedDate;
                console.log('Last updated date successfully updated from GitHub API');
            } else {
                console.warn('No commit data found');
            }
        })
        .catch(function(error) {
            console.error('Error fetching commit data:', error);
            // Keep the fallback date if API fails
            console.log('Using fallback date: December 2024');
        });
}

// Cross-browser compatible DOMContentLoaded
function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// Call the function when the page loads
domReady(function() {
    // Small delay to ensure all content is loaded
    setTimeout(updateLastUpdatedDate, 100);
});
