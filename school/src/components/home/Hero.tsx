import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://lh3.googleusercontent.com/p/AF1QipMh-LoytSJW2rmCyNrl9oJivm9NKBXSY8qPONTu=s1360-w1360-h1020)"
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome to Eklavya Model Residential School, Nawatand</h1>
          <p className="text-xl mb-8">National Education Society For Tribal Students. <br></br> राष्ट्रीय आदिवासी छात्र शिक्षा समिति <br></br> <br></br>
            (जनजातीय कार्य मंत्रालय के अंतर्गत एक स्वायत्त संस्थान), भारत सरकार <br></br>
(An Autonomous organisation under Ministry of Tribal Affairs), Government of India
          </p>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400">
              Apply Now
            </button>
            {/* <button className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900">
              Schedule a Visit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}