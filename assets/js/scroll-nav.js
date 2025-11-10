// Unified scroll navigation handler for file:// and http:// protocols
(function() {
  'use strict';
  
  // Detect if running from file:// protocol
  const isFileProtocol = window.location.protocol === 'file:';
  
  // Get base path for relative navigation
  function getBasePath() {
    if (isFileProtocol) {
      // For file://, get the directory of current file
      const path = window.location.pathname;
      const lastSlash = path.lastIndexOf('/');
      return lastSlash >= 0 ? path.substring(0, lastSlash + 1) : '';
    }
    return '/';
  }
  
  // EaseInOut cubic function for smooth animation
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  // Smooth scroll function with customizable duration
  function smoothScrollTo(target, duration = 950) {
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
      
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  // Check if this is a page refresh (not navigation from another page)
  function isPageRefresh() {
    try {
      const perfEntries = performance.getEntriesByType('navigation');
      if (perfEntries.length > 0) {
        return perfEntries[0].type === 'reload';
      }
    } catch (e) {
      // Fallback: check if referrer is empty or same page
      const currentUrl = window.location.href.split('#')[0];
      const referrerUrl = document.referrer.split('#')[0];
      return !document.referrer || referrerUrl === currentUrl;
    }
    return false;
  }
  
  // Handle anchor link clicks
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (!href) return;
    
    // Check if it's a section link (contains #)
    if (!href.includes('#')) return;
    
    const [path, hash] = href.split('#');
    if (!hash) return;
    
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // Determine target file
    let targetFile = 'index.html';
    if (path && path !== '' && path !== '/') {
      // Extract filename from path
      const pathParts = path.split('/');
      targetFile = pathParts[pathParts.length - 1] || 'index.html';
    }
    
    // If clicking a link to a different page, let browser navigate
    if (targetFile !== currentFile && targetFile !== '') {
      // Browser will handle navigation, smooth-scroll will handle scroll on load
      return;
    }
    
    // If we're on the same page, prevent default and smooth scroll
    e.preventDefault();
    const target = document.getElementById(hash);
    if (target) {
      smoothScrollTo(target);
      // Update URL without triggering scroll
      history.pushState(null, '', '#' + hash);
    }
  }
  
  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Handle clicks on all anchor links with hash
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Handle hash in URL on page load (for navigation from other pages)
    // Only if not a page refresh
    if (window.location.hash && !isPageRefresh()) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          smoothScrollTo(target);
        }, 200);
      }
    }
  });
  
  // Stop browser from restoring scroll position on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Reset to top on page refresh only (run early)
  const checkAndResetOnRefresh = () => {
    if (isPageRefresh()) {
      // Strip hash on refresh
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      // Scroll to top instantly
      window.scrollTo(0, 0);
    }
  };
  
  // Run immediately
  checkAndResetOnRefresh();
  
  // Also handle on pageshow (for bfcache and late-load scenarios)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted || isPageRefresh()) {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
    }
  });
  
  // Also check on DOMContentLoaded as fallback
  document.addEventListener('DOMContentLoaded', function() {
    checkAndResetOnRefresh();
  });
})();

