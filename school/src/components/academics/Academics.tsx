import React from 'react';
import { Book, Users, Calendar, FileText, GraduationCap, Library, BookOpen, Clock, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

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
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Nurturing young minds through comprehensive education and holistic development
          </p>
        </div>
      </div>

      {/* Daily Routine Sections */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Clock className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Daily Routine</h2>
            </div>

            {/* Summer Routine */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Summer Schedule (1st April 2025 to 15th November 2025 and March 2026)</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {summerRoutine.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
             <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-blue-700">
                  ** If breakfast is ready by 07:00 a.m., activities from S. No. 3 to 8 may be modified under.
                </p>
              </div>
            </div>
          </div>
        </div>

                        {/* Extra Summer Routine */}
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {extraSummerRoutine.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Winter Routine */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Winter Schedule (16th November 2025 to February 2026)</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {winterRoutine.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-blue-700">
                  ** If breakfast is ready by 07:00 a.m., activities from S. No. 3 to 8 may be modified under.
                </p>
              </div>
            </div>

                                            {/* Extra Winter Routine */}
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {extraWinterRoutine.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Holiday Routine */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Routine for Sundays and Holidays</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {holidayRoutine.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Vacation Schedule */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Vacation Calendar</h3>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vacationSchedule.map((region) => (
                        region.periods.map((period, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {index === 0 ? region.region : ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{period.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{period.from}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{period.to}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{period.duration}</td>
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
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Admission Process</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                The admission to EMRS is conducted through an online selection test for Class VI every year. 
                Students from Ashram schools, Z.P. Schools, and government-aided schools are eligible to apply. 
                Limited seats are also available for Classes VII to IX,  for which the advertisement is published in all leading news papers in state of Jharkhand. The Maximum intake of students in Class VI is 60 students (30 boys and 30 girls).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {admissionSteps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-900">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}