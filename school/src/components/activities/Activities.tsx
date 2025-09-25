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
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 border border-white/20">
              <Award className="w-8 h-8 text-purple-200" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-blue-200">
              Student Activities
            </h1>
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Fostering holistic development through diverse extracurricular programs that nurture talents and build character
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our diverse range of activities designed to nurture talents and foster personal growth
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-blue-900/80 opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-20" />
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-30">
                    <h3 className="text-2xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-200" />
                        <span className="text-sm text-purple-100">{activity.schedule}</span>
                      </div>
                      <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay updated with our exciting calendar of events and activities
              </p>
            </div>
            <div className="space-y-6">
              {calendar.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 md:p-8 flex items-start space-x-6 hover:bg-gray-100 transition-colors duration-300 border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex flex-col items-center justify-center text-white p-2">
                      <Calendar className="w-8 h-8 mb-1" />
                      <span className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{event.event}</h3>
                    <div className="flex items-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Activity Highlights</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Celebrating our achievements and milestones in student development
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-white">
                  <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">State Level Achievements</h3>
                  <p className="text-white/90">Multiple awards in sports and cultural competitions, recognizing excellence across disciplines</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-white">
                  <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Student Participation</h3>
                  <p className="text-white/90">100% student engagement in extracurricular activities, fostering inclusive growth</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-white">
                  <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Skill Development</h3>
                  <p className="text-white/90">Comprehensive programs focusing on personality development and life skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}