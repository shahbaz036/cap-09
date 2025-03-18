import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';
import { LogOut, Calendar, Newspaper, Phone, Home } from 'lucide-react';
import EventsManagement from './EventsManagement';
import NewsManagement from './NewsManagement';
import ContactManagement from './ContactManagement';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [activeSection, setActiveSection] = useState('events');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'events':
        return <EventsManagement />;
      case 'news':
        return <NewsManagement />;
      case 'contacts':
        return <ContactManagement />;
      default:
        return <EventsManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
          <button
            onClick={() => setActiveSection('events')}
            className={`p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
              activeSection === 'events' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Events Management</h3>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('news')}
            className={`p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
              activeSection === 'news' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <Newspaper className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">News Management</h3>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('contacts')}
            className={`p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
              activeSection === 'contacts' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Contact Management</h3>
            </div>
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}