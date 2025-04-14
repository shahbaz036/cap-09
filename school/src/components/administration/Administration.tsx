import React from 'react';
import { FileText, Download, CreditCard, HelpCircle, Mail, Phone, MapPin, Users } from 'lucide-react';

export default function Administration() {
  const staffMembers = [
    { 
      name: 'Firdaus Akhtar',
      designation: 'PGT Biology (Principal-in-Charge)',
      qualification: 'M.Sc, B.Ed'
    },
    {
      name: 'Daven Kumar Saw',
      designation: 'TGT Mathematics',
      qualification: 'M.Sc, B.Ed'
    },
    {
      name: 'Suryakanta Kumar Mandal',
      designation: 'TGT Science',
      qualification: 'B.Sc, B.Ed'
    },
    {
      name: 'Gautam Kumar Sinha',
      designation: 'TGT Social Studies',
      qualification: 'B.A, B.Ed'
    },
    {
      name: 'Vinita Kumari',
      designation: 'TGT PET',
      qualification: 'B.P.Ed, M.P.Ed'
    },
    {
      name: 'Kabita Kumari Mahto',
      designation: 'TGT Hindi',
      qualification: 'M.A, B.Ed'
    },
    {
      name: 'Bimla Kumari',
      designation: 'Hostel Warden (Female)',
      qualification: 'B.Tech'
    },
    {
      name: 'Ganesh Kumar Gupta',
      designation: 'Hostel Warden (Male)',
      qualification: 'B.Sc'
    },
    {
      name: 'Raj Keshri',
      designation: 'Accountant',
      qualification: 'B.Com'
    },
    {
      name: 'Rita Kumari',
      designation: 'JSA',
      qualification: 'M.Sc'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Administration</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Meet our dedicated team of educators and staff members
          </p>
        </div>
      </div>

      {/* Staff Directory Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Staff Directory</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Educational Qualification
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffMembers.map((staff, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{staff.designation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{staff.qualification}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Note</h3>
                  <p className="text-blue-700">
                    Our staff members are highly qualified and dedicated professionals committed to providing quality education.
                    The information provided here is regularly updated to reflect any changes in staff or their qualifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}