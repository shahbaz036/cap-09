import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  displayName: string;
  email: string;
  timezone: string;
  avatar?: string;
}

interface Competitor {
  id: string;
  name: string;
  platform: 'youtube' | 'blog';
  profileUrl: string;
  metrics: {
    followers: number;
    engagement: number;
    posts: number;
  };
}

interface UserPreferences {
  contentType: string[];
  keywords: string[];
  competitors: Competitor[];
  onboardingCompleted: boolean;
  profile: UserProfile;
}

interface UserStore {
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  removeCompetitor: (competitorId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  displayName: 'John Doe',
  email: 'john@example.com',
  timezone: '(GMT-08:00) Pacific Time'
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      preferences: {
        contentType: [],
        keywords: [],
        competitors: [],
        onboardingCompleted: false,
        profile: defaultProfile,
      },
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      completeOnboarding: () =>
        set((state) => ({
          preferences: { ...state.preferences, onboardingCompleted: true },
        })),
      removeCompetitor: (competitorId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            competitors: state.preferences.competitors.filter(
              (competitor) => competitor.id !== competitorId
            ),
          },
        })),
      updateProfile: (profile) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            profile: { ...state.preferences.profile, ...profile },
          },
        })),
    }),
    {
      name: 'user-preferences',
    }
  )
);