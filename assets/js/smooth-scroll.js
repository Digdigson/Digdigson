// Lightweight smooth scroll handler with easeInOut easing
(function() {
  'use strict';
  
  // EaseInOut function for smooth animation
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  
  // Smooth scroll function
  function smoothScrollTo(target, duration = 900) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easeInOut(progress);
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  // Handle anchor links
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('/#')) return;
    
    const hash = href.split('#')[1];
    if (!hash) return;
    
    // Check if we're on the home page
    const currentPath = window.location.pathname;
    const isOnHomePage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html');
    
    if (!isOnHomePage) {
      // Let browser navigate to home page with hash, smooth-scroll.js will handle it on load
      return;
    }
    
    // If we're already on the home page, prevent default and smooth scroll
    e.preventDefault();
    const target = document.getElementById(hash);
    if (target) {
      smoothScrollTo(target);
      // Update URL without triggering scroll
      history.pushState(null, '', '#' + hash);
    }
  }
  
  // Attach handlers when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Handle clicks on anchor links
    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Handle hash in URL on page load (for navigation from other pages)
    // Only if not a page refresh (scroll-reset.js handles refresh)
    const isRefresh = (() => {
      try {
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
          return perfEntries[0].type === 'reload';
        }
      } catch (e) {
        // Fallback: check if referrer is empty or same page
        return !document.referrer || document.referrer.split('#')[0] === window.location.href.split('#')[0];
      }
      return false;
    })();
    
    if (window.location.hash && !isRefresh) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          smoothScrollTo(target);
        }, 150);
      }
    }
  });
})();
