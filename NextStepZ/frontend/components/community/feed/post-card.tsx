'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Copy,
  Flag,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Post, mockComments, mockTopics } from '@/lib/community-mock-data';
import { Avatar } from '../shared/avatar';
import { PillTag } from '../shared/pill-tag';
import { formatTimeAgo } from '@/lib/community-utils';
import { CommentSection } from './comment-section';
import { ShareModal } from './share-modal';
import { useSavePost } from '@/lib/use-save-items';

interface PostCardProps {
  post: Post;
  isAuthor?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onSave?: (postId: string, isSave: boolean) => void;
  onShare?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onUserClick?: (userId: string) => void;
  onReport?: (postId: string) => void;
}

const categoryLabels: Record<string, string> = {
  'job-search': '💼 Tìm Việc',
  experience: '📝 Kinh Nghiệm',
  discussion: '💬 Thảo Luận',
  question: '❓ Câu Hỏi',
  offer: '✨ Chia Sẻ',
  opportunity: '🎯 Cơ Hội',
};

export function PostCard({
  post,
  isAuthor = false,
  onLike,
  onComment,
  onSave,
  onShare,
  onEdit,
  onDelete,
  onUserClick,
  onReport,
}: PostCardProps) {
  const { toggleSavePost, isSavedPost } = useSavePost();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setIsSaved(isSavedPost(post.id));
  }, [post.id, isSavedPost]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.(post.id);
  };

  const handleSave = () => {
    toggleSavePost(post);
    setIsSaved(!isSaved);
    onSave?.(post.id, !isSaved);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-cyan-400/20 backdrop-blur-sm bg-linear-to-br from-white/10 to-white/5 overflow-hidden hover:border-cyan-400/40 transition-all"
    >
      {/* Header */}
      <div className="p-4 border-b border-cyan-400/10">
        <div className="flex items-start justify-between gap-3">
          <motion.div
            className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => onUserClick?.(post.author.id)}
            whileHover={{ x: 2 }}
          >
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              size="md"
              verified={post.author.verified}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="font-semibold text-white truncate hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  {post.author.name}
                </h3>
                {post.author.title && (
                  <span
                    className="text-sm text-gray-400 truncate"
                    style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                  >
                    {post.author.title}
                  </span>
                )}
              </div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                {formatTimeAgo(post.timestamp)}
              </p>
            </div>
          </motion.div>

          {/* More Options Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </motion.button>

            <AnimatePresence>
              {showMoreMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-cyan-400/20 rounded-lg shadow-xl backdrop-blur-sm overflow-hidden z-10"
                >
                  {isAuthor && (
                    <>
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                        onClick={() => {
                          onEdit?.(post.id);
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 transition-colors"
                        style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                      >
                        <Edit className="w-4 h-4" />
                        Chỉnh Sửa
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                        onClick={() => {
                          onDelete?.(post.id);
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 transition-colors"
                        style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </motion.button>
                    </>
                  )}
                  {!isAuthor && (
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      onClick={() => {
                        onReport?.(post.id);
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-yellow-400 transition-colors"
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      <Flag className="w-4 h-4" />
                      Báo Cáo
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mt-3">
          <PillTag
            label={categoryLabels[post.category] || post.category}
            variant="primary"
          />
        </div>

        {/* Topic Tags */}
        {post.topics && post.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.topics.map((topicId) => {
              const topic = mockTopics.find((t) => t.id === topicId);
              return topic ? (
                <motion.div
                  key={topicId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/40 text-violet-300 text-sm font-medium hover:border-violet-400/60 transition-all cursor-pointer"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <span>{topic.icon}</span>
                  <span>{topic.name}</span>
                </motion.div>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p
          className="text-gray-200 leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
        >
          {post.content}
        </p>

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.hashtags.map((tag) => (
              <PillTag key={tag} label={tag} variant="secondary" className="text-xs px-2 py-0.5" />
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="px-4 pb-4">
          <div
            className={`grid gap-2 ${
              post.images.length === 1
                ? 'grid-cols-1'
                : post.images.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-2'
            }`}
          >
            {post.images.map((image, idx) => (
              <div
                key={idx}
                className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <img
                  src={image}
                  alt={`Post image ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div
        className="px-4 py-3 border-t border-cyan-400/10 flex items-center justify-between text-sm text-gray-400"
        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
      >
        <span className="hover:text-cyan-300 cursor-pointer">{likeCount} lượt thích</span>
        <div className="flex gap-4">
          <span className="hover:text-cyan-300 cursor-pointer">{post.comments} bình luận</span>
          <span className="hover:text-cyan-300 cursor-pointer">{post.shares} chia sẻ</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-cyan-400/10 flex items-center justify-around flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isLiked ? 'text-red-400 bg-red-500/10' : 'text-gray-400 hover:bg-white/5'
          }`}
          style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
        >
          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm hidden sm:inline">Thích</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
          style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Bình Luận</span>
        </motion.button>

        {/* Share Menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">Chia Sẻ</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isSaved ? 'text-cyan-300 bg-cyan-400/10' : 'text-gray-400 hover:bg-white/5'
          }`}
          style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          <span className="text-sm hidden sm:inline">Lưu</span>
        </motion.button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-cyan-400/10 px-4 py-4"
        >
          <CommentSection
            comments={post.comments > 0 ? mockComments : []}
            totalComments={post.comments}
            onAddComment={() => {}}
            onReplyComment={() => {}}
            onLikeComment={() => {}}
          />
        </motion.div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        post={post}
        onClose={() => setShowShareModal(false)}
      />
    </motion.div>
  );
}
