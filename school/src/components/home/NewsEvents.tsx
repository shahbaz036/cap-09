import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useSharedStore } from '../../lib/store';
import { format } from 'date-fns';

export default function NewsEvents() {
  const { events, news } = useSharedStore();

  const upcomingEvents = events
    .filter(event => new Date(`${event.date} ${event.time}`) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const latestNews = news
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Latest News</h2>
            <div className="space-y-6">
              {latestNews.map((article) => (
                <div key={article.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm text-blue-600 font-semibold">{article.category}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {article.author} • {format(new Date(article.publishDate), 'MMM d, yyyy')}
                    </span>
                    {article.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-start">
                  <div className="flex-shrink-0 w-16 text-center">
                    <Calendar className="mx-auto mb-1 text-blue-600" size={24} />
                    <span className="block text-lg font-bold text-blue-600">
                      {format(new Date(event.date), 'MMM d')}
                    </span>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{event.time}</p>
                    <p className="text-gray-500">{event.location}</p>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 text-blue-600 font-semibold flex items-center hover:text-blue-800">
              View All Events <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}