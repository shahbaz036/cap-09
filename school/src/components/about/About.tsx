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
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://lh3.googleusercontent.com/p/AF1QipMh-LoytSJW2rmCyNrl9oJivm9NKBXSY8qPONTu=s1360-w1360-h1020)] bg-cover bg-center mix-blend-soft-light opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-950/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-100 via-white to-indigo-200">
                About Our Institution
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-indigo-400 mx-auto mb-8 rounded-full"></div>
              <p className="text-lg md:text-xl text-indigo-100 max-w-4xl mx-auto leading-relaxed font-light">
                EMRS Nawatand is part of the network of Eklavya Model Residential Schools (EMRS) set up by the Government of India under the Ministry of Tribal Affairs. The school was sanctioned in the year 2018-2019 and it is currently running classes from VI to IX for the academic session 2025-2026. The main goal of these schools is to provide quality education to children from tribal communities, especially in remote and underserved areas.
              </p>
            </div>
            <div className="mt-12 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center text-white">Key Points About EMRS</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "Purpose: EMRS aims to offer high-quality education and holistic development to tribal students, ensuring they have opportunities for academic and personal growth.",
                  "Facilities: The schools are equipped with modern facilities, including well-stocked libraries, computer labs, science labs, and sports amenities.",
                  "Curriculum: The curriculum follows NCERT guidelines, focusing on academic excellence and extracurricular activities.",
                  "Residential Nature: EMRS provides boarding facilities to students from far-flung areas.",
                  "Admission: Merit-based admission process following Ministry of Tribal Affairs guidelines.",
                  "Location: Strategic placement in tribal-dominated areas for better accessibility."
                ].map((point, index) => (
                  <div key={index} className="flex items-start p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center mr-4 mt-1 shadow-lg">
                      <span className="font-bold text-white">{index + 1}</span>
                    </span>
                    <span className="flex-1 text-indigo-100">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principal's Message with enhanced styling */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Principal's Desk</h2>
              <div className="w-20 h-1 bg-blue-200 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 p-8 bg-gradient-to-b from-blue-50 to-white border-r border-gray-100">
                  <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <Users className="w-1/2 h-1/2 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Firdaus Akhtar</h3>
                  <p className="text-blue-600 text-center mb-6">Principal, EMRS Nawatand</p>
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
                      Leading since 2018
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2 p-8 md:p-12">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="text-lg font-medium text-blue-900 mb-6">Dear Students, Parents, and Community Members,</p>
                    <p className="mb-6 leading-relaxed">
                      It is with great pride and enthusiasm that I extend a warm welcome to you from Eklavya Model Residential School (EMRS) Nawatand. As the Principal of this esteemed institution, I am honored to lead a school that stands at the forefront of providing quality education and holistic development to our tribal students.
                    </p>
                    <p className="mb-8 leading-relaxed">
                      At EMRS Nawatand, our mission is to bridge the educational divide and empower our students with the knowledge, skills, and values necessary to excel academically and personally. We are dedicated to creating an inclusive and nurturing environment where each student can reach their full potential.
                    </p>
                    <div className="bg-blue-50 rounded-xl p-8">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">We are committed to:</h3>
                      <ul className="space-y-4">
                        {[
                          "Providing Quality Education: Delivering a robust curriculum that prepares our students for future challenges and opportunities.",
                          "Holistic Development: Supporting the intellectual, emotional, and physical growth of each student through diverse programs and activities.",
                          "Community Engagement: Building strong partnerships with families and the local community to create a supportive network for our students."
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                              <span className="text-blue-700 font-medium">{index + 1}</span>
                            </span>
                            <span className="text-blue-900">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with enhanced styling */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Purpose</h2>
              <div className="w-20 h-1 bg-blue-200 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Guided by our mission and vision, we strive to create an environment where every student can thrive and excel
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative h-40 bg-gradient-to-r from-blue-600 to-blue-700">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                  <div className="absolute -bottom-10 left-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8 pt-14">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our mission is to bridge the educational divide and empower our students with the knowledge, skills, and values necessary to excel academically and personally. We are dedicated to creating an inclusive and nurturing environment where each student can reach their full potential.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative h-40 bg-gradient-to-r from-indigo-600 to-indigo-700">
                  <div className="absolute inset-0 bg-indigo-900/20"></div>
                  <div className="absolute -bottom-10 left-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8 pt-14">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our vision is to foster a learning atmosphere that not only focuses on academic excellence but also celebrates and preserves our rich tribal heritage. We believe in equipping our students with modern educational tools while respecting and incorporating the traditions and culture of our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities with enhanced styling */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Campus Facilities</h2>
              <div className="w-20 h-1 bg-blue-200 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our campus is equipped with state-of-the-art facilities to ensure a comprehensive learning experience
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;
                return (
                  <div key={index} 
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div className="p-8">
                      <div className="mb-6 relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mx-auto transform group-hover:-translate-y-1 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                        </div>
                        <div className="absolute w-16 h-16 rounded-xl bg-blue-600/10 blur-lg -z-10 mx-auto inset-x-0 group-hover:blur-xl transition-all"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-center text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{facility.title}</h3>
                      <p className="text-gray-600 text-center leading-relaxed">{facility.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}