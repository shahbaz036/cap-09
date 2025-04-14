import React from 'react';
import { Calendar, Award, Users, BookOpen } from 'lucide-react';

export default function Activities() {
  const activities = [
    {
      title: 'Sports & Athletics',
      description: 'Comprehensive sports program including cricket, football, kabaddi, and athletics',
      schedule: 'Daily 4-6 PM',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Cultural Activities',
      description: 'Traditional dance, music, and art programs celebrating tribal heritage',
      schedule: 'Tuesday & Thursday 3-5 PM',
      image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Academic Clubs',
      description: 'Science, Mathematics, and Literature clubs for enhanced learning',
      schedule: 'Wednesday & Friday 3-5 PM',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const calendar = [
    {
      date: '2024-03-15',
      event: 'Annual Sports Day',
      type: 'Sports'
    },
    {
      date: '2024-03-20',
      event: 'Cultural Festival',
      type: 'Cultural'
    },
    {
      date: '2024-03-25',
      event: 'Science Exhibition',
      type: 'Academic'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Student Activities</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Fostering holistic development through diverse extracurricular programs
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <p className="text-sm text-gray-500">
                    <Calendar className="inline-block w-4 h-4 mr-2" />
                    {activity.schedule}
                  </p>
                  <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="max-w-4xl mx-auto">
            {calendar.map((event, index) => (
              <div key={index} className="mb-6 bg-gray-50 rounded-lg p-6 flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 text-center">
                  <Calendar className="mx-auto mb-1 text-blue-600" />
                  <span className="block text-sm font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{event.event}</h3>
                  <p className="text-gray-600">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Activity Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">State Level Achievements</h3>
              <p className="text-gray-600">Multiple awards in sports and cultural competitions</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Participation</h3>
              <p className="text-gray-600">100% student engagement in extracurricular activities</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
              <p className="text-gray-600">Focused programs for personality development</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}