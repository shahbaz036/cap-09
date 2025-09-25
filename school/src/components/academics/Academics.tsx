import React from 'react';
import { Book, Users, Calendar as CalendarDays, FileText, GraduationCap, Library, BookOpen, Clock, CheckCircle, Sparkles, Medal, Brain, Target, AlertCircle, Sun, Sunset, MapPin } from 'lucide-react';

export default function Academics() {
  const admissionSteps = [
    { 
      title: 'Eligibility',
      details: [
        'Studying in Class V in recognized schools',
        'Age should be between 10-12 years as of 1st April'
      ]
    },
    {
      title: 'Application Process',
      details: [
        'Online/Offline applications open in December-January',
        'Last date for submission is typically in February',
        'Required documents must be uploaded/attached'
      ]
    },
    {
      title: 'Selection Process',
      details: [
        'Entrance test conducted in March',
        'Test covers Mathematics, Science, and Language',
        'Merit-based selection'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What is the medium of instruction?',
      answer: 'The medium of instruction is English, with additional focus on Hindi and regional languages.'
    },
    {
      question: 'How many seats are available?',
      answer: 'Total 60 seats (30 boys and 30 girls) are available for Class VI admission.'
    }
  ];

  const summerRoutine = [
    { time: '05:00 a.m.', activity: 'Rouse' },
    { time: '05:30 to 06:15 a.m.', activity: 'Roll call - Morning Activity (PT/Yoga)' },
    { time: '06:15 to 07:00 a.m.', activity: 'Bath and Change' },
    { time: '07:00 to 07:15 a.m.', activity: 'Milk with eatables**' },
    { time: '07:15 to 07:35 a.m.', activity: 'Assembly' },
    { time: '07:35 to 08:15 a.m.', activity: 'I Period' },
    { time: '08:15 to 08:55 a.m.', activity: 'II Period' },
    { time: '08:55 to 09:30 a.m.', activity: 'Breakfast**' },
    { time: '09:30 to 10:10 a.m.', activity: 'III Period' },
    { time: '10:10 to 10:50 a.m.', activity: 'IV Period' },
    { time: '10:50 to 11:30 a.m.', activity: 'V Period' },
    { time: '11:30 to 11:40 a.m.', activity: 'Recess' },
    { time: '11:40 to 12:20 p.m.', activity: 'VI Period' },
    { time: '12:20 to 01:00 p.m.', activity: 'VII Period' },
    { time: '01:00 to 01:40 p.m.', activity: 'VIII Period' },
    { time: '01:40 to 03:00 p.m.', activity: 'Lunch & Rest' },
    { time: '03:00 to 04:15 p.m.', activity: 'Self-Study/Supervised study / Remedial Classes' },
    { time: '04:15 to 04:30 p.m.', activity: 'Reporting for games and Roll Call' },
    { time: '04:30 to 05:30 p.m.', activity: 'Games' },
    { time: '05:30 to 06:00 p.m.', activity: 'Bath & Change' },
    { time: '06:00 to 06:20 p.m.', activity: 'Evening Snacks' },
    { time: '06:20 to 08:00 p.m.', activity: 'Supervised study / Preparation for competitive exam (JEE/NEET)' },
    { time: '08:00 to 08:45 p.m.', activity: 'Dinner' },
    { time: '08:45 to 10:00 p.m.', activity: 'Own time / Counselling by House Master and night roll call' },
    { time: '10:30 p.m.', activity: 'Lights off' }
  ];

  const winterRoutine = [
    { time: '05:15 a.m.', activity: 'Rouse' },
    { time: '05:45 to 06:30 a.m.', activity: 'Roll call - Morning Activity (PT/Yoga)' },
    { time: '06:30 to 07:15 a.m.', activity: 'Bath and Change' },
    { time: '07:15 to 07:30 a.m.', activity: 'Milk with eatables**' },
    { time: '07:30 to 07:50 a.m.', activity: 'Assembly' },
    { time: '07:50 to 08:30 a.m.', activity: 'I Period' },
    { time: '08:30 to 09:10 a.m.', activity: 'II Period' },
    { time: '09:10 to 09:40 a.m.', activity: 'Breakfast**' },
    { time: '09:40 to 10:20 a.m.', activity: 'III Period' },
    { time: '10:20 to 11:00 a.m.', activity: 'IV Period' },
    { time: '11:00 to 11:40 a.m.', activity: 'V Period' },
    { time: '11:40 to 11:50 a.m.', activity: 'Recess' },
    { time: '11:50 to 12:30 p.m.', activity: 'VI Period' },
    { time: '12:30 to 01:05 p.m.', activity: 'VII Period' },
    { time: '01:05 to 01:40 p.m.', activity: 'VIII Period' },
    { time: '01:40 to 03:00 p.m.', activity: 'Lunch & Rest' },
    { time: '03:00 to 04:00 p.m.', activity: 'Self-Study/Supervised study / Remedial Classes' },
    { time: '04:00 to 04:15 p.m.', activity: 'Reporting for games and Roll Call' },
    { time: '04:15 to 05:15 p.m.', activity: 'Games' },
    { time: '05:15 to 05:45 p.m.', activity: 'Bath & Change' },
    { time: '05:45 to 06:00 p.m.', activity: 'Evening Snacks' },
    { time: '06:00 to 07:30 p.m.', activity: 'Supervised study/Preparation for competitive exam (JEE/NEET)' },
    { time: '07:30 to 08:10 p.m.', activity: 'Dinner' },
    { time: '08:10 to 10:00 p.m.', activity: 'Own time / Counselling by House Master and night roll call' },
    { time: '10:00 p.m.', activity: 'Lights off' }
  ];

  const holidayRoutine = [
    { time: '06:00 a.m.', activity: 'Rouse' },
    { time: '06:30 to 06:45 a.m.', activity: 'Roll Call' },
    { time: '06:45 to 07:00 a.m.', activity: 'Milk with eatables**' },
    { time: '07:00 to 08:00 a.m.', activity: 'Cleaning of dormitory and its surroundings / Landscaping / Kitchen Garden\nInspection by House Master / Hostel Warden' },
    { time: '08:00 to 09:00 a.m.', activity: 'Bath and Change' },
    { time: '09:00 to 09:30 a.m.', activity: 'Breakfast' },
    { time: '09:30 to 10:00 a.m.', activity: 'Own Time' },
    { time: '10:00 to 12:00 Noon', activity: 'Supervised Study / Preparation for Competitive Exam (JEE/NEET)' },
    { time: '12:00 to 01:00 p.m.', activity: 'Own Time' },
    { time: '01:00 to 01:45 p.m.', activity: 'Roll Call followed by Lunch' },
    { time: '01:45 to 04:00 p.m.', activity: 'Own Time' },
    { time: '04:00 to 04:15 p.m.', activity: 'Evening Snacks / Roll Call' },
    { time: '04:30 to 06:00 p.m.', activity: 'TV / Other Activities / Self Study / Own Time' },
    { time: '06:00 to 07:30 p.m.', activity: 'Self-Study / Preparation for Competitive Exam (JEE/NEET) / Own Time' },
    { time: '07:30 to 08:15 p.m.', activity: 'Roll Call followed by dinner' },
    { time: '08:15 to 10:00 p.m.', activity: 'Own Time / Counselling by House Master / Sharing Experiences / Self Study and Night Roll Call' },
    { time: '10:30 p.m.', activity: 'Lights off' }
  ];

  const extraSummerRoutine = [
    { time: '06:15 to 07:00 a.m.', activity: 'Bath and Change' },
    { time: '07:00 to 07:35 a.m.', activity: 'Breakfast' },
    { time: '07:35 to 07:55 a.m.', activity: 'Assembly' },
    { time: '07:55 to 08:35 a.m.', activity: 'I Period' },
    { time: '08:35 to 09:15 a.m.', activity: 'II Period' },
    { time: '09:15 to 09:30 a.m.', activity: 'Milk with eatables**' }
  ];

  const extraWinterRoutine = [
    { time: '06:30 to 07:10 a.m.', activity: 'Bath and Change' },
    { time: '07:10 to 07:45 a.m.', activity: 'Breakfast' },
    { time: '07:45 to 08:05 a.m.', activity: 'Assembly' },
    { time: '08:05 to 08:45 a.m.', activity: 'I Period' },
    { time: '08:45 to 09:25 a.m.', activity: 'II Period' },
    { time: '09:25 to 09:40 a.m.', activity: 'Milk with eatables**' }
  ];

  const vacationSchedule = [
    {
      region: 'Bihar, West Bengal, Odisha, Jharkhand',
      periods: [
        { type: 'Summer', from: '01.05.2025 (Tuesday)', to: '09.06.2025 (Monday)', duration: '40 Days' },
        { type: 'Autumn', from: '22.09.2025 (Monday)', to: '01.10.2025 (Wednesday)', duration: '10 Days' },
        { type: 'Winter', from: '18.10.2025 (Saturday)', to: '27.10.2025 (Monday)', duration: '10 Days' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-900 via-blue-800 to-blue-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/50 border border-blue-700/50 backdrop-blur-sm mb-6">
              <GraduationCap className="w-5 h-5 text-blue-300 mr-2" />
              <span className="text-sm text-blue-100">Excellence in Education</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Shaping
              <span className="relative inline-block px-2 ml-2">
                <span className="relative z-10 bg-gradient-to-r from-emerald-200 via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                  Futures
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 blur-xl"></span>
              </span>
              <br />
              Through Academic Excellence
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mb-10 leading-relaxed">
              Nurturing young minds through comprehensive education and holistic development, preparing them for tomorrow's challenges.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px]">
                <Users className="w-5 h-5 text-emerald-300" />
                <span className="text-sm md:text-base text-white">1:15 Teacher-Student Ratio</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px]">
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span className="text-sm md:text-base text-white">Modern Learning Approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Features */}
      <section className="py-20 md:py-28 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-4">
                <Brain className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Our Academic Approach</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Learning
                <span className="text-blue-600"> Experience</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We combine traditional values with modern teaching methodologies to provide a holistic educational experience that nurtures future leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-blue-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Curriculum</h3>
                <p className="text-gray-600 leading-relaxed">CBSE-aligned curriculum with focus on conceptual learning and practical applications.</p>
              </div>
              
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <Library className="w-7 h-7 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-emerald-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Learning Resources</h3>
                <p className="text-gray-600 leading-relaxed">Well-equipped libraries, laboratories, and digital learning facilities.</p>
              </div>
              
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-indigo-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Development</h3>
                <p className="text-gray-600 leading-relaxed">Focus on critical thinking, problem-solving, and creative abilities.</p>
              </div>
              
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                    <Target className="w-7 h-7 text-purple-600 group-hover:text-purple-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-purple-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Guidance</h3>
                <p className="text-gray-600 leading-relaxed">Expert counseling for future academic and career planning.</p>
              </div>
              
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-rose-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-rose-600 group-hover:text-rose-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-rose-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Assessment System</h3>
                <p className="text-gray-600 leading-relaxed">Continuous evaluation focusing on overall development.</p>
              </div>
              
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                    <Users className="w-7 h-7 text-amber-600 group-hover:text-amber-700 transition-colors" />
                  </div>
                  <div className="absolute w-14 h-14 rounded-xl bg-amber-600/10 blur-lg -z-10 group-hover:blur-xl transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Small Class Size</h3>
                <p className="text-gray-600 leading-relaxed">Personalized attention with optimal teacher-student ratio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Routine Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-inner">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Daily <span className="text-blue-600">Schedule</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our structured daily routine ensures a perfect balance of academics, physical activities, and personal development.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center space-x-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Summer Schedule</span>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <Sunset className="w-4 h-4 text-blue-500" />
                  <span>Winter Schedule</span>
                </div>
                <div className="flex items-center space-x-2 text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <CalendarDays className="w-4 h-4 text-emerald-500" />
                  <span>Holiday Schedule</span>
                </div>
              </div>
            </div>

            {/* Summer Routine */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-lg mb-3">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Summer Schedule</h3>
                <p className="text-sm text-gray-600 mt-1">1st April 2025 to 15th November 2025 and March 2026</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {summerRoutine.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`hover:bg-blue-50 transition-colors duration-150 ease-in-out ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
             <div className="mt-12 mb-16 max-w-3xl mx-auto">
              <div className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-5 shadow-sm">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium text-base mb-1.5">Note:</p>
                  <p className="text-blue-700 text-base leading-relaxed">
                    If breakfast is ready by 07:00 a.m., activities from S. No. 3 to 8 may be modified accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

                        {/* Extra Summer Routine */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                  <h4 className="text-lg font-medium text-gray-900">Additional Summer Activities</h4>
                  <p className="text-sm text-gray-600">Supplementary schedule for specific days</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-amber-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider bg-amber-50">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-amber-900 uppercase tracking-wider bg-amber-50">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {extraSummerRoutine.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`hover:bg-amber-50/50 transition-colors duration-150 ease-in-out ${
                            index % 2 === 0 ? 'bg-white/80' : 'bg-amber-50/30'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-amber-800">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Winter Routine */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-3">
                  <Sunset className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Winter Schedule</h3>
                <p className="text-sm text-gray-600 mt-1">16th November 2025 to February 2026</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {winterRoutine.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`hover:bg-blue-50/50 transition-colors duration-150 ease-in-out ${
                            index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-12 mb-16 max-w-3xl mx-auto">
              <div className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-5 shadow-sm">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium text-base mb-1.5">Note:</p>
                  <p className="text-blue-700 text-base leading-relaxed">
                    If breakfast is ready by 07:00 a.m., activities from S. No. 3 to 8 may be modified accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Winter Routine */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                  <h4 className="text-lg font-medium text-gray-900">Additional Winter Activities</h4>
                  <p className="text-sm text-gray-600">Supplementary schedule for specific days</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-indigo-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-900 uppercase tracking-wider bg-indigo-50">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-900 uppercase tracking-wider bg-indigo-50">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-100">
                      {extraWinterRoutine.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`hover:bg-indigo-50/50 transition-colors duration-150 ease-in-out ${
                            index % 2 === 0 ? 'bg-white/80' : 'bg-indigo-50/30'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-indigo-800">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Holiday Routine */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-lg mb-3">
                  <CalendarDays className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Holiday Schedule</h3>
                <p className="text-sm text-gray-600 mt-1">Routine for Sundays and Holidays</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-50 to-green-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {holidayRoutine.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`hover:bg-emerald-50/50 transition-colors duration-150 ease-in-out ${
                            index % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Vacation Schedule */}
            <div className="mb-12 max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-lg mb-4">
                  <CalendarDays className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">Academic Calendar</h3>
                <p className="text-lg text-gray-600">Comprehensive vacation schedule for all regions</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="w-full">
                  <table className="w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <th className="px-10 py-6 text-left text-base lg:text-lg font-semibold text-blue-800 uppercase tracking-wider w-1/5">Region</th>
                        <th className="px-10 py-6 text-left text-base lg:text-lg font-semibold text-blue-800 uppercase tracking-wider w-1/5">Type</th>
                        <th className="px-10 py-6 text-left text-base lg:text-lg font-semibold text-blue-800 uppercase tracking-wider w-1/5">From</th>
                        <th className="px-10 py-6 text-left text-base lg:text-lg font-semibold text-blue-800 uppercase tracking-wider w-1/5">To</th>
                        <th className="px-10 py-6 text-left text-base lg:text-lg font-semibold text-blue-800 uppercase tracking-wider w-1/5">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {vacationSchedule.map((region) => (
                        region.periods.map((period, index) => (
                          <tr 
                            key={index} 
                            className={`hover:bg-blue-50 transition-colors duration-150 ease-in-out ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            <td className="px-10 py-6 whitespace-nowrap">
                              {index === 0 && (
                                <div className="flex items-center space-x-3">
                                  <MapPin className="w-6 h-6 text-blue-600" />
                                  <span className="font-medium text-lg text-gray-900">{region.region}</span>
                                </div>
                              )}
                            </td>
                            <td className="px-10 py-6 whitespace-nowrap">
                              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-base font-medium bg-blue-100 text-blue-800">
                                {period.type}
                              </span>
                            </td>
                            <td className="px-10 py-6 whitespace-nowrap text-lg text-gray-900">{period.from}</td>
                            <td className="px-10 py-6 whitespace-nowrap text-lg text-gray-900">{period.to}</td>
                            <td className="px-10 py-6 whitespace-nowrap">
                              <span className="inline-flex items-center space-x-3 text-lg text-gray-900">
                                <Clock className="w-6 h-6 text-blue-600" />
                                <span>{period.duration}</span>
                              </span>
                            </td>
                          </tr>
                        ))
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      </section>
      
            {/* Admission Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Your Journey Begins Here
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Join our prestigious institution through a streamlined admission process
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 backdrop-blur-sm bg-white/90 border border-gray-100">
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p className="leading-relaxed">
                  The admission to EMRS is conducted through an online selection test for Class VI every year. 
                  Students from Ashram schools, Z.P. Schools, and government-aided schools are eligible to apply. 
                  Limited seats are also available for Classes VII to IX, for which the advertisement is published in all leading news papers in state of Jharkhand.
                </p>
                <div className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium">
                  Maximum intake: 60 students (30 boys & 30 girls) in Class VI
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {admissionSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] border border-gray-100"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 mr-3 text-sm">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-3 group/item">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover/item:text-green-600 transition-colors" />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-200 transform hover:-translate-y-0.5">
                <FileText className="w-5 h-5 mr-2" />
                Download Admission Brochure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}