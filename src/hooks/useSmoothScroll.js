import { useCallback } from 'react';

// Custom hook for smooth scrolling
export const useSmoothScroll = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToSection = useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToElement = useCallback((element, offset = 0) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const smoothScrollBy = useCallback((pixels) => {
    window.scrollBy({
      top: pixels,
      behavior: 'smooth'
    });
  }, []);

  return {
    scrollToTop,
    scrollToSection,
    scrollToElement,
    smoothScrollBy
  };
};

// Utility function for intersection observer with smooth animations
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Enhanced scroll performance utility
export const optimizeScrollPerformance = () => {
  // Enable passive event listeners for better scroll performance
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return supportsPassive;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (error) {
    // Passive listeners not supported
    console.log('Passive event listeners not supported:', error.message);
  }

  // Add smooth scrolling to all anchor links
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target && target.getAttribute('href').length > 1) {
      e.preventDefault();
      const targetId = target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Adjust based on your navbar height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, supportsPassive ? { passive: false } : false);
};

export default useSmoothScroll;
