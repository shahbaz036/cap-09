import React from 'react';
import { ExternalLink, Info } from 'lucide-react';

export default function ExternalLinks() {
  const links = [
    {
      title: 'NESTS',
      description: 'National Education Society for Tribal Students - Apex organization for EMRS schools',
      url: 'https://nests.tribal.gov.in'
    },
    {
      title: 'NOTA',
      description: 'National Open Test for Admission - Entrance examination portal',
      url: 'https://tribal.nic.in/'
    },
    {
      title: 'KVS',
      description: 'Kendriya Vidyalaya Sangathan - Network of central government schools',
      url: 'https://kvsangathan.nic.in'
    },
    {
      title: 'NVS',
      description: 'Navodaya Vidyalaya Samiti - Residential schools for talented rural students',
      url: 'https://navodaya.gov.in'
    },
    {
      title: 'JAVES',
      description: 'Joint Admission to Vocational Education in Schools',
      url: 'https://javes.tribal.gov.in'
    },
    {
      title: 'NCERT',
      description: 'National Council of Educational Research and Training',
      url: 'https://ncert.nic.in'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">External Links</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Important educational resources and partner organizations
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-yellow-700 flex-shrink-0" />
                <p className="text-yellow-700">
                  All external links will open in a new tab. Please verify that you are visiting the official websites
                  by checking the URL in your browser's address bar.
                </p>
              </div>
            </div>

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
                      <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {link.title}
                      </h2>
                      <p className="text-gray-600 mt-2">{link.description}</p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
              <p className="text-blue-700">
                If you encounter any broken links or have trouble accessing these resources,
                please contact our IT support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}