import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import CBSC from '../../pdf/CBSC.pdf';
import EstablishmentLetter from '../../pdf/Establishment_Letter.pdf';
import WaterSafety from '../../pdf/WaterSafety.pdf';
import BuildingSafety from '../../pdf/BuildingSafety.pdf';
import Disclosure from '../../pdf/Disclosure.pdf';
import Daily_Routine from '../../pdf/Daily_Routine.pdf';
import Teacher_Detail from '../../pdf/Teacher_Detail.pdf';
import District_Level from '../../pdf/District_Level.pdf';
import FireSafety from '../../pdf/FireSafety.pdf';
import Academic_Calendar from '../../pdf/Academic_Calendar.pdf';
import Fee_Structure from '../../pdf/Fee_Structure.pdf';
import Land_Certificate from '../../pdf/Land_Certificate.pdf';
import Water_Sanitation from '../../pdf/Water_Sanitation.pdf';
import Recognise_Certificate from '../../pdf/Recognise_Certificate.pdf';
import Parent_Teacher from '../../pdf/Parent_Teacher.pdf';
import Self_Certification from '../../pdf/Self_Certification.pdf';
import StateSociety from '../../pdf/StateSociety.pdf';
import NESTS from '../../pdf/NESTS.pdf';

interface PublicDisclosureProps {
  isHomePage?: boolean;
}

export default function PublicDisclosure({ isHomePage = false }: PublicDisclosureProps) {
  const [showAllDocs, setShowAllDocs] = useState(false);
  const documents = [
    {
      title: 'Mandatory Public Disclosure Statement',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: Disclosure
    },
    {
      title: 'Self Certification',
      lastUpdated: '2024-01-20',
      fileSize: '1.8 MB',
      url: Self_Certification
    },
    {
      title: 'Building Safety Certificate',
      lastUpdated: '2024-01-20',
      fileSize: '1.8 MB',
      url: BuildingSafety
    },
    {
      title: 'Water Sample Test Report',
      lastUpdated: '2024-02-01',
      fileSize: '1.2 MB',
      url: WaterSafety
    },
    {
      title: 'Fire Safety Certificate',
      lastUpdated: '2024-01-10',
      fileSize: '1.5 MB',
      url: FireSafety
    },
    {
      title: 'Certificate of Land',
      lastUpdated: '2023-11-30',
      fileSize: '3.2 MB',
      url: Land_Certificate
    },
    {
      title: 'Drinking water and Sanitation',
      lastUpdated: '2023-11-30',
      fileSize: '3.2 MB',
      url: Water_Sanitation
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
    },
    {
      title: 'Teachers Detail',
      lastUpdated: '2024-02-15',
      fileSize: '1.0 MB',
      url: Teacher_Detail
    },
    {
      title: 'School Daily Routine',
      lastUpdated: '2024-02-15',
      fileSize: '1.0 MB',
      url: Daily_Routine
    },
    {
      title: 'Recognition Certificate',
      lastUpdated: '2024-02-15',
      fileSize: '1.0 MB',
      url: Recognise_Certificate
    },
    {
      title: 'Parent Teacher Association',
      lastUpdated: '2024-02-15',
      fileSize: '1.0 MB',
      url: Parent_Teacher
    },
    {
      title: 'District Level Committee',
      lastUpdated: '2024-02-15',
      fileSize: '1.0 MB',
      url: District_Level
    },
    {
      title: 'Fee Structure',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: Fee_Structure
    },
    {
      title: 'Academic Calendar',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: Academic_Calendar
    },
    {
      title: 'State Society Approval Letter',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: StateSociety
    },
    {
      title: 'Copies of societies/trust/Company Registration ',
      lastUpdated: '2024-02-15',
      fileSize: '2.5 MB',
      url: NESTS
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Public Disclosure</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access important documents and certificates as part of our commitment to transparency and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Always show first 3 documents */}
            {documents.slice(0, isHomePage ? 3 : undefined).map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Last updated: {doc.lastUpdated}</span>
                  </div>
                  <p className="text-sm text-gray-500">Size: {doc.fileSize}</p>
                </div>
                <div className="flex-shrink-0 self-center">
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            ))}
            
            {/* Show remaining documents when showAllDocs is true */}
            {isHomePage && (
              <div className={`col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
                showAllDocs ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {documents.slice(3).map((doc, index) => (
                  <a
                    key={index + 3}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Last updated: {doc.lastUpdated}</span>
                      </div>
                      <p className="text-sm text-gray-500">Size: {doc.fileSize}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Show More button only on homepage */}
          {isHomePage && documents.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllDocs(!showAllDocs)}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md group"
              >
                <span className="mr-2">{showAllDocs ? 'Show Less' : 'Show More'}</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${showAllDocs ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Document Updates</h3>
                <p className="text-blue-700 mt-1">
                  All documents are regularly updated and maintained as per government regulations.
                  Please ensure you are referring to the latest versions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}