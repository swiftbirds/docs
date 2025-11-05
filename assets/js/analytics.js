// Swiftbird Documentation Analytics
// Privacy-focused analytics implementation

(function() {
  'use strict';
  
  // Check for Do Not Track and consent
  if (navigator.doNotTrack === '1' || 
      localStorage.getItem('analytics_consent') === 'false') {
    console.log('Analytics disabled per user preference');
    return;
  }
  
  // Basic page tracking without PII
  const trackPageView = () => {
    // Only track if Google Analytics is configured
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.pathname,
        send_to: 'default'
      });
    }
    
    // Custom analytics for document engagement
    trackDocumentEngagement();
  };
  
  // Track document-specific metrics
  const trackDocumentEngagement = () => {
    let startTime = Date.now();
    let scrollDepth = 0;
    let maxScroll = 0;
    
    // Track scroll depth
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.round((scrollTop / docHeight) * 100);
      maxScroll = Math.max(maxScroll, scrollDepth);
    };
    
    // Track time on page and scroll on unload
    const trackEngagement = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof gtag === 'function') {
        gtag('event', 'engagement', {
          engagement_time_msec: timeOnPage * 1000,
          scroll_depth: maxScroll
        });
      }
      
      // Store engagement metrics locally (non-PII)
      try {
        const pageMetrics = {
          path: window.location.pathname,
          timeOnPage: timeOnPage,
          maxScroll: maxScroll,
          timestamp: new Date().toISOString().split('T')[0] // Date only
        };
        
        let metrics = JSON.parse(localStorage.getItem('page_metrics') || '[]');
        metrics.push(pageMetrics);
        
        // Keep only last 10 entries to avoid storage bloat
        if (metrics.length > 10) {
          metrics = metrics.slice(-10);
        }
        
        localStorage.setItem('page_metrics', JSON.stringify(metrics));
      } catch (e) {
        // Silent fail if localStorage not available
      }
    };
    
    // Event listeners
    window.addEventListener('scroll', updateScrollDepth, { passive: true });
    window.addEventListener('beforeunload', trackEngagement);
    
    // Track section visibility for vision/mission document
    if (window.location.pathname.includes('vision-mission')) {
      trackSectionVisibility();
    }
  };
  
  // Track which sections users actually read
  const trackSectionVisibility = () => {
    const sections = document.querySelectorAll('h2, h3');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.textContent.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
          
          if (typeof gtag === 'function') {
            gtag('event', 'section_view', {
              section_name: sectionName,
              custom_parameter: 'vision_mission_engagement'
            });
          }
        }
      });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
  };
  
  // Initialize analytics
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
  } else {
    trackPageView();
  }
  
  // Expose consent management for privacy compliance
  window.SwiftbirdAnalytics = {
    setConsent: (consent) => {
      localStorage.setItem('analytics_consent', consent.toString());
      if (!consent && typeof gtag === 'function') {
        gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    },
    
    getMetrics: () => {
      try {
        return JSON.parse(localStorage.getItem('page_metrics') || '[]');
      } catch (e) {
        return [];
      }
    }
  };
  
})();