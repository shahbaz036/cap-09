import React from 'react';
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

export default function PublicDisclosure() {
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