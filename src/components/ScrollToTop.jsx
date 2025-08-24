import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will automatically scroll to top whenever the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth scrolling for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Fallback for browsers that don't support smooth scrolling
    setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }, 100);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
