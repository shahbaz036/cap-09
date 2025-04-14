import React from 'react';

export default function Hero() {
  return (
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
            National Education Society For Tribal Students
            <br className="hidden md:block" />
            राष्ट्रीय आदिवासी छात्र शिक्षा समिति
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
  );
}