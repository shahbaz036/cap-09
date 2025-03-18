import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>Nawatand, Block-Tundi</p>
              <p>Dist-Dhanbad, Jharkhand - 828109</p>
              <p className="mt-2">Phone: +91</p>
              <p>Email: emrs.tundi.jh@gmail.com</p>
            </address>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/calendar" className="hover:text-blue-200">Academic Calendar</a></li>
              <li><a href="/directory" className="hover:text-blue-200">Staff Directory</a></li>
              <li><a href="/careers" className="hover:text-blue-200">Employment</a></li>
              <li><a href="/alumni" className="hover:text-blue-200">Alumni</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/library" className="hover:text-blue-200">Library</a></li>
              <li><a href="/technology" className="hover:text-blue-200">Technology</a></li>
              <li><a href="/health" className="hover:text-blue-200">Health & Safety</a></li>
              <li><a href="/transportation" className="hover:text-blue-200">Transportation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-blue-200"><Facebook /></a>
              <a href="#" className="hover:text-blue-200"><Twitter /></a>
              <a href="#" className="hover:text-blue-200"><Instagram /></a>
              <a href="#" className="hover:text-blue-200"><Youtube /></a>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md text-gray-900 w-full"
                />
                <button className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-r-md hover:bg-yellow-400">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p>&copy; 2024 Evergreen Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}