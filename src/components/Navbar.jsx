import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const handleLogout = async () => { try { await logout(); } catch { /* ignore */ } };
  const isActive = (path) => location.pathname === path;

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
  
  useEffect(() => {
    const onClick = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false); };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-sm font-poppins border-b border-gray-100 transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/crop1.jpg"
                alt="SkFinancial"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="hidden md:block font-semibold text-gray-800 tracking-tight text-sm">SK Financial</span>
            </Link>
          </div>
          
          {/* Center Section: Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            <nav className="flex space-x-1 lg:space-x-2 relative">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:rounded-full hover:text-blue-600 hover:after:w-4 ${isActive(item.href) ? 'text-blue-600 after:w-6' : 'text-gray-700 hover:bg-gray-100'} `}
                >{item.name}</Link>
              ))}
            </nav>
          </div>
          
          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {!user && (
              <>
                <Link to="/login" className={`text-xs lg:text-sm font-medium transition-colors ${isActive('/login') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Login</Link>
                <Link to="/signup" className="text-xs lg:text-sm font-semibold px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign Up</Link>
              </>
            )}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(o=>!o)} className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 text-sm animate-fade-in">
                    <div className="px-4 pb-2 text-gray-700 text-xs border-b border-gray-100 truncate" title={user.displayName || user.email}>{user.displayName || user.email}</div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium">Logout</button>
                  </div>
                )}
              </div>
            )}
            <Link to="/contact" className="ml-1">
              <button className="hidden lg:inline-flex bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors border border-blue-200">Contact</button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <button onClick={() => setUserMenuOpen(o=>!o)} className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</button>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 active:scale-95 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out ${isMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
        >            
          <div className="px-4 pt-2 pb-5 space-y-1 bg-white/95 backdrop-blur border-t border-gray-100 shadow-sm">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <Link key={item.name} to={item.href} onClick={() => { setIsMenuOpen(false); setUserMenuOpen(false); }} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}>{item.name}</Link>
              ))}
            </nav>
            <div className="pt-3 flex flex-col gap-3 border-t border-gray-100 mt-2">
              {!user && (
                <div className="flex gap-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`flex-1 text-center px-4 py-2 rounded-md font-medium text-sm border ${isActive('/login') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}>Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-sm shadow hover:bg-blue-700">Sign Up</Link>
                </div>
              )}
              {user && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700 truncate">{user.displayName || user.email}</span>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-sm text-red-600 font-medium hover:underline">Logout</button>
                </div>
              )}
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="w-full">
                <button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm font-medium rounded-md transition-colors border border-blue-200">Contact</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
