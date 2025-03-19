import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-blue-800 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://nests.tribal.gov.in/images/logo_emrs.jpg" 
                alt="School Logo" 
                className="h-10 w-10 md:h-12 md:w-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-base md:text-xl font-bold leading-tight">
                  Eklavya Model Residential School, Nawatand
                </span>
                <span className="text-xs md:text-sm text-blue-200">
                  UDISE Code: 20120400507
                </span>
              </div>
            </Link>
          </div>
          
          <nav className={`
            lg:flex lg:space-x-8
            ${isMenuOpen ? 'block' : 'hidden'}
            fixed lg:relative
            top-16 md:top-20 lg:top-0
            left-0
            w-full lg:w-auto
            bg-blue-900 lg:bg-transparent
            p-4 lg:p-0
            z-50
            border-t lg:border-t-0 border-blue-800
          `}>
            <Link 
              to="/about" 
              className="block lg:inline-block py-2 px-4 lg:p-0 hover:bg-blue-800 lg:hover:bg-transparent hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/academics" 
              className="block lg:inline-block py-2 px-4 lg:p-0 hover:bg-blue-800 lg:hover:bg-transparent hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Academics
            </Link>
            <Link 
              to="/admissions" 
              className="block lg:inline-block py-2 px-4 lg:p-0 hover:bg-blue-800 lg:hover:bg-transparent hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admissions
            </Link>
            <Link 
              to="/contact" 
              className="block lg:inline-block py-2 px-4 lg:p-0 hover:bg-blue-800 lg:hover:bg-transparent hover:text-blue-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center">
            <button 
              onClick={handleLoginClick}
              className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 min-w-[44px] min-h-[44px] flex items-center justify-center text-base"
            >
              Portal Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}