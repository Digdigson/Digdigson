(function () {
  // Stop the browser from restoring the previous scroll on reload/back
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Check if this is a page refresh (not navigation from another page)
  const isPageRefresh = () => {
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
  };
  
  // If there is any hash, strip it early so reload always lands at top
  const stripHash = () => {
    if (location.hash && isPageRefresh()) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  };

  // Ensure top on first paint & when returned from bfcache (only on refresh)
  const jumpTop = () => {
    if (isPageRefresh()) {
      window.scrollTo(0, 0);
    }
  };

  stripHash();
  jumpTop();

  document.addEventListener('DOMContentLoaded', () => {
    stripHash();
    jumpTop();
  });

  window.addEventListener('pageshow', () => {
    stripHash();
    jumpTop();
  });

  // IMPORTANT: Do NOT intercept in-page anchor clicks here.
  // Let native anchor + CSS scroll-behavior: smooth handle it.
})();
