import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll events for hiding/showing navbar
  useEffect(() => {
    // Throttled scroll handler for better performance
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      
      scrollTimeoutRef.current = setTimeout(() => {
        const currentScrollPos = window.scrollY;
        
        // On mobile, when menu is open, don't hide the navbar
        if (isMobile && isMenuOpen) {
          setVisible(true);
        } else {
          // Show navbar when scrolling up, hide when scrolling down
          // Always show at top of page
          setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        }
        
        // Close menu when scrolling significantly
        if (isMenuOpen && Math.abs(currentScrollPos - prevScrollPos) > 20) {
          setIsMenuOpen(false);
        }
        
        setPrevScrollPos(currentScrollPos);
        scrollTimeoutRef.current = null;
      }, 100); // Throttle to improve performance
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [prevScrollPos, isMenuOpen, isMobile]);

  // Toggle menu with improved handling for mobile
  const toggleMenu = () => {
    // When opening the menu, ensure navbar is visible
    if (!isMenuOpen) {
      setVisible(true);
    }
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mutual Funds", href: "/mutual-funds" },
    { name: "Insurance", href: "/insurance" },
    { name: "Loans", href: "/loans" },
    { name: "About Us", href: "/about" },
  ];
  
  return (
    <header 
      className={`bg-white shadow-sm sticky top-0 z-50 font-poppins border-b border-gray-100 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/crop1.jpg"
                alt="SkFinancial"
                className="h-16 w-auto"
              />
            </div>
          </div>
          
          {/* Center Section: Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-text-secondary hover:text-primary px-3 py-2 font-medium transition-colors duration-200 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Right Section: CTA Button */}
          <div className="hidden md:block flex-shrink-0">
            <Link to="/contact">
              <button className="bg-primary text-white hover:bg-primary-dark px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm hover:shadow-md">
                Get in touch
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-text-secondary hover:text-text-primary focus:outline-none focus:text-text-primary p-2"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                // X icon when menu is open
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - with improved transition */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >            
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-secondary-dark rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}              
            <div className="pt-4">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-primary text-white hover:bg-primary-dark px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm hover:shadow-md">
                  Get in touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
