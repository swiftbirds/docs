// Swiftbird Documentation Site JavaScript
// Constitutional Compliance: Accessibility and Performance First

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    setupNavigation();
    setupAccessibility();
  }
  
  // Mobile navigation toggle
  function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle animation classes
      navToggle.classList.toggle('nav-toggle--active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('nav-toggle--active');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('nav-toggle--active');
      }
    });
  }
  
  // Enhanced accessibility features
  function setupAccessibility() {
    // Add keyboard navigation for menu items
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link, index) {
      link.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          event.preventDefault();
          const nextIndex = (index + 1) % navLinks.length;
          navLinks[nextIndex].focus();
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
          navLinks[prevIndex].focus();
        }
      });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Set focus to target for screen readers
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }
  
})();