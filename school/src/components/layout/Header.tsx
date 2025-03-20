import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
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
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Brand Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleMenu}
                className="lg:hidden min-w-[44px] min-h-[44px] p-2 hover:bg-blue-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link 
                to="/" 
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
              >
                <img 
                  src="https://nests.tribal.gov.in/images/logo_emrs.jpg" 
                  alt="School Logo" 
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-base md:text-xl font-bold leading-tight line-clamp-1">
                    Eklavya Model Residential School
                  </span>
                  <span className="text-xs md:text-sm text-blue-200">
                    UDISE Code: 20120400507
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Navigation Menu */}
            <nav 
              className={`
                lg:flex lg:items-center lg:space-x-8
                fixed lg:relative
                top-16 md:top-20 lg:top-0
                left-0
                w-full lg:w-auto
                h-[calc(100vh-4rem)] lg:h-auto
                bg-blue-900 lg:bg-transparent
                transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                overflow-y-auto lg:overflow-visible
                p-4 lg:p-0
                z-50
                border-t lg:border-t-0 border-blue-800
              `}
              aria-label="Main navigation"
            >
              {['About', 'Academics', 'Admissions', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className={`
                    block lg:inline-flex
                    min-h-[44px] lg:min-h-0
                    items-center
                    py-3 px-4 lg:p-2
                    hover:bg-blue-800 lg:hover:bg-transparent
                    hover:text-blue-200
                    rounded-md lg:rounded-none
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${location.pathname === `/${item.toLowerCase()}` ? 'text-yellow-400' : ''}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Login Button */}
            <div className="flex items-center">
              <button 
                onClick={handleLoginClick}
                className="
                  bg-yellow-500 
                  text-blue-900 
                  px-4 
                  py-2 
                  rounded-md 
                  font-semibold 
                  hover:bg-yellow-400 
                  min-w-[44px] 
                  min-h-[44px] 
                  flex 
                  items-center 
                  justify-center 
                  text-base
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
      {/* Spacer div to prevent content from being hidden under fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}