import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import school1 from '../../image/IMG-20250317-WA0016.jpg';
import school2 from '../../image/IMG-20250317-WA0018.jpg';
import school3 from '../../image/IMG-20250317-WA0010.jpg';
import school4 from '../../image/IMG-20250317-WA0013.jpg';
import school5 from '../../image/IMG-20250317-WA0014.jpg';
import school6 from '../../image/IMG-20250317-WA0017.jpg';
import school7 from '../../image/IMG-20250317-WA0019.jpg';
import school8 from '../../image/IMG-20250317-WA0020.jpg';
import school9 from '../../image/IMG-20250317-WA0021.jpg';
import school10 from '../../image/IMG-20250317-WA0022.jpg';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'sports', 'cultural', 'academic'];

  const images = [
    {
      url: school1,
      // category: 'sports',
      category: 'cultural',
      title: 'Independence Day'
    },
    {
      url: school2,
      category: 'cultural',
      title: 'Independence Day'
    },
    {
      url: school7,
      category: 'cultural',
      title: 'Independence Day'
    },
    {
      url: school3,
      category: 'cultural',
      title: 'Cultural Performance'
    },
    {
      url: school8,
      category: 'cultural',
      title: 'Cultural Performance'
    },
    {
      url: school9,
      category: 'cultural',
      title: 'Cultural Performance'
    },
    {
      url: school10,
      category: 'cultural',
      title: 'Cultural Performance'
    },
    {
      url: school6,
      category: 'academics',
      title: 'Examination'
    },
    {
      url: school4,
      category: 'academic',
      title: 'School Function'
    },
    {
      url: school5,
      category: 'academic',
      title: 'School Building'
    },
    // {
    //   url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    //   category: 'academic',
    //   title: 'Science Exhibition'
    // },
    // Add more images as needed
  ];

  const videos = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
      title: 'Annual Day Celebration',
      duration: '5:30',
      // url: 'https://www.youtube.com/embed/example1'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=800',
      title: 'Sports Competition',
      duration: '3:45',
      // url: 'https://www.youtube.com/embed/example2'
    },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6 border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-blue-200">
              Media Gallery
            </h1>
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Capturing moments and memories from our school activities and celebrating student achievements
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              <p className="text-lg text-gray-600 max-w-2xl text-center mb-10">
                Browse through our collection of memories captured during various school events and activities
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 rounded-full capitalize text-sm font-medium transition-all duration-300
                      ${selectedCategory === category 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-gray-100"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        Click to view larger
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Video Gallery</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Watch highlights from our school events and student performances
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-w-16 aspect-h-9 bg-gray-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">{video.title}</h3>
                      <div className="flex items-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{video.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 backdrop-blur-xl">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 bg-black/20 p-2 rounded-full backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 bg-black/20 p-3 rounded-full backdrop-blur-sm">
              <ChevronLeft size={28} />
            </button>
            <div className="relative max-w-7xl w-full mx-auto">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-[85vh] max-w-full w-auto mx-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 bg-black/20 p-3 rounded-full backdrop-blur-sm">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}