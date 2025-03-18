import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSharedStore } from '../../lib/store';
import { Input } from '../shared/Input';
import { TextArea } from '../shared/TextArea';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

// Validation Schema with Zod
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  description: z.string().min(1, 'Description is required'),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventsManagement() {
  const { events, setEvents } = useSharedStore();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const handleAddEvent = () => {
    setIsAddingEvent(true);
    reset({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    reset({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const onSubmit = (data: EventFormData) => {
    if (editingEventId) {
      setEvents(
        events.map((event) =>
          event.id === editingEventId ? { ...data, id: editingEventId } : event
        )
      );
      setEditingEventId(null);
    } else {
      setEvents([...events, { ...data, id: Date.now().toString() }]);
    }
    setIsAddingEvent(false);
  };

  const handleCancel = () => {
    setIsAddingEvent(false);
    setEditingEventId(null);
    reset({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    });
  };

  const EventForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="mt-1"
                type="text"
                placeholder="Event Title"
              />
            )}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="mt-1"
                type="text"
                placeholder="Event Location"
              />
            )}
          />
          {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input {...field} className="mt-1" type="date" />
            )}
          />
          {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <Input {...field} className="mt-1" type="time" />
            )}
          />
          {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea {...field} rows={3} className="mt-1" placeholder="Event Description" />
            )}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
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
          {editingEventId ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
        {!isAddingEvent && !editingEventId && (
          <button
            onClick={handleAddEvent}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Add New Event
          </button>
        )}
      </div>

      {(isAddingEvent || editingEventId) && <EventForm />}

      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">
                  {format(new Date(`${event.date} ${event.time}`), 'PPpp')}
                </p>
                <p className="text-gray-500">{event.location}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditEvent(event)}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
