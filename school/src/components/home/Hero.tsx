import React, { useState } from 'react';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <section className="relative w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] scroll-mt-16 md:scroll-mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://lh3.googleusercontent.com/p/AF1QipMh-LoytSJW2rmCyNrl9oJivm9NKBXSY8qPONTu=s1360-w1360-h1020)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-emerald-900/40"></div>
        </div>
        
        <div className="relative w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-start py-12 sm:py-16 md:py-20">
          <div className="w-full max-w-4xl text-white">
            <div className="p-4 sm:p-6 md:p-8 relative">
              <div className="absolute -left-2 top-0 w-1 h-32 bg-gradient-to-b from-emerald-400 to-blue-400 hidden md:block"></div>
              <h1 className="font-bold">
                <span className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Welcome to
                </span>
                <span className="block mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Eklavya Model Residential School
                </span>
                <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  Nawatand, Tundi
                </span>
              </h1>
              
              <div className="mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8 relative">
                <div className="absolute -left-2 top-0 w-1 h-40 bg-gradient-to-b from-blue-400 to-emerald-400 hidden md:block"></div>
                <div className="rounded-lg py-3 sm:py-4 md:py-6">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    National Education Society For Tribal Students
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 mt-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    राष्ट्रीय आदिवासी छात्र शिक्षा समिति
                  </p>
                </div>
                
                <div className="rounded-lg py-3 sm:py-4 md:py-6">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    An Autonomous organisation under Ministry of Tribal Affairs
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-yellow-200 font-medium mt-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    जनजातीय कार्य मंत्रालय के अंतर्गत एक स्वायत्त संस्थान
                  </p>
                </div>
                
                <div className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg p-[2px]">
                  <p className="text-sm sm:text-xl md:text-2xl font-bold bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg">
                    Government of India | भारत सरकार
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Principal's Message Section */}
      <section className="relative -mt-2 sm:-mt-4 md:-mt-6 z-10 pb-12 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100">
            {/* Header with Principal's Info */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center">
                <div className="h-px w-12 sm:w-16 bg-blue-600"></div>
                <h2 className="mx-4 sm:mx-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Principal's Message</h2>
                <div className="h-px w-12 sm:w-16 bg-blue-600"></div>
              </div>
              <div className="mt-4 sm:mt-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600">Firdaus Akhtar</h3>
                <p className="text-base sm:text-lg text-gray-600 mt-2">PGT Biology (Principal-in-Charge)</p>
              </div>
            </div>

            {/* Message Content */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-blue-600/20"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-blue-600/20"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-blue-600/20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-blue-600/20"></div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed px-3 sm:px-4">
                <p className="text-base sm:text-lg italic">
                  Dear Students, Parents, and Community Members,
                </p>
                <p className="text-base sm:text-lg">
                  It is with great pride and enthusiasm that I extend a warm welcome to you from Eklavya Model Residential School (EMRS) Nawatand. As the Principal of this esteemed institution, I am honored to lead a school that stands at the forefront of providing quality education and holistic development to our tribal students.
                </p>
                <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-24 sm:max-h-28'}`}>
                  <p className="text-base sm:text-lg">
                    At EMRS Nawatand, we believe in nurturing not just academic excellence, but also character, creativity, and cultural values. Our dedicated team of educators works tirelessly to create an environment where every student can discover their potential and pursue their dreams.
                  </p>
                  <p className="text-lg">
                    Our curriculum is designed to provide a perfect blend of traditional wisdom and modern education. We focus on developing critical thinking, problem-solving abilities, and leadership skills while maintaining a strong connection to our rich cultural heritage.
                  </p>
                  <p className="text-lg">
                    The residential nature of our school provides a unique opportunity for students to learn important life skills, develop independence, and form lasting friendships. Our state-of-the-art facilities, including well-equipped laboratories, library, and sports infrastructure, ensure that students have access to all the resources they need for comprehensive development.
                  </p>
                  <p className="text-lg">
                    As we move forward, we remain committed to our mission of empowering tribal youth through quality education. I invite you to join us in this noble endeavor and be part of our growing family at EMRS Nawatand.
                  </p>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md group"
                >
                  <span className="mr-2">{isExpanded ? 'Read Less' : 'Read More'}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 group-hover:transform ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}