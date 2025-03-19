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
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Latest News</h2>
            <div className="space-y-4 md:space-y-6">
              {latestNews.map((article) => (
                <div key={article.id} className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm text-blue-600 font-semibold">{article.category}</span>
                  <h3 className="text-lg md:text-xl font-semibold mt-2 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4 text-base">{article.content}</p>
                  <div className="flex flex-wrap justify-between items-center gap-2">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0 w-16 text-center">
                      <Calendar className="mx-auto mb-1 text-blue-600" size={24} />
                      <span className="block text-lg font-bold text-blue-600">
                        {format(new Date(event.date), 'MMM d')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">{event.title}</h3>
                      <p className="text-gray-600">{event.time}</p>
                      <p className="text-gray-500">{event.location}</p>
                      <p className="text-gray-600 mt-2 text-base">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 text-blue-600 font-semibold flex items-center hover:text-blue-800 min-w-[44px] min-h-[44px]">
              View All Events <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}