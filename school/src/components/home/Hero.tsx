import React from 'react';

export default function Hero() {
  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://lh3.googleusercontent.com/p/AF1QipMh-LoytSJW2rmCyNrl9oJivm9NKBXSY8qPONTu=s1360-w1360-h1020)"
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
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
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="min-w-[44px] min-h-[44px] bg-yellow-500 text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 text-base md:text-lg transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}