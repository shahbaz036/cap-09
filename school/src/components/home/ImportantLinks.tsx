import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ImportantLinks() {
  const links = [
    {
      title: 'NESTS Portal',
      description: 'Access the central NESTS portal for updates and resources',
      url: 'https://nests.tribal.gov.in'
    },
     {
      title: 'NOTA',
      description: 'National Open Test for Admission - Entrance examination portal',
      url: 'https://tribal.nic.in/'
    },
    {
      title: 'NCERT',
      description: 'National Council of Educational Research and Training',
      url: 'https://ncert.nic.in'
    },
    {
      title: 'NVS',
      description: 'Navodaya Vidyalaya Samiti - Residential schools for talented rural students',
      url: 'https://navodaya.gov.in'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Important Links</h2>
          
          <div className="grid gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{link.description}</p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}