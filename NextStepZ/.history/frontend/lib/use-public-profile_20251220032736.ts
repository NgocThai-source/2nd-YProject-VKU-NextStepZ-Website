import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './auth-context';
import { API_URL } from './api';

interface PublicProfile {
  id: string;
  userId: string;
  profileId: string;
  shareToken: string;
  isActive: boolean;
  viewCount: number;
  sharedAt: string;
}

export function usePublicProfile() {
  const { user, getToken } = useAuth();
  const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch/create public profile when user logs in
  useEffect(() => {
    if (!user || !getToken?.()) {
      setPublicProfile(null);
      setShareLink(null);
      return;
    }

    const fetchOrCreatePublicProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = getToken?.();

        // Try to get or create public profile
        const response = await fetch(`${API_URL}/profiles/public`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch public profile');
        }

        const data: PublicProfile = await response.json();
        setPublicProfile(data);

        // Create share link
        const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/public-profile/${data.shareToken}`;
        setShareLink(link);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching public profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrCreatePublicProfile();
  }, [user, getToken]);

  // Copy share link to clipboard
  const copyShareLink = useCallback(() => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      return true;
    }
    return false;
  }, [shareLink]);

  // Get share link by user ID (public endpoint)
  const getPublicProfileByUserId = useCallback(async (userId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/profiles/public/user/${userId}`
      );

      if (!response.ok) {
        throw new Error('Public profile not found');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching public profile by user ID:', err);
      throw err;
    }
  }, []);

  // Get public profile by share token (public endpoint)
  const getPublicProfileByToken = useCallback(async (shareToken: string) => {
    try {
      const response = await fetch(
        `${API_URL}/profiles/public/share/${shareToken}`
      );

      if (!response.ok) {
        throw new Error('Public profile not found');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching public profile by token:', err);
      throw err;
    }
  }, []);

  // Toggle public profile visibility
  const togglePublicProfile = useCallback(async (isActive: boolean) => {
    try {
      const token = getToken?.();
      const response = await fetch(`${API_URL}/profiles/public/toggle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle public profile');
      }

      const data: PublicProfile = await response.json();
      setPublicProfile(data);
      return data;
    } catch (err) {
      console.error('Error toggling public profile:', err);
      throw err;
    }
  }, [getToken]);

  return {
    publicProfile,
    shareLink,
    isLoading,
    error,
    copyShareLink,
    getPublicProfileByUserId,
    getPublicProfileByToken,
    togglePublicProfile,
  };
}
