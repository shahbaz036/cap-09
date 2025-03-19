import React from 'react';
import { BookOpen, Award, Users, Building, Calendar } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: 2010, title: 'School Establishment', description: 'Founded as part of the EMRS initiative' },
    { year: 2015, title: 'Infrastructure Expansion', description: 'New academic block and laboratories' },
    { year: 2018, title: 'Excellence Award', description: 'Recognized for academic achievements' },
    { year: 2020, title: 'Digital Integration', description: 'Implementation of smart classrooms' },
    { year: 2023, title: 'Sports Complex', description: 'State-of-the-art sports facilities added' }
  ];

  const facilities = [
    { icon: BookOpen, title: 'Library', description: 'Extensive collection of books and digital resources' },
    { icon: Building, title: 'Laboratories', description: 'Well-equipped science and computer labs' },
    { icon: Users, title: 'Hostels', description: 'Separate hostels for boys and girls' },
    { icon: Calendar, title: 'Auditorium', description: 'Modern auditorium for events and activities' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Our Institution</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Empowering tribal students through quality education and comprehensive development
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide high-quality education to tribal students, fostering academic excellence,
                cultural awareness, and holistic development while preparing them for future challenges.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To emerge as a center of excellence in tribal education, creating leaders who contribute
                meaningfully to society while preserving their cultural heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="flex-1 md:w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white"></div>
                  <div className="flex-1 md:w-1/2 p-4">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                      <span className="text-blue-600 font-bold">{milestone.year}</span>
                      <h3 className="text-xl font-semibold mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Campus Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Campus Life</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={`https://source.unsplash.com/random/400x400?school,education&sig=${index}`}
                  alt={`Campus life ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}