import { useCallback } from 'react';
import { useToast } from '@/components/ui/toast';
import { useSavedItems } from './saved-items-context';
import { Company } from '@/lib/companies-mock-data';
import { Post } from '@/lib/community-mock-data';

/**
 * Hook for saving/removing companies with toast notification
 */
export function useSaveCompany() {
  const { addToast } = useToast();
  const { addSavedCompany, removeSavedCompany, isSavedCompany } = useSavedItems();

  const toggleSaveCompany = useCallback(
    (company: Company) => {
      if (isSavedCompany(company.id)) {
        removeSavedCompany(company.id);
        addToast(`${company.name} đã được bỏ lưu`, 'info', 2000);
      } else {
        addSavedCompany(company);
        addToast(`${company.name} đã được lưu`, 'success', 2000);
      }
    },
    [addSavedCompany, removeSavedCompany, isSavedCompany, addToast]
  );

  return {
    toggleSaveCompany,
    isSavedCompany,
  };
}

/**
 * Hook for saving/removing posts with toast notification
 */
export function useSavePost() {
  const { addToast } = useToast();
  const { addSavedPost, removeSavedPost, isSavedPost } = useSavedItems();

  const toggleSavePost = useCallback(
    (post: Post) => {
      if (isSavedPost(post.id)) {
        removeSavedPost(post.id);
        addToast('Bài viết đã được bỏ lưu', 'info', 2000);
      } else {
        addSavedPost(post);
        addToast('Bài viết đã được lưu', 'success', 2000);
      }
    },
    [addSavedPost, removeSavedPost, isSavedPost, addToast]
  );

  return {
    toggleSavePost,
    isSavedPost,
  };
}
