'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Post, mockPosts } from '@/lib/community-mock-data';
import { PostCard } from './post-card';
import { PostReportModal } from './post-report-modal';
import { PostSkeleton } from '../shared/skeleton-loader';
import type { FilterType } from './feed-filter';

interface FeedProps {
  onCreatePostClick?: () => void;
  onPostInteraction?: (postId: string, type: 'like' | 'comment' | 'save' | 'share') => void;
  onUserClick?: (userId: string) => void;
  filter?: FilterType;
  selectedHashtags?: string[];
  selectedTopics?: string[];
  searchQuery?: string;
  newPost?: Post | null;
}

export function Feed({
  onCreatePostClick,
  onPostInteraction,
  onUserClick,
  filter = 'all',
  selectedHashtags = [],
  selectedTopics = [],
  searchQuery = '',
  newPost = null,
}: FeedProps) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [reportingPost, setReportingPost] = useState<Post | null>(null);

  // Thêm bài viết mới vào đầu feed
  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  // Filter posts based on selection
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by category
    if (filter !== 'all' && filter !== 'trending') {
      result = result.filter((post) => post.category === filter);
    }

    // Filter by hashtags (match any of the selected hashtags)
    if (selectedHashtags.length > 0) {
      result = result.filter((post) =>
        post.hashtags.some((tag) =>
          selectedHashtags.some((selected) =>
            tag.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    // Filter by topics (match any of the selected topics)
    if (selectedTopics.length > 0) {
      result = result.filter((post) =>
        post.topics?.some((topicId) =>
          selectedTopics.includes(topicId)
        )
      );
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by trending (most likes + comments)
    if (filter === 'trending') {
      result.sort((a, b) => {
        const scoreA = a.likes + a.comments * 2;
        const scoreB = b.likes + b.comments * 2;
        return scoreB - scoreA;
      });
    }

    return result;
  }, [posts, filter, selectedHashtags, selectedTopics, searchQuery]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Post Report Modal */}
      <PostReportModal
        isOpen={!!reportingPost}
        post={reportingPost}
        onClose={() => setReportingPost(null)}
        onSubmit={(reason, description) => {
          console.log('Post reported:', {
            postId: reportingPost?.id,
            reason,
            description,
          });
          // Here you would typically send this to your backend API
        }}
      />
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Không có bài viết nào khớp với tiêu chí tìm kiếm
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreatePostClick}
            className="px-6 py-2 rounded-lg bg-linear-to-r from-cyan-400 to-blue-500 text-white font-medium"
          >
            Tạo bài viết đầu tiên
          </motion.button>
        </motion.div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => onPostInteraction?.(post.id, 'like')}
            onComment={() => onPostInteraction?.(post.id, 'comment')}
            onSave={() => onPostInteraction?.(post.id, 'save')}
            onShare={() => onPostInteraction?.(post.id, 'share')}
            onUserClick={(userId) => onUserClick?.(userId)}
            onReport={() => setReportingPost(post)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {filteredPosts.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLoadMore}
          disabled={isLoading}
          className="w-full py-3 rounded-lg border-2 border-cyan-400 text-cyan-600 dark:text-cyan-400 font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Đang tải...' : 'Tải thêm bài viết'}
        </motion.button>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
