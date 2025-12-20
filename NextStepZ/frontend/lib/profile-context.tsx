'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { API_URL } from './api';
import { useAuth } from './auth-context';

// Helper function to safely convert birthDate
const formatBirthDate = (birthDate: string | Date | null | undefined): string => {
  if (!birthDate) return '';
  try {
    // If already in YYYY-MM-DD format, return as-is
    if (typeof birthDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      return birthDate;
    }
    
    let date: Date;
    if (typeof birthDate === 'string') {
      date = new Date(birthDate);
    } else {
      date = birthDate;
    }
    // Format as YYYY-MM-DD to avoid timezone issues
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn('Failed to format birthDate:', birthDate, error);
    return '';
  }
};

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
  shareToken: string;
  isActive: boolean;
  viewCount: number;
  profile: {
    id: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
    objective?: string;
    socialLinks?: Array<{
      id: string;
      platform: string;
      url: string;
    }>;
    user?: {
      id: string;
      username: string;
      role: string;
    };
  };
}

export interface ProfileContextType {
  userProfile: UserProfile | null;
  employerProfile: EmployerProfileData | null;
  publicProfile: PublicProfile | null;
  isLoading: boolean;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateEmployerProfile: (profile: Partial<EmployerProfileData>) => void;
  loadProfileFromLocalStorage: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

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
  const [employerProfile, setEmployerProfile] = useState<EmployerProfileData | null>(null);
  const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to fetch and update profile from backend
  const fetchAndUpdateProfile = useCallback(async () => {
    if (!user) return;

    try {
      const token = getToken?.();
      if (!token) return;

      const userRes = await fetch(`${API_URL}/profiles/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userRes.ok) {
        const data = await userRes.json();
        console.log('Fetched profile data:', data);
        const formattedBirthDate = formatBirthDate(data.birthDate);
        setUserProfile({
          id: data.id,
          userId: data.userId,
          avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
          name: data.firstName && data.lastName 
            ? `${data.firstName} ${data.lastName}` 
            : data.username || user.username,
          email: data.email,
          bio: data.bio || '',
          phone: data.phone || '',
          birthDate: formattedBirthDate || formatBirthDate(user.birthDate),
          city: data.province || '',
          district: '',
          phoneNumber: data.phone || '',
          socialLinks: data.socialLinks || [],
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, [user, getToken]);

  // Fetch profiles from backend when user is logged in
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setUserProfile(null);
      setEmployerProfile(null);
      setPublicProfile(null);
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
          birthDate: formatBirthDate(user.birthDate),
          city: user.province || '',
          district: '',
          phoneNumber: user.phone || '',
          socialLinks: [],
        };
        setUserProfile(initialUserProfile);

        // Initialize employer profile only if user role is 'employer'
        if (user.role === 'employer') {
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
          const userRes = await fetch(`${API_URL}/profiles/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (userRes.ok) {
            const data = await userRes.json();
            const formattedBirthDate = formatBirthDate(data.birthDate);
            setUserProfile({
              id: data.id,
              userId: data.userId,
              avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
              name: data.firstName && data.lastName 
                ? `${data.firstName} ${data.lastName}` 
                : data.username || user.username,
              email: data.email,
              bio: data.bio || '',
              phone: data.phone || '',
              birthDate: formattedBirthDate || formatBirthDate(user.birthDate),
              city: data.province || '',
              district: '',
              phoneNumber: data.phone || '',
              socialLinks: data.socialLinks || [],
            });
          }
        } catch (err) {
          console.error('Failed to fetch user profile from backend:', err);
          // Keep the initial profile already set
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

        // Fetch public profile
        try {
          const publicRes = await fetch(`${API_URL}/profiles/public`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (publicRes.ok) {
            const publicData = await publicRes.json();
            setPublicProfile(publicData);
          }
        } catch (err) {
          console.error('Failed to fetch public profile from backend:', err);
          // Continue without public profile data
        }
      } catch (error) {
        console.error('Failed to load profiles:', error);
        setUserProfile({
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
          name: user.name || user.username,
          email: user.email,
          bio: '',
          phone: user.phone || '',
          birthDate: formatBirthDate(user.birthDate),
          city: user.province || '',
          district: '',
          socialLinks: [],
        });
        setEmployerProfile(DEFAULT_EMPLOYER_PROFILE);
        setPublicProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, [user, user?.id, getToken, fetchAndUpdateProfile]);

  // Listen for page visibility change and refetch when user returns
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user?.id) {
        console.log('Page became visible, refetching profile...');
        fetchAndUpdateProfile();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user?.id, fetchAndUpdateProfile]);

  // Refetch profile when user ID changes (navigation, login, etc)
  useEffect(() => {
    if (!user?.id) return;
    
    console.log('User ID changed, refetching profile for user:', user.id);
    const timer = setTimeout(() => {
      fetchAndUpdateProfile();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user?.id, fetchAndUpdateProfile]);

  const loadProfileFromLocalStorage = useCallback(() => {
    // This function is kept for compatibility but now loads from backend
    if (user) {
      fetchAndUpdateProfile();
    }
  }, [user, fetchAndUpdateProfile]);

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...profile } as UserProfile;
      return updated;
    });
  }, []);

  const updateEmployerProfile = useCallback((profile: Partial<EmployerProfileData>) => {
    setEmployerProfile((prev) => {
      const updated = { ...prev, ...profile } as EmployerProfileData;
      return updated;
    });
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        employerProfile,
        publicProfile,
        isLoading,
        updateUserProfile,
        updateEmployerProfile,
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
