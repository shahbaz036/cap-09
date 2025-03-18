import React, { useState } from 'react';
import { Newspaper, Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useSharedStore } from '../../lib/store';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  publishDate: string;
  author: string;
  featured: boolean;
}

// Zod validation schema for news article form
const newsArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  publishDate: z.string().min(1, 'Publish Date is required'),
  author: z.string().min(1, 'Author is required'),
  featured: z.boolean(),
});

type NewsFormData = z.infer<typeof newsArticleSchema>;

export default function NewsManagement() {
  const { news, setNews } = useSharedStore();
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Using react-hook-form to manage form state
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsArticleSchema),
  });

  const handleAddArticle = () => {
    setIsAddingArticle(true);
    reset({
      title: '',
      category: '',
      content: '',
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      author: '',
      featured: false,
    });
  };

  const handleEditArticle = (article: NewsArticle) => {
    setEditingArticleId(article.id);
    reset({
      title: article.title,
      category: article.category,
      content: article.content,
      publishDate: article.publishDate,
      author: article.author,
      featured: article.featured,
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setNews(news.filter(article => article.id !== id));
    }
  };

  const onSubmit = (data: NewsFormData) => {
    if (editingArticleId) {
      setNews(news.map(article =>
        article.id === editingArticleId ? { ...data, id: editingArticleId } : article
      ));
      setEditingArticleId(null);
    } else {
      const newArticle = { ...data, id: Date.now().toString() };
      setNews([...news, newArticle]);
      setIsAddingArticle(false);
    }
    reset({
      title: '',
      category: '',
      content: '',
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      author: '',
      featured: false,
    });
  };

  const handleCancel = () => {
    setIsAddingArticle(false);
    setEditingArticleId(null);
    reset({
      title: '',
      category: '',
      content: '',
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      author: '',
      featured: false,
    });
  };

  const NewsForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="mt-1"
                placeholder="Enter article title"
                required
              />
            )}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="category"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Academic Excellence">Academic Excellence</option>
                <option value="School Events">School Events</option>
                <option value="Sports">Sports</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="School Facilities">School Facilities</option>
                <option value="Community Outreach">Community Outreach</option>
              </select>
            )}
          />
          {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
        </div>

        <Controller
          name="author"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Author"
              className="mt-1"
              placeholder="Enter author's name"
              required
            />
          )}
        />
        {errors.author && <p className="text-sm text-red-600">{errors.author.message}</p>}

        <Controller
          name="publishDate"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Publish Date"
              type="date"
              className="mt-1"
              required
            />
          )}
        />
        {errors.publishDate && <p className="text-sm text-red-600">{errors.publishDate.message}</p>}

        <div className="flex items-center">
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            )}
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">Featured Article</label>
        </div>
      </div>

      <div className="mt-4">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              label="Content"
              required
              rows={6}
              placeholder="Enter article content"
            />
          )}
        />
        {errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {editingArticleId ? 'Update Article' : 'Publish Article'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
        {!isAddingArticle && !editingArticleId && (
          <button
            onClick={handleAddArticle}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Add New Article
          </button>
        )}
      </div>

      {(isAddingArticle || editingArticleId) && <NewsForm />}

      <div className="grid gap-4">
        {news.map(article => (
          <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Newspaper className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    {article.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {article.category} | By {article.author} | Published {format(new Date(article.publishDate), 'PPP')}
                  </p>
                  <p className="text-gray-600 mt-2">{article.content}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditArticle(article)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
