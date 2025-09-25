import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    'Home',
    'About Us',
    'Academics',
    'Administration',
    'Activities',
    'Gallery',
    'Public Disclosure',
    'External Links',
    'Contact'
  ];

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 
          z-50 
          bg-blue-900 
          text-white 
          transition-all 
          duration-300
          ${isScrolled ? 'shadow-lg' : ''}
        `}
      >
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center justify-between h-16 md:h-20"> */}
          <div className="flex flex-wrap items-center justify-between h-auto py-3 md:py-4">

            {/* Left Section: Menu Button and Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMenu}
                className="lg:hidden min-w-[44px] min-h-[44px] p-2 hover:bg-blue-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {/* Logo and School Name Container */}
              <Link 
                to="/" 
                className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1.5 hover:bg-blue-800/50 transition-colors"
              >
                <img 
                  src="https://nests.tribal.gov.in/images/logo_emrs.jpg" 
                  alt="School Logo" 
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full flex-shrink-0 border-2 border-white/10"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-lg md:text-2xl font-bold leading-tight truncate max-w-[200px] md:max-w-none">
                    Eklavya Model Residential School
                  </span>
                  <span className="text-sm md:text-base text-blue-200 whitespace-nowrap opacity-90">
                    UDISE Code: 20120400507
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Center Section: Navigation */}
            <nav 
              className={`
                fixed lg:static
                top-[72px] md:top-[88px] lg:top-auto
                left-0
                w-full lg:w-auto
                h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] lg:h-auto
                bg-blue-900/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'}
                overflow-y-auto lg:overflow-visible
                p-6 lg:p-0
                z-50
                border-t lg:border-t-0 border-blue-800
                lg:flex lg:items-center lg:justify-center lg:flex-1 lg:mx-8
              `}
              aria-label="Main navigation"
            >
              {/* <div className="lg:flex lg:items-center lg:justify-center lg:space-x-1 xl:space-x-2"> */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-x-4 gap-y-2">

                {menuItems.map((item) => (
                  <Link 
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`
                      block lg:inline-flex
                      min-h-[44px]
                      items-center
                      py-2.5 lg:py-2
                      px-4 lg:px-4
                      hover:bg-blue-800 lg:hover:bg-blue-800
                      rounded-md
                      transition-colors
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      text-sm xl:text-base
                      whitespace-nowrap
                      ${(item === 'Home' && location.pathname === '/') || 
                        (item !== 'Home' && location.pathname === `/${item.toLowerCase().replace(/\s+/g, '-')}`) 
                        ? 'text-yellow-400' : ''}
                    `}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Section: Login Button */}
            {/* <div className="flex items-center"> */}
            <div className="flex-shrink-0 ml-auto">

              <button 
                onClick={handleLoginClick}
                className="
                  bg-yellow-500 
                  text-blue-900 
                  px-6
                  py-2.5
                  rounded-lg
                  font-semibold 
                  hover:bg-yellow-400 
                  min-w-[44px] 
                  min-h-[44px] 
                  flex 
                  items-center 
                  justify-center 
                  text-base
                  whitespace-nowrap
                  transition-colors
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-yellow-400
                "
              >
                Portal Login
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}