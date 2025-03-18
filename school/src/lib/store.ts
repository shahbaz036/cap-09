import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  publishDate: string;
  author: string;
  featured: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department?: string;
  notes?: string;
}

interface SharedState {
  events: Event[];
  setEvents: (events: Event[]) => void;
  news: NewsArticle[];
  setNews: (news: NewsArticle[]) => void;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        if (email === 'emrs.tundi.jh@gmail.com' && password === 'eklavya') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useSharedStore = create<SharedState>()(
  persist(
    (set) => ({
      events: [
        {
          id: '1',
          title: 'Spring Concert',
          date: '2024-03-15',
          time: '19:00',
          location: 'Main Auditorium',
          description: 'Annual spring concert featuring student performances'
        },
        {
          id: '2',
          title: 'Parent-Teacher Conference',
          date: '2024-03-20',
          time: '13:00',
          location: 'Multiple Classrooms',
          description: 'Semi-annual parent-teacher conference'
        }
      ],
      setEvents: (events) => set({ events }),
      news: [
        {
          id: '1',
          title: 'Students Win Regional Science Competition',
          category: 'Academic Excellence',
          content: 'Our talented students showcased their innovative projects at the Regional Science Competition, bringing home top honors in multiple categories.',
          publishDate: '2024-03-15',
          author: 'Jane Smith',
          featured: true
        },
        {
          id: '2',
          title: 'New STEM Lab Opening Ceremony',
          category: 'School Facilities',
          content: 'We are excited to announce the opening of our state-of-the-art STEM laboratory, equipped with the latest technology and learning tools.',
          publishDate: '2024-03-10',
          author: 'John Doe',
          featured: false
        }
      ],
      setNews: (news) => set({ news }),
      contacts: [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@school.edu',
          phone: '(555) 123-4567',
          address: '123 Education Lane, City, ST 12345',
          department: 'Administration',
          notes: 'Principal'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@school.edu',
          phone: '(555) 234-5678',
          address: '456 Learning Ave, City, ST 12345',
          department: 'Faculty',
          notes: 'Science Department Head'
        }
      ],
      setContacts: (contacts) => set({ contacts })
    }),
    {
      name: 'shared-storage'
    }
  )
);