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

export interface ProfileContextType {
  userProfile: UserProfile | null;
  careerProfile: CareerProfileData | null;
  employerProfile: EmployerProfileData | null;
  isLoading: boolean;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateCareerProfile: (profile: CareerProfileData) => void;
  updateEmployerProfile: (profile: Partial<EmployerProfileData>) => void;
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

        // Fetch user profile
        try {
          const userRes = await fetch(`${API_URL}/profile/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (userRes.ok) {
            const data = await userRes.json();
            setUserProfile({
              id: data.id,
              userId: data.userId,
              avatar: data.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
              name: user.firstName && user.lastName 
                ? `${user.firstName || ''} ${user.lastName || ''}` 
                : user.username,
              email: user.email,
              bio: data.bio || '',
              phone: data.phoneNumber || user.phone || '',
              birthDate: data.birthDate 
                ? new Date(data.birthDate).toISOString().split('T')[0] 
                : (user.birthDate || ''),
              city: data.city || user.province || '',
              district: data.district || '',
              phoneNumber: data.phoneNumber || user.phone || '',
              socialLinks: data.socialLinks || [],
            });
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          setUserProfile({
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
            name: user.firstName && user.lastName 
              ? `${user.firstName || ''} ${user.lastName || ''}` 
              : user.username,
            email: user.email,
            bio: '',
            phone: user.phone || '',
            birthDate: user.birthDate || '',
            city: user.province || '',
            district: '',
            phoneNumber: user.phone || '',
            socialLinks: [],
          });
        }

        // Fetch career profile if user role is 'user'
        if (user.role === 'user') {
          try {
            const careerRes = await fetch(`${API_URL}/profile/career`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (careerRes.ok) {
              const data = await careerRes.json();
              setCareerProfile({
                id: data.id,
                userId: data.userId,
                objective: data.objective || '',
                experiences: data.experiences || [],
                skills: data.skills || [],
                education: data.education || [],
              });
            }
          } catch (err) {
            console.error('Failed to fetch career profile:', err);
            setCareerProfile(DEFAULT_CAREER_PROFILE);
          }
        }

        // Fetch employer profile if user role is 'employer'
        if (user.role === 'employer') {
          try {
            const employerRes = await fetch(`${API_URL}/profile/employer`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (employerRes.ok) {
              const data = await employerRes.json();
              setEmployerProfile({
                id: data.id,
                userId: data.userId,
                companyName: data.companyName || user.firstName || user.name || '',
                industry: data.industry || '',
                companySize: data.companySize || '',
                address: data.address || user.province || user.province || '',
                website: data.website || '',
                foundingYear: data.foundingYear || '',
                about: data.about || '',
                jobPostings: data.jobPostings || [],
              });
            }
          } catch (err) {
            console.error('Failed to fetch employer profile:', err);
            setEmployerProfile({
              companyName: user.firstName || user.name || '',
              industry: '',
              companySize: '',
              address: user.province || '',
              website: '',
              foundingYear: '',
              about: '',
              jobPostings: [],
            });
          }
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

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        careerProfile,
        employerProfile,
        isLoading,
        updateUserProfile,
        updateCareerProfile,
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
