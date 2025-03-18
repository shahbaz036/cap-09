import React from 'react';
import { BookOpen, Users, Calendar, Download, Mail, Phone } from 'lucide-react';

export default function QuickLinks() {
  const links = [
    { icon: BookOpen, title: 'Academic Calendar', description: 'View important dates and schedules' },
    { icon: Users, title: 'Parent Portal', description: 'Access grades and resources' },
    { icon: Calendar, title: 'Events', description: 'See upcoming school events' },
    { icon: Download, title: 'Forms & Documents', description: 'Download important forms' },
    { icon: Mail, title: 'Newsletter', description: 'Subscribe to our newsletter' },
    { icon: Phone, title: 'Contact Us', description: 'Get in touch with us' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                className="flex items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon className="flex-shrink-0 w-8 h-8 text-blue-600" />
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}