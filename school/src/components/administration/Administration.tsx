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
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <div className="absolute right-0 top-0 -mt-16 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 -mb-16 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100">
              School Administration
            </h1>
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Meet our dedicated team of educators and administrative staff who work tirelessly to shape the future of our students
            </p>
          </div>
        </div>
      </div>

      {/* Staff Directory Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Staff Directory</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our team of qualified professionals dedicated to excellence in education
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th scope="col" className="px-8 py-5 text-left text-sm font-semibold text-gray-900 tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-8 py-5 text-left text-sm font-semibold text-gray-900 tracking-wider">
                        Designation
                      </th>
                      <th scope="col" className="px-8 py-5 text-left text-sm font-semibold text-gray-900 tracking-wider">
                        Educational Qualification
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffMembers.map((staff, index) => (
                      <tr 
                        key={index} 
                        className={`group transition-colors hover:bg-blue-50/50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                                <span className="text-blue-700 font-medium text-lg">
                                  {staff.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                {staff.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="text-base text-gray-900">{staff.designation}</div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors">
                            {staff.qualification}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative bg-white rounded-xl p-7 ring-1 ring-gray-900/5 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Our staff members are highly qualified and dedicated professionals committed to providing quality education.
                        The information provided here is regularly updated to reflect any changes in staff or their qualifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}