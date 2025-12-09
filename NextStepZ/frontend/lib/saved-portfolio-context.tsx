'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface SavedPortfolio {
  id: string;
  name: string;
  title: string;
  headline: string;
  summary: string;
  photoUrl?: string;
  contactJson?: {
    email?: string;
    phone?: string;
    city?: string;
    district?: string;
    facebook?: string;
    github?: string;
  };
  skills?: {
    selected: Array<{
      id: string;
      name: string;
      level: string;
    }>;
  };
  experience?: {
    items: Array<{
      id: string;
      title: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
      isCurrent: boolean;
    }>;
  };
  education?: {
    items: Array<{
      id: string;
      school: string;
      degree: string;
      field: string;
      graduationYear: string;
    }>;
  };
  projects?: {
    items: Array<{
      id: string;
      title: string;
      description: string;
      url?: string;
      imageUrl?: string;
    }>;
  };
  selectedTemplate: number;
  savedAt: string;
  updatedAt: string;
}

export interface SavedPortfolioContextType {
  savedPortfolios: SavedPortfolio[];
  isLoading: boolean;
  savePortfolio: (portfolio: Omit<SavedPortfolio, 'id' | 'savedAt' | 'updatedAt'> & { id?: string }) => SavedPortfolio;
  getSavedPortfolios: () => SavedPortfolio[];
  getSavedPortfolioById: (id: string) => SavedPortfolio | null;
  deletePortfolio: (id: string) => void;
  updatePortfolio: (id: string, portfolio: Partial<SavedPortfolio>) => void;
}

const SavedPortfolioContext = createContext<SavedPortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'savedPortfolios';

export function SavedPortfolioProvider({ children }: { children: React.ReactNode }) {
  const [savedPortfolios, setSavedPortfolios] = useState<SavedPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      let portfolios: SavedPortfolio[] = [];

      if (stored) {
        portfolios = JSON.parse(stored);
        
        // Migrate old empty "hello" portfolio to new one with full data
        const helloPortfolio = portfolios.find(p => p.name === 'hello');
        if (helloPortfolio && (!helloPortfolio.skills?.selected || helloPortfolio.skills.selected.length === 0)) {
          // Update the old hello portfolio with full data
          const updatedHello: SavedPortfolio = {
            ...helloPortfolio,
            name: 'Hello Web Studio',
            title: 'Senior Frontend Developer',
            headline: 'Chuyên gia React & Next.js với 5+ năm kinh nghiệm xây dựng ứng dụng web hiệu suất cao.',
            summary: 'Tôi là một Senior Frontend Developer với kinh nghiệm sâu sắc trong việc xây dựng các ứng dụng web hiện đại, responsive và hiệu quả. Đam mê tìm hiểu công nghệ mới, tối ưu hiệu suất và tạo ra trải nghiệm người dùng tuyệt vời. Đã làm việc với các công ty công nghệ hàng đầu và startup nổi bật.',
            contactJson: {
              ...helloPortfolio.contactJson,
              email: 'hello@webstudio.com',
              phone: '+84 912 345 678',
              facebook: 'facebook.com/hellodev',
              github: 'github.com/hellodev',
            },
            skills: {
              selected: [
                { id: 'skill-1', name: 'React', level: 'advanced' },
                { id: 'skill-2', name: 'TypeScript', level: 'advanced' },
                { id: 'skill-3', name: 'Next.js', level: 'advanced' },
                { id: 'skill-4', name: 'Tailwind CSS', level: 'advanced' },
                { id: 'skill-5', name: 'JavaScript', level: 'advanced' },
                { id: 'skill-6', name: 'Node.js', level: 'intermediate' },
                { id: 'skill-7', name: 'Redux', level: 'advanced' },
                { id: 'skill-8', name: 'CSS/SCSS', level: 'advanced' },
              ],
            },
            experience: {
              items: [
                {
                  id: 'exp-1',
                  title: 'Senior Frontend Developer',
                  company: 'Tech Innovations Vietnam',
                  startDate: '2022-01-15',
                  description: 'Dẫn dắt đội ngũ 5 frontend developers, xây dựng các ứng dụng enterprise-scale bằng React và Next.js. Tối ưu performance, cải thiện Lighthouse score từ 45 lên 95.',
                  isCurrent: true,
                },
                {
                  id: 'exp-2',
                  title: 'Middle Frontend Developer',
                  company: 'FinTech Solutions Asia',
                  startDate: '2020-06-01',
                  endDate: '2021-12-31',
                  description: 'Phát triển các tính năng dashboard thanh toán, quản lý ví điện tử. Làm việc với TypeScript, Redux, và API integration.',
                  isCurrent: false,
                },
                {
                  id: 'exp-3',
                  title: 'Junior Frontend Developer',
                  company: 'Creative Studio',
                  startDate: '2019-03-01',
                  endDate: '2020-05-31',
                  description: 'Xây dựng responsive UI components, làm việc với Figma design team. Học hỏi best practices về code quality và collaboration.',
                  isCurrent: false,
                },
              ],
            },
            education: {
              items: [
                {
                  id: 'edu-1',
                  school: 'Đại học Bách Khoa TP. Hồ Chí Minh',
                  degree: 'Cử nhân',
                  field: 'Công nghệ Thông tin',
                  graduationYear: '2019',
                },
                {
                  id: 'edu-2',
                  school: 'Coursera',
                  degree: 'Chứng chỉ',
                  field: 'Advanced React Patterns',
                  graduationYear: '2021',
                },
                {
                  id: 'edu-3',
                  school: 'Udemy',
                  degree: 'Chứng chỉ',
                  field: 'Next.js & Performance Optimization',
                  graduationYear: '2023',
                },
              ],
            },
            projects: {
              items: [
                {
                  id: 'proj-1',
                  title: 'E-commerce Platform',
                  description: 'Xây dựng nền tảng thương mại điện tử với React, Next.js, Redux. Support 100k+ users, xử lý 1000+ requests/second.',
                  url: 'https://ecommerce-demo.com',
                  imageUrl: '',
                },
                {
                  id: 'proj-2',
                  title: 'Real-time Dashboard',
                  description: 'Tạo dashboard analytics real-time với WebSocket, Chart.js. Hiển thị dữ liệu từ 50+ API endpoints.',
                  url: 'https://dashboard-demo.com',
                  imageUrl: '',
                },
                {
                  id: 'proj-3',
                  title: 'Mobile-first PWA',
                  description: 'Phát triển Progressive Web App với offline capability, push notifications. Lighthouse score 95+.',
                  url: 'https://pwa-demo.com',
                  imageUrl: '',
                },
              ],
            },
            updatedAt: new Date().toISOString(),
          };
          
          portfolios = portfolios.map(p => p.name === 'hello' ? updatedHello : p);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
        }
        
        setSavedPortfolios(portfolios);
      } else {
        // Initialize with demo portfolio "Hello Web Studio"
        const demoPortfolio: SavedPortfolio = {
          id: 'portfolio-hello-demo',
          name: 'Hello Web Studio',
          title: 'Senior Frontend Developer',
          headline: 'Chuyên gia React & Next.js với 5+ năm kinh nghiệm xây dựng ứng dụng web hiệu suất cao.',
          summary: 'Tôi là một Senior Frontend Developer với kinh nghiệm sâu sắc trong việc xây dựng các ứng dụng web hiện đại, responsive và hiệu quả. Đam mê tìm hiểu công nghệ mới, tối ưu hiệu suất và tạo ra trải nghiệm người dùng tuyệt vời. Đã làm việc với các công ty công nghệ hàng đầu và startup nổi bật.',
          photoUrl: '',
          contactJson: {
            email: 'hello@webstudio.com',
            phone: '+84 912 345 678',
            city: 'TP. Hồ Chí Minh',
            district: 'Quận 1',
            facebook: 'facebook.com/hellodev',
            github: 'github.com/hellodev',
          },
          skills: {
            selected: [
              { id: 'skill-1', name: 'React', level: 'advanced' },
              { id: 'skill-2', name: 'TypeScript', level: 'advanced' },
              { id: 'skill-3', name: 'Next.js', level: 'advanced' },
              { id: 'skill-4', name: 'Tailwind CSS', level: 'advanced' },
              { id: 'skill-5', name: 'JavaScript', level: 'advanced' },
              { id: 'skill-6', name: 'Node.js', level: 'intermediate' },
              { id: 'skill-7', name: 'Redux', level: 'advanced' },
              { id: 'skill-8', name: 'CSS/SCSS', level: 'advanced' },
            ],
          },
          experience: {
            items: [
              {
                id: 'exp-1',
                title: 'Senior Frontend Developer',
                company: 'Tech Innovations Vietnam',
                startDate: '2022-01-15',
                description: 'Dẫn dắt đội ngũ 5 frontend developers, xây dựng các ứng dụng enterprise-scale bằng React và Next.js. Tối ưu performance, cải thiện Lighthouse score từ 45 lên 95.',
                isCurrent: true,
              },
              {
                id: 'exp-2',
                title: 'Middle Frontend Developer',
                company: 'FinTech Solutions Asia',
                startDate: '2020-06-01',
                endDate: '2021-12-31',
                description: 'Phát triển các tính năng dashboard thanh toán, quản lý ví điện tử. Làm việc với TypeScript, Redux, và API integration.',
                isCurrent: false,
              },
              {
                id: 'exp-3',
                title: 'Junior Frontend Developer',
                company: 'Creative Studio',
                startDate: '2019-03-01',
                endDate: '2020-05-31',
                description: 'Xây dựng responsive UI components, làm việc với Figma design team. Học hỏi best practices về code quality và collaboration.',
                isCurrent: false,
              },
            ],
          },
          education: {
            items: [
              {
                id: 'edu-1',
                school: 'Đại học Bách Khoa TP. Hồ Chí Minh',
                degree: 'Cử nhân',
                field: 'Công nghệ Thông tin',
                graduationYear: '2019',
              },
              {
                id: 'edu-2',
                school: 'Coursera',
                degree: 'Chứng chỉ',
                field: 'Advanced React Patterns',
                graduationYear: '2021',
              },
              {
                id: 'edu-3',
                school: 'Udemy',
                degree: 'Chứng chỉ',
                field: 'Next.js & Performance Optimization',
                graduationYear: '2023',
              },
            ],
          },
          projects: {
            items: [
              {
                id: 'proj-1',
                title: 'E-commerce Platform',
                description: 'Xây dựng nền tảng thương mại điện tử với React, Next.js, Redux. Support 100k+ users, xử lý 1000+ requests/second.',
                url: 'https://ecommerce-demo.com',
                imageUrl: '',
              },
              {
                id: 'proj-2',
                title: 'Real-time Dashboard',
                description: 'Tạo dashboard analytics real-time với WebSocket, Chart.js. Hiển thị dữ liệu từ 50+ API endpoints.',
                url: 'https://dashboard-demo.com',
                imageUrl: '',
              },
              {
                id: 'proj-3',
                title: 'Mobile-first PWA',
                description: 'Phát triển Progressive Web App với offline capability, push notifications. Lighthouse score 95+.',
                url: 'https://pwa-demo.com',
                imageUrl: '',
              },
            ],
          },
          selectedTemplate: 1,
          savedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setSavedPortfolios([demoPortfolio]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([demoPortfolio]));
      }
    } catch (error) {
      console.error('Failed to load saved portfolios:', error);
      setSavedPortfolios([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePortfolio = useCallback(
    (
      portfolio: Omit<SavedPortfolio, 'id' | 'savedAt' | 'updatedAt'> & { id?: string }
    ): SavedPortfolio => {
      const now = new Date().toISOString();
      const id = portfolio.id || `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newPortfolio: SavedPortfolio = {
        ...portfolio,
        id,
        savedAt: portfolio.id ? savedPortfolios.find(p => p.id === portfolio.id)?.savedAt || now : now,
        updatedAt: now,
      };

      setSavedPortfolios((prev) => {
        const existing = prev.findIndex(p => p.id === id);
        let updated: SavedPortfolio[];

        if (existing >= 0) {
          updated = [...prev];
          updated[existing] = newPortfolio;
        } else {
          updated = [...prev, newPortfolio];
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(
            new CustomEvent('savedPortfoliosUpdated', { detail: updated })
          );
        } catch (error) {
          console.error('Failed to save portfolios to localStorage:', error);
        }

        return updated;
      });

      return newPortfolio;
    },
    [savedPortfolios]
  );

  const getSavedPortfolios = useCallback(() => {
    return savedPortfolios;
  }, [savedPortfolios]);

  const getSavedPortfolioById = useCallback(
    (id: string) => {
      return savedPortfolios.find(p => p.id === id) || null;
    },
    [savedPortfolios]
  );

  const deletePortfolio = useCallback((id: string) => {
    setSavedPortfolios((prev) => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(
          new CustomEvent('savedPortfoliosUpdated', { detail: updated })
        );
      } catch (error) {
        console.error('Failed to delete portfolio:', error);
      }
      return updated;
    });
  }, []);

  const updatePortfolio = useCallback(
    (id: string, portfolio: Partial<SavedPortfolio>) => {
      setSavedPortfolios((prev) => {
        const updated = prev.map(p =>
          p.id === id
            ? {
                ...p,
                ...portfolio,
                id: p.id, // Preserve original ID
                savedAt: p.savedAt, // Preserve original savedAt
                updatedAt: new Date().toISOString(),
              }
            : p
        );
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(
            new CustomEvent('savedPortfoliosUpdated', { detail: updated })
          );
        } catch (error) {
          console.error('Failed to update portfolio:', error);
        }
        return updated;
      });
    },
    []
  );

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSavedPortfolios(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse saved portfolios from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SavedPortfolioContext.Provider
      value={{
        savedPortfolios,
        isLoading,
        savePortfolio,
        getSavedPortfolios,
        getSavedPortfolioById,
        deletePortfolio,
        updatePortfolio,
      }}
    >
      {children}
    </SavedPortfolioContext.Provider>
  );
}

export function useSavedPortfolio() {
  const context = useContext(SavedPortfolioContext);
  if (context === undefined) {
    throw new Error('useSavedPortfolio must be used within SavedPortfolioProvider');
  }
  return context;
}
