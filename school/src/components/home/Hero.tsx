import React, { useState } from 'react';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <section className="relative w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] scroll-mt-16 md:scroll-mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://lh3.googleusercontent.com/p/AF1QipMh-LoytSJW2rmCyNrl9oJivm9NKBXSY8qPONTu=s1360-w1360-h1020)"
          }}
        >
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="w-full md:max-w-2xl text-white py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Welcome to Eklavya Model Residential School, Nawatand
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8">
              <span className="block mt-4">National Education Society For Tribal Students</span>
              <span className="block mt-2">राष्ट्रीय आदिवासी छात्र शिक्षा समिति</span>
              <br className="hidden md:block" />
              <span className="block mt-4">
                (जनजातीय कार्य मंत्रालय के अंतर्गत एक स्वायत्त संस्थान), भारत सरकार
              </span>
              <span className="block mt-2">
                (An Autonomous organisation under Ministry of Tribal Affairs), Government of India
              </span>
            </p>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Principal's Message Section - Now overlapping */}
      <section className="relative -mt-2 md:-mt-6 z-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Principal's Image Column */}
              <div className="lg:w-1/4">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-white shadow-xl mx-auto">
                    <img
                    src=""
                      // src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=400"
                      alt="Principal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg">
                    <h3 className="text-lg font-semibold">Firdaus Akhtar</h3>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <p className="text-gray-600 font-medium">Principal</p>
                  <p className="text-sm text-gray-500">PGT Biology (Principal-in-Charge)</p>
                </div>
              </div>

              {/* Message Content Column */}
              <div className="lg:w-3/4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Principal's Message</h2>
                  <div className="h-0.5 flex-1 bg-gradient-to-l from-blue-600 to-transparent"></div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600">
                    Dear Students, Parents, and Community Members,
                  </p>
                  <p className="text-gray-600">
                    It is with great pride and enthusiasm that I extend a warm welcome to you from Eklavya Model Residential School (EMRS) Nawatand. As the Principal of this esteemed institution, I am honored to lead a school that stands at the forefront of providing quality education and holistic development to our tribal students.
                  </p>
                  <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-28'}`}>
                    <p className="text-gray-600">
                      At EMRS Nawatand, we believe in nurturing not just academic excellence, but also character, creativity, and cultural values. Our dedicated team of educators works tirelessly to create an environment where every student can discover their potential and pursue their dreams.
                    </p>
                    <p className="text-gray-600">
                      Our curriculum is designed to provide a perfect blend of traditional wisdom and modern education. We focus on developing critical thinking, problem-solving abilities, and leadership skills while maintaining a strong connection to our rich cultural heritage.
                    </p>
                    <p className="text-gray-600">
                      The residential nature of our school provides a unique opportunity for students to learn important life skills, develop independence, and form lasting friendships. Our state-of-the-art facilities, including well-equipped laboratories, library, and sports infrastructure, ensure that students have access to all the resources they need for comprehensive development.
                    </p>
                    <p className="text-gray-600">
                      As we move forward, we remain committed to our mission of empowering tribal youth through quality education. I invite you to join us in this noble endeavor and be part of our growing family at EMRS Nawatand.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}