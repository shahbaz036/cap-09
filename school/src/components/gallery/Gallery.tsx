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
      <div className="bg-blue-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Media Gallery</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
            Capturing moments and memories from our school activities
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  mx-2 px-4 py-2 rounded-md capitalize
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Video Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="relative group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <button className="absolute left-4 text-white hover:text-gray-300">
            <ChevronLeft size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button className="absolute right-4 text-white hover:text-gray-300">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}