'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { API_URL } from './api';
import { useAuth } from './auth-context';

export interface UserProfile {
  id?: string;
  userId?: string;
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
  phoneNumber?: string;
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
  id?: string;
  userId?: string;
  objective: string;
  experiences: WorkExperience[];
  skills: Skill[];
  education: Education[];
}

export interface JobPosting {
  id: string;
  title: string;
  location: string;
  level: string;
  postedAt: string;
  applications: number;
}

export interface EmployerProfileData {
  id?: string;
  userId?: string;
  companyName: string;
  industry: string;
  companySize: string;
  address: string;
  website: string;
  foundingYear: string;
  about: string;
  jobPostings: JobPosting[];
}

export interface PublicProfile {
  id: string;
  userId: string;
  profileId: string;
  shareToken: string;
  isActive: boolean;
  viewCount: number;
  sharedAt: string;
}

export interface ProfileContextType {
  userProfile: UserProfile | null;
  careerProfile: CareerProfileData | null;
  employerProfile: EmployerProfileData | null;
  publicProfile: PublicProfile | null;
  isLoading: boolean;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateCareerProfile: (profile: CareerProfileData) => void;
  updateEmployerProfile: (profile: Partial<EmployerProfileData>) => void;
  loadProfileFromLocalStorage: () => void;
  createOrGetPublicProfile: () => Promise<PublicProfile | null>;
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
  experiences: [],
  skills: [],
  education: [],
};

const DEFAULT_EMPLOYER_PROFILE: EmployerProfileData = {
  companyName: 'Tech Company Vietnam',
  industry: 'Công nghệ Thông tin',
  companySize: '50-200',
  address: '123 Đường Nguyễn Huệ, TP. Hồ Chí Minh',
  website: 'https://example.com',
  foundingYear: '2020',
  about: 'Công ty chúng tôi là một nhà cung cấp hàng đầu các giải pháp công nghệ thông tin.',
  jobPostings: [],
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, getToken } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [careerProfile, setCareerProfile] = useState<CareerProfileData | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfileData | null>(null);
  const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profiles from backend when user is logged in
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setUserProfile(null);
      setCareerProfile(null);
      setEmployerProfile(null);
      return;
    }

    const loadProfiles = async () => {
      try {
        setIsLoading(true);
        const token = getToken?.();

        // Initialize user profile immediately from auth context data
        const initialUserProfile: UserProfile = {
          avatar: user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
          name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.username,
          email: user.email,
          bio: '',
          phone: user.phone || '',
          birthDate: user.birthDate || '',
          city: user.province || '',
          district: '',
          phoneNumber: user.phone || '',
          socialLinks: [],
        };
        setUserProfile(initialUserProfile);

        // Initialize career/employer profile based on role
        if (user.role === 'user') {
          setCareerProfile(DEFAULT_CAREER_PROFILE);
        } else if (user.role === 'employer') {
          setEmployerProfile({
            companyName: user.companyName || user.firstName || user.name || '',
            industry: '',
            companySize: '',
            address: user.address || user.province || '',
            website: user.website || '',
            foundingYear: '',
            about: '',
            jobPostings: [],
          });
        }

        // Fetch detailed profiles from backend if token exists
        if (!token) {
          console.warn('No auth token, using local user data');
          setIsLoading(false);
          return;
        }

        // Fetch user profile from backend
        try {
          const userRes = await fetch(`${API_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (userRes.ok) {
            const data = await userRes.json();
            setUserProfile({
              id: data.id,
              userId: data.id,
              avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
              name: data.firstName && data.lastName 
                ? `${data.firstName} ${data.lastName}` 
                : data.username || user.username,
              email: data.email,
              bio: '',
              phone: data.phone || '',
              birthDate: data.birthDate 
                ? new Date(data.birthDate).toISOString().split('T')[0] 
                : '',
              city: data.province || '',
              district: '',
              phoneNumber: data.phone || '',
              socialLinks: [],
            });
          }
        } catch (err) {
          console.error('Failed to fetch user profile from backend:', err);
          // Keep the initial profile already set
        }

        // Fetch career profile if user role is 'user'
        if (user.role === 'user') {
          // Initialize with default for now - backend endpoints will be added later
          setCareerProfile(DEFAULT_CAREER_PROFILE);
        }

        // Fetch employer profile if user role is 'employer'
        if (user.role === 'employer') {
          // Initialize with default for now - backend endpoints will be added later
          setEmployerProfile({
            companyName: user.companyName || user.firstName || user.name || '',
            industry: '',
            companySize: '',
            address: user.address || user.province || '',
            website: user.website || '',
            foundingYear: '',
            about: '',
            jobPostings: [],
          });
        }
      } catch (error) {
        console.error('Failed to load profiles:', error);
        setUserProfile({
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
          name: user.name || user.username,
          email: user.email,
          bio: '',
          phone: user.phone || '',
          birthDate: user.birthDate || '',
          city: user.province || '',
          district: '',
          socialLinks: [],
        });
        setCareerProfile(DEFAULT_CAREER_PROFILE);
        setEmployerProfile(DEFAULT_EMPLOYER_PROFILE);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, [user, getToken]);

  const loadProfileFromLocalStorage = useCallback(() => {
    // This function is kept for compatibility but now loads from backend
    if (user) {
      setIsLoading(true);
    }
  }, [user]);

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...profile } as UserProfile;
      return updated;
    });
  }, []);

  const updateCareerProfile = useCallback((profile: CareerProfileData) => {
    setCareerProfile(profile);
  }, []);

  const updateEmployerProfile = useCallback((profile: Partial<EmployerProfileData>) => {
    setEmployerProfile((prev) => {
      const updated = { ...prev, ...profile } as EmployerProfileData;
      return updated;
    });
  }, []);

  const createOrGetPublicProfile = useCallback(async (): Promise<PublicProfile | null> => {
    try {
      const token = getToken?.();
      if (!token) {
        console.warn('No token available');
        return null;
      }

      const response = await fetch(`${API_URL}/profiles/public`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPublicProfile(data);
        return data;
      } else {
        console.error('Failed to create public profile');
        return null;
      }
    } catch (error) {
      console.error('Error creating public profile:', error);
      return null;
    }
  }, [getToken]);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        careerProfile,
        employerProfile,
        publicProfile,
        isLoading,
        updateUserProfile,
        updateCareerProfile,
        updateEmployerProfile,
        loadProfileFromLocalStorage,
        createOrGetPublicProfile,
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
