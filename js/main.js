/**
 * Custom Main JS - Minified
 * A lightweight replacement for Webflow's main.js
 */
!function($){"use strict";function initAnimations(){$(".loading-overlay").fadeOut(800),animateHeroSection(),setupProjectCardEffects(),fadeInContent(),initShineEffect()}function fadeInContent(){// Add fade-in animation for the main content
$("body").css("opacity",0).animate({opacity:1},1200)}function animateHeroSection(){$(".hero-text-content").css({opacity:1,transform:"translateY(0px)",transition:"opacity 0.8s ease, transform 0.8s ease"}),animateScrollIndicator()}function animateScrollIndicator(){setInterval(function(){$(".icon-scroll-down").animate({opacity:.5,marginTop:"10px"},800).animate({opacity:1,marginTop:"0px"},800)},1600)}function initShineEffect(){// Initial shine animation on page load
setTimeout(function(){$(".shine-wrapper").addClass("animate-initial")},800);// Setup scroll-based shine animation
var shineScrolled=false;$(window).on("scroll",function(){var scrollTop=$(window).scrollTop();if(scrollTop>100&&!shineScrolled){$(".shine-wrapper").removeClass("animate-initial").addClass("animate-scroll");shineScrolled=true}else if(scrollTop<=100&&shineScrolled){$(".shine-wrapper").removeClass("animate-scroll").addClass("animate-initial");shineScrolled=false}})}function setupProjectCardEffects(){
    $(".project-card").hover(function(){
        // Mouse enter
        $(this).find(".project-card-colour").css("opacity",.8);
        $(this).css("border-color","#888");
        $(this).find(".icon-projectcard-arrow").css("transform","translateX(5px)");
        // Add smooth upward movement to the thumbnail
        $(this).find(".project-thumbnail").css("transform", "translateY(-10px)");
    },function(){
        // Mouse leave
        $(this).find(".project-card-colour").css("opacity",0);
        $(this).css("border-color","#3d3d3d");
        $(this).find(".icon-projectcard-arrow").css("transform","translateX(0px)");
        // Return thumbnail to original position
        $(this).find(".project-thumbnail").css("transform", "translateY(0px)");
    });
}function setupPageTransitions(){$(".nav-toggle").click(function(e){e.preventDefault();var goTo=this.getAttribute("href");$("body").css("opacity",0),setTimeout(function(){window.location=goTo},1200)}),$(".project-card").click(function(e){e.preventDefault();var goTo=this.getAttribute("href");$("body").css("opacity",0),setTimeout(function(){window.location=goTo},1200)}),$(".button-project-back").click(function(e){e.preventDefault();var goTo=this.getAttribute("href");$("body").css("opacity",0),setTimeout(function(){window.location=goTo},1e3)}),$(window).bind("pageshow",function(event){event.originalEvent.persisted&&window.location.reload()})}function setupMobileMenu(){$(".nav-menu-button").click(function(){$(".mobile-popup-menu").toggle(),$(".icon-contact").toggle(),$(".icon-contact-close").toggle()})}function setupNavPill(){$(".nav-toggle").click(function(){$(".nav-toggle").removeClass("active"),$(this).addClass("active"),$(this).hasClass("work")?($(".nav-indicator-pill").css("left","6px"),$(".nav-indicator-glow").css("margin-left","33px")):($(".nav-indicator-pill").css("left","auto").css("right","6px"),$(".nav-indicator-glow").css("margin-left","121px"))}),window.location.pathname.includes("info")?($(".nav-toggle.work").removeClass("active"),$(".nav-toggle").not(".work").addClass("active"),$(".nav-indicator-pill").css("left","auto").css("right","6px"),$(".nav-indicator-glow").css("margin-left","121px")):($(".nav-toggle").not(".work").removeClass("active"),$(".nav-toggle.work").addClass("active"),$(".nav-indicator-pill").css("left","6px"),$(".nav-indicator-glow").css("margin-left","33px"))}function setupLazyLoading(){if("loading"in HTMLImageElement.prototype);else{const e=document.querySelectorAll('img[loading="lazy"]'),t=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){const i=e.target;i.src=i.dataset.src,t.unobserve(i)}})});e.forEach(function(e){t.observe(e)})}}function initResponsiveHandling(){const e=window.matchMedia("(max-width: 767px)");function t(e){e.matches?handleMobileView():handleDesktopView()}t(e),e.addListener(t)}function handleMobileView(){$(".section-hero-portrait").show(),$(".section-hero").hide(),$(".nav-right-wrapper").css("flex","0 auto")}function handleDesktopView(){$(".section-hero").show(),$(".section-hero-portrait").hide(),$(".nav-right-wrapper").css("flex","1")}function isInViewport(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}$(document).ready(function(){// Set initial opacity to 0
$("body").css("opacity",0);// Immediately start fading out the loading overlay
$(".loading-overlay").fadeOut(800);initAnimations(),setupPageTransitions(),setupMobileMenu(),setupNavPill(),setupLazyLoading(),initResponsiveHandling()}),$(window).on("scroll",function(){window.scrollThrottle||(window.scrollThrottle=!0,setTimeout(function(){$(".project-card-outline").each(function(){isInViewport(this)&&!$(this).hasClass("animated")&&($(this).addClass("animated"),$(this).css({opacity:1,transform:"translateY(0px)",transition:"opacity 0.8s ease, transform 0.8s ease"}))}),window.scrollThrottle=!1},100))}),$(window).on("load",function(){// Ensure loading overlay is hidden when everything is loaded
$(".loading-overlay").hide();"undefined"!=typeof locoScroll&&setTimeout(function(){locoScroll.update()},500)})}(jQuery);

// Function to update the "Last Updated" date from GitHub API
function updateLastUpdatedDate() {
    const lastUpdatedElement = document.getElementById('last-updated');
    
    if (!lastUpdatedElement) {
        console.log('Last updated element not found');
        return;
    }

    // GitHub API endpoint for repository commits
    const apiUrl = 'https://api.github.com/repos/MartinMcCurley/MMcPortfolio/commits';
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0 && data[0].commit && data[0].commit.committer) {
                const lastCommitDate = new Date(data[0].commit.committer.date);
                const formattedDate = lastCommitDate.toLocaleDateString('en-GB', {
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric'
                });
                lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
                console.log('Last updated date successfully updated from GitHub API');
            } else {
                console.warn('No commit data found');
            }
        })
        .catch(error => {
            console.error('Error fetching commit data:', error);
            // Keep the fallback date if API fails
            console.log('Using fallback date: December 2024');
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all content is loaded
    setTimeout(updateLastUpdatedDate, 100);
});
