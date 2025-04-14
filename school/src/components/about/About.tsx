import React from 'react';
// import { BookOpen, Award, Users, Building, Calendar } from 'lucide-react';
import { BookOpen, Award, Users, Building, Calendar, Mic, BatteryCharging, Camera, Monitor, Home } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: 2010, title: 'School Establishment', description: 'Founded as part of the EMRS initiative' },
    { year: 2015, title: 'Infrastructure Expansion', description: 'New academic block and laboratories' },
    { year: 2018, title: 'Excellence Award', description: 'Recognized for academic achievements' },
    { year: 2020, title: 'Digital Integration', description: 'Implementation of smart classrooms' },
    { year: 2023, title: 'Sports Complex', description: 'State-of-the-art sports facilities added' }
  ];

  const facilities = [
    { icon: Building, title: 'Classrooms', description: 'Spacious and well-ventilated classrooms for learning' },
    { icon: BookOpen, title: 'Library', description: 'Extensive collection of books and digital resources' },
    { icon: Mic, title: 'Sound System', description: 'High-quality audio equipment for clear sound' },
    { icon: BatteryCharging, title: 'Generator Backup', description: 'Reliable power backup for uninterrupted services' },
    { icon: Camera, title: 'CCTV Camera', description: '24/7 surveillance for enhanced security' },
    { icon: Monitor, title: 'Computer Lab', description: 'Fully equipped lab with the latest computers' },
    { icon: Home, title: 'Teacher Room', description: 'Dedicated space for teachers to collaborate and work' },
    { icon: Calendar, title: 'Ground', description: 'Well-maintained playground for sports and activities' },
    { icon: Building, title: 'Stage', description: 'Large stage for events and performances' },
    { icon: Building, title: 'Science Laboratories', description: 'Well-equipped science and computer labs' },
    { icon: Award, title: 'Clean Drinking Water', description: 'Purified drinking water available throughout the campus' },
    { icon: Users, title: 'Hostels', description: 'Separate hostels for boys and girls' },
    { icon: Calendar, title: 'AV Hall', description: 'Modern auditorium for events and activities' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with enhanced styling */}
      <div className="relative bg-blue-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About Our Institution
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed">
            EMRS Nawatand is the part of network of Eklavya Model Residential Schools (EMRS) set up by the Government of India under the Ministry of Tribal Affairs. The school was sanctioned in the year 2018-2019 and it is currently running classes from VI to IX for the academic session 2025-2026. The main goal of these schools is to provide quality education to children from tribal communities, especially in remote and underserved areas.
          </p>
          <div className="mt-8 space-y-4 text-blue-100">
            <h2 className="text-xl font-bold mb-4">Key Points About EMRS:</h2>
            <ul className="space-y-4 list-none">
              {[
                "Purpose: EMRS aims to offer high-quality education and holistic development to tribal students, ensuring they have opportunities for academic and personal growth.",
                "Facilities: The schools are equipped with modern facilities, including well-stocked libraries, computer labs, science labs, and sports amenities.",
                "Curriculum: The curriculum follows NCERT guidelines, focusing on academic excellence and extracurricular activities.",
                "Residential Nature: EMRS provides boarding facilities to students from far-flung areas.",
                "Admission: Merit-based admission process following Ministry of Tribal Affairs guidelines.",
                "Location: Strategic placement in tribal-dominated areas for better accessibility."
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center mr-3 mt-1">
                    {index + 1}
                  </span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Principal's Message with enhanced styling */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Principal's Desk</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="font-bold mb-4">Principal Name: Firdaus Akhtar</p>
                <p className="mb-4">Welcome to Eklavya Model Residential School Nawatand</p>
                <p className="mb-4">Dear Students, Parents, and Community Members,</p>
                <p className="mb-4">
                  It is with great pride and enthusiasm that I extend a warm welcome to you from Eklavya Model Residential School (EMRS) Nawatand. As the Principal of this esteemed institution, I am honored to lead a school that stands at the forefront of providing quality education and holistic development to our tribal students.
                </p>
                <p className="mb-4">
                  At EMRS Nawatand, our mission is to bridge the educational divide and empower our students with the knowledge, skills, and values necessary to excel academically and personally. We are dedicated to creating an inclusive and nurturing environment where each student can reach their full potential.
                </p>
                <h3 className="text-xl font-semibold mt-8 mb-4">We are committed to:</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Providing Quality Education: Delivering a robust curriculum that prepares our students for future challenges and opportunities.</li>
                  <li>Holistic Development: Supporting the intellectual, emotional, and physical growth of each student through diverse programs and activities.</li>
                  <li>Community Engagement: Building strong partnerships with families and the local community to create a supportive network for our students.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with enhanced styling */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <span className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </span>
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to bridge the educational divide and empower our students with the knowledge, skills, and values necessary to excel academically and personally. We are dedicated to creating an inclusive and nurturing environment where each student can reach their full potential.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <span className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </span>
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our vision is to foster a learning atmosphere that not only focuses on academic excellence but also celebrates and preserves our rich tribal heritage. We believe in equipping our students with modern educational tools while respecting and incorporating the traditions and culture of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities with enhanced styling */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Campus Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">{facility.title}</h3>
                  <p className="text-gray-600 text-center">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}