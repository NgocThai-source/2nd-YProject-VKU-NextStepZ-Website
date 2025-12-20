'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Company } from './companies-mock-data';
import { Post } from './community-mock-data';

// Types for saved items
export interface SavedCompany {
  id: string;
  company: Company;
  savedAt: string;
}

export interface SavedPost {
  id: string;
  post: Post;
  savedAt: string;
}

export interface SavedJob {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  description: string;
  salary?: [number, number];
  category?: string;
  savedAt: string;
}

interface SavedItemsContextType {
  // Saved Companies
  savedCompanies: SavedCompany[];
  addSavedCompany: (company: Company) => void;
  removeSavedCompany: (companyId: string) => void;
  isSavedCompany: (companyId: string) => boolean;

  // Saved Posts (from community)
  savedPosts: SavedPost[];
  addSavedPost: (post: Post) => void;
  removeSavedPost: (postId: string) => void;
  isSavedPost: (postId: string) => boolean;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedCompanies, setSavedCompanies] = useState<SavedCompany[]>([]);
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const companiesData = localStorage.getItem('savedCompanies');
        const postsData = localStorage.getItem('savedPosts');

        if (companiesData) setSavedCompanies(JSON.parse(companiesData));
        if (postsData) setSavedPosts(JSON.parse(postsData));
      } catch (error) {
        console.error('Error loading saved items from storage:', error);
      }
      setIsLoaded(true);
    };

    loadFromStorage();
  }, []);

  // Save companies to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('savedCompanies', JSON.stringify(savedCompanies));
    }
  }, [savedCompanies, isLoaded]);

  // Save posts to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    }
  }, [savedPosts, isLoaded]);

  // Company management
  const addSavedCompany = (company: Company) => {
    setSavedCompanies((prev) => {
      const exists = prev.some((c) => c.company.id === company.id);
      if (exists) return prev;
      return [
        {
          id: `company-${company.id}`,
          company,
          savedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  };

  const removeSavedCompany = (companyId: string) => {
    setSavedCompanies((prev) => prev.filter((c) => c.company.id !== companyId));
  };

  const isSavedCompany = (companyId: string) => {
    return savedCompanies.some((c) => c.company.id === companyId);
  };

  // Post management
  const addSavedPost = (post: Post) => {
    setSavedPosts((prev) => {
      const exists = prev.some((p) => p.post.id === post.id);
      if (exists) return prev;
      return [
        {
          id: `post-${post.id}`,
          post,
          savedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  };

  const removeSavedPost = (postId: string) => {
    setSavedPosts((prev) => prev.filter((p) => p.post.id !== postId));
  };

  const isSavedPost = (postId: string) => {
    return savedPosts.some((p) => p.post.id === postId);
  };

  const value: SavedItemsContextType = {
    savedCompanies,
    addSavedCompany,
    removeSavedCompany,
    isSavedCompany,
    savedPosts,
    addSavedPost,
    removeSavedPost,
    isSavedPost,
  };

  return (
    <SavedItemsContext.Provider value={value}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within SavedItemsProvider');
  }
  return context;
}
