import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Handle scroll events for hiding/showing navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-text-primary focus:outline-none focus:text-text-primary"
            >
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
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-secondary-dark rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}              <div className="pt-4">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-primary text-white hover:bg-primary-dark px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm hover:shadow-md">
                    Get in touch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
