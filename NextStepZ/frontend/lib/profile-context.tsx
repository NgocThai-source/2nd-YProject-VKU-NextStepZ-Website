'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface UserProfile {
  avatar: string;
  name: string;
  email: string;
  bio: string;
  phone: string;
  birthDate: string;
  city: string;
  district: string;
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  fullName?: string;
  address?: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface CareerProfileData {
  objective: string;
  experiences: WorkExperience[];
  skills: Skill[];
  education: Education[];
}

export interface ProfileContextType {
  userProfile: UserProfile | null;
  careerProfile: CareerProfileData | null;
  isLoading: boolean;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateCareerProfile: (profile: CareerProfileData) => void;
  loadProfileFromLocalStorage: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const DEFAULT_USER_PROFILE: UserProfile = {
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
  name: 'Nguyễn Văn A',
  email: 'user@example.com',
  bio: 'Frontend Developer | Creative Designer',
  phone: '+84 912 345 678',
  birthDate: '1999-01-15',
  city: 'Hà Nội',
  district: 'Hoàn Kiếm',
  socialLinks: [
    {
      id: '1',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/user',
    },
    {
      id: '2',
      platform: 'GitHub',
      url: 'https://github.com/user',
    },
  ],
};

const DEFAULT_CAREER_PROFILE: CareerProfileData = {
  objective: 'Tìm kiếm vị trí Frontend Developer có kinh nghiệm để phát triển kỹ năng kỹ thuật và đóng góp cho các dự án công nghệ hiện đại.',
  experiences: [
    {
      id: '1',
      position: 'Frontend Developer',
      company: 'Tech Company A',
      startDate: '2023-01',
      endDate: '',
      description: 'Phát triển ứng dụng web với React và TypeScript',
      isCurrent: true,
    },
    {
      id: '2',
      position: 'Junior Developer',
      company: 'Startup B',
      startDate: '2022-06',
      endDate: '2022-12',
      description: 'Xây dựng các tính năng UI/UX sử dụng Vue.js',
      isCurrent: false,
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'advanced' },
    { id: '2', name: 'TypeScript', level: 'intermediate' },
    { id: '3', name: 'Tailwind CSS', level: 'advanced' },
    { id: '4', name: 'Next.js', level: 'intermediate' },
  ],
  education: [
    {
      id: '1',
      school: 'Đại học Bách Khoa Hà Nội',
      degree: 'Cử nhân',
      field: 'Công nghệ thông tin',
      graduationYear: '2023',
    },
  ],
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [careerProfile, setCareerProfile] = useState<CareerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const storedUserProfile = localStorage.getItem('userProfile');
      const storedCareerProfile = localStorage.getItem('careerProfile');

      setUserProfile(
        storedUserProfile ? JSON.parse(storedUserProfile) : DEFAULT_USER_PROFILE
      );
      setCareerProfile(
        storedCareerProfile ? JSON.parse(storedCareerProfile) : DEFAULT_CAREER_PROFILE
      );
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error);
      setUserProfile(DEFAULT_USER_PROFILE);
      setCareerProfile(DEFAULT_CAREER_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadProfileFromLocalStorage = useCallback(() => {
    try {
      setIsLoading(true);
      const storedUserProfile = localStorage.getItem('userProfile');
      const storedCareerProfile = localStorage.getItem('careerProfile');

      setUserProfile(
        storedUserProfile ? JSON.parse(storedUserProfile) : DEFAULT_USER_PROFILE
      );
      setCareerProfile(
        storedCareerProfile ? JSON.parse(storedCareerProfile) : DEFAULT_CAREER_PROFILE
      );
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error);
      setUserProfile(DEFAULT_USER_PROFILE);
      setCareerProfile(DEFAULT_CAREER_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...profile } as UserProfile;
      try {
        localStorage.setItem('userProfile', JSON.stringify(updated));
        // Dispatch custom event for real-time updates across tabs
        window.dispatchEvent(
          new CustomEvent('userProfileUpdated', { detail: updated })
        );
      } catch (error) {
        console.error('Failed to save user profile:', error);
      }
      return updated;
    });
  }, []);

  const updateCareerProfile = useCallback((profile: CareerProfileData) => {
    setCareerProfile(profile);
    try {
      localStorage.setItem('careerProfile', JSON.stringify(profile));
      // Dispatch custom event for real-time updates across tabs
      window.dispatchEvent(
        new CustomEvent('careerProfileUpdated', { detail: profile })
      );
    } catch (error) {
      console.error('Failed to save career profile:', error);
    }
  }, []);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userProfile' && e.newValue) {
        try {
          setUserProfile(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse user profile from storage event:', error);
        }
      }
      if (e.key === 'careerProfile' && e.newValue) {
        try {
          setCareerProfile(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse career profile from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for custom events (same tab updates)
  useEffect(() => {
    const handleUserProfileUpdated = (e: Event) => {
      const event = e as CustomEvent;
      setUserProfile(event.detail);
    };

    const handleCareerProfileUpdated = (e: Event) => {
      const event = e as CustomEvent;
      setCareerProfile(event.detail);
    };

    window.addEventListener('userProfileUpdated', handleUserProfileUpdated);
    window.addEventListener('careerProfileUpdated', handleCareerProfileUpdated);

    return () => {
      window.removeEventListener('userProfileUpdated', handleUserProfileUpdated);
      window.removeEventListener('careerProfileUpdated', handleCareerProfileUpdated);
    };
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        careerProfile,
        isLoading,
        updateUserProfile,
        updateCareerProfile,
        loadProfileFromLocalStorage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
