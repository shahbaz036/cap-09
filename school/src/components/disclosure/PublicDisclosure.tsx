import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import CBSC from '../../pdf/CBSC.pdf';
import EstablishmentLetter from '../../pdf/Establishment_Letter.pdf';
import Building_Safety_Certificate from '../../pdf/Building_Safety_Certificate.pdf';
import WaterSafety from '../../pdf/WaterSafety.pdf';
import StateSafety from '../../pdf/StateSafety.pdf';
import Disclosure from '../../pdf/Disclosure.pdf';

export default function PublicDisclosure() {
  const documents = [
    {
      title: 'Mandatory Public Disclosure Statement',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: Disclosure
    },
    {
      title: 'Building Safety Certificate',
      lastUpdated: '2024-01-20',
      fileSize: '1.8 MB',
      url: Building_Safety_Certificate
    },
    {
      title: 'Water Sample Test Report',
      lastUpdated: '2024-02-01',
      fileSize: '1.2 MB',
      url: WaterSafety
    },
    {
      title: 'State Society Registration Certificate',
      lastUpdated: '2023-12-15',
      fileSize: '2.1 MB',
      url: StateSafety
    },
    {
      title: 'Fire Safety Certificate',
      lastUpdated: '2024-01-10',
      fileSize: '1.5 MB',
      url: '#'
    },
    {
      title: 'Certificate of Land',
      lastUpdated: '2023-11-30',
      fileSize: '3.2 MB',
      url: '#'
    },
    {
      title: 'Government Approval Letter',
      lastUpdated: '2023-12-20',
      fileSize: '1.7 MB',
      url: CBSC
    },
    {
      title: 'Establishment Letter',
      lastUpdated: '2023-11-15',
      fileSize: '1.4 MB',
      url: EstablishmentLetter
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Public Disclosure</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Mandatory documents and certificates for public reference
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Official Documents</h2>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <FileText className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-semibold text-lg">{doc.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              Last updated: {doc.lastUpdated}
                            </div>
                            <p className="text-sm text-gray-500">Size: {doc.fileSize}</p>
                          </div>
                        </div>
                        <button
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <Download className="w-5 h-5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                All documents are regularly updated and maintained as per government regulations.
                Please ensure you are referring to the latest versions of these documents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}