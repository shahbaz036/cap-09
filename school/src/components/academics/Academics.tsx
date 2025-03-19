import React from 'react';
import { Book, Users, Calendar, FileText, GraduationCap, Library, BookOpen } from 'lucide-react';

export default function Academics() {
  const departments = [
    { name: 'Science', description: 'Comprehensive science education with practical learning' },
    { name: 'Mathematics', description: 'Strong foundation in mathematical concepts' },
    { name: 'Languages', description: 'Multi-language proficiency development' },
    { name: 'Social Studies', description: 'Understanding society and cultural heritage' },
    { name: 'Computer Science', description: 'Modern technology and programming skills' },
    { name: 'Physical Education', description: 'Sports and physical fitness programs' }
  ];

  const resources = [
    { icon: Library, title: 'Library Resources', description: 'Access to extensive study materials' },
    { icon: Calendar, title: 'Academic Calendar', description: 'Important dates and schedules' },
    { icon: FileText, title: 'Study Materials', description: 'Downloadable course materials' },
    { icon: Users, title: 'Study Groups', description: 'Collaborative learning opportunities' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Providing quality education through comprehensive programs and experienced faculty
          </p>
        </div>
      </div>

      {/* Programs Offered */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
                <p className="text-gray-600">{dept.description}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Calendar</h2>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Current Academic Year</h3>
              <div className="space-y-4">
                {[
                  { month: 'April-May', event: 'New Academic Session Begins' },
                  { month: 'July', event: 'First Term Examinations' },
                  { month: 'September', event: 'Mid-Term Examinations' },
                  { month: 'December', event: 'Second Term Examinations' },
                  { month: 'March', event: 'Final Examinations' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <span className="font-semibold">{item.month}</span>
                      <p className="text-gray-600">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Resources */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Policies */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Policies</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { title: 'Attendance Policy', content: 'Minimum 75% attendance required in all classes' },
              { title: 'Examination Rules', content: 'Strict adherence to examination guidelines' },
              { title: 'Promotion Policy', content: 'Based on academic performance and attendance' },
              { title: 'Code of Conduct', content: 'Guidelines for student behavior and discipline' }
            ].map((policy, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                <p className="text-gray-600">{policy.content}</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800">Read More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}