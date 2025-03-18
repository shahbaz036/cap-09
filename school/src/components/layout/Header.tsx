import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://nests.tribal.gov.in/images/logo_emrs.jpg" alt="School Logo" className="h-12 w-12 rounded-full" />
              <span className="text-xl font-bold">Eklavya Model Residential School, Nawatand <br></br>
              <span>UDISE Code : 20120400507</span></span>
              
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <Link to="/academics" className="hover:text-blue-200">Academics</Link>
            <Link to="/admissions" className="hover:text-blue-200">Admissions</Link>
            {/* <Link to="/student-life" className="hover:text-blue-200">Student Life</Link> */}
            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <button className="hover:text-blue-200">
              <Search size={20} />
            </button>
            <button className="hover:text-blue-200">
              <Bell size={20} />
            </button> */}
            <button 
              onClick={handleLoginClick}
              className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400"
            >
              Portal Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}