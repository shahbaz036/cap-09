import React from 'react';
import { BookOpen, Calendar, Download, Mail, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickLinks() {
  const links = [
    { 
      icon: Calendar, 
      title: 'Academic Calendar', 
      description: 'View important dates and schedules',
      to: '/academics#calendar'
    },
    { 
      icon: BookOpen, 
      title: 'Student Resources', 
      description: 'Access study materials and guides',
      to: '/academics#resources'
    },
    { 
      icon: Download, 
      title: 'Forms & Documents', 
      description: 'Download important forms',
      to: '/admissions#documents'
    },
    { 
      icon: FileText, 
      title: 'Admission Guide', 
      description: 'Learn about the admission process',
      to: '/admissions'
    },
    { 
      icon: Mail, 
      title: 'Newsletter', 
      description: 'Subscribe to our newsletter',
      to: '#newsletter'
    },
    { 
      icon: Phone, 
      title: 'Contact Us', 
      description: 'Get in touch with us',
      to: '/contact'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.to}
                className="flex items-start p-4 md:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <Icon className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}