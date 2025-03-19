import React from 'react';
import { FileText, Download, CreditCard, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Admissions() {
  const admissionSteps = [
    { title: 'Online Application', description: 'Complete the online application form' },
    { title: 'Document Submission', description: 'Submit required documents' },
    { title: 'Entrance Test', description: 'Take the entrance examination' },
    { title: 'Interview', description: 'Personal interview with faculty' },
    { title: 'Final Selection', description: 'Merit-based admission confirmation' }
  ];

  const faqs = [
    {
      question: 'What are the eligibility criteria?',
      answer: 'Students must belong to Scheduled Tribes and meet the academic requirements.'
    },
    {
      question: 'When do admissions open?',
      answer: 'Admissions typically open in January for the academic year starting in April.'
    },
    {
      question: 'What documents are required?',
      answer: 'ST certificate, previous academic records, domicile certificate, and identity proof.'
    },
    {
      question: 'Is there a hostel facility?',
      answer: 'Yes, separate hostel facilities are available for boys and girls.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Join our institution for quality education and comprehensive development
          </p>
        </div>
      </div>

      {/* Application Process */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Steps */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:-translate-x-1/2"></div>
              {admissionSteps.map((step, index) => (
                <div key={index} className="relative flex items-center mb-8">
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full transform md:-translate-x-1/2 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className={`ml-24 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                  }`}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Fees */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Admission Requirements</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FileText className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Eligibility</h3>
                    <p className="text-gray-600">Must belong to Scheduled Tribes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Download className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Required Documents</h3>
                    <p className="text-gray-600">ST Certificate, Academic Records, ID Proof</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCard className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Application Fee</h3>
                    <p className="text-gray-600">No application fee for eligible candidates</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  Education at EMRS is fully funded by the Ministry of Tribal Affairs, Government of India
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Tuition Fee</span>
                    <span className="font-semibold">Free</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Hostel Fee</span>
                    <span className="font-semibold">Free</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Books & Supplies</span>
                    <span className="font-semibold">Provided</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <details key={index} className="mb-4 bg-white rounded-lg shadow-md">
                <summary className="p-6 cursor-pointer font-semibold flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-3" />
                  {faq.question}
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Admissions Office</h2>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Mail className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">admissions.emrs@example.com</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Phone className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+91-XXXXXXXXXX</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">
                Eklavya Model Residential School<br />
                Nawatand, Block-Tundi<br />
                Dist-Dhanbad, Jharkhand-828109
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}