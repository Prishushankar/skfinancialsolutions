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
      
      // Simple scroll logic: show when scrolling up or at top, hide when scrolling down
      if (currentScrollPos < 10) {
        // Always show at top of page
        setVisible(true);
      } else if (currentScrollPos > prevScrollPos) {
        // Scrolling down - hide navbar (unless menu is open)
        if (!isMenuOpen) {
          setVisible(false);
        }
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mutual Funds", href: "/mutual-funds" },
    { name: "Insurance", href: "/insurance" },
    { name: "Loans", href: "/loans" },
    // Remove old Market item, add new with submenu
    {
      name: "Market",
      href: "/news" },
    {
      name: "News",
       href: "/financial-news" },
       { name: "Videos", href: "/videos" },
    { name: "About Us", href: "/about" },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-poppins border-b border-gray-100 transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/crop1.jpg"
                alt="SkFinancial"
                className="h-20 w-auto"
              />
            </div>
          </div>
          
          {/* Center Section: Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.name} className="relative group">
                    <Link to={item.submenu[0].href} className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 text-sm flex items-center" tabIndex={0}>
                      {item.name}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </Link>
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm rounded-md transition-colors duration-200"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
          
          {/* Right Section: CTA Button */}
          <div className="hidden md:block flex-shrink-0">
            <Link to="/contact">
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                Get in touch
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
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

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >            
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.name} className="">
                  <Link to={item.submenu[0].href} className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center" tabIndex={0}>
                    {item.name}
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </Link>
                  <div className="pl-4">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}              
            <div className="pt-4">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200">
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
