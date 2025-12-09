'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  Heart,
  Bookmark,
  ArrowRight,
  Badge,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { RecommendedPost } from '@/lib/recommendations-mock-data';

interface RecommendedPostCardProps {
  post: RecommendedPost;
  onSave?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onRead?: (postId: string) => void;
  onUserClick?: (userId: string) => void;
}

const categoryLabels: Record<RecommendedPost['category'], { emoji: string; label: string }> = {
  'job-search': { emoji: '💼', label: 'Tìm Việc' },
  experience: { emoji: '📝', label: 'Kinh Nghiệm' },
  discussion: { emoji: '💬', label: 'Thảo Luận' },
  question: { emoji: '❓', label: 'Câu Hỏi' },
  opportunity: { emoji: '🎯', label: 'Cơ Hội' },
};

const categoryColors: Record<
  RecommendedPost['category'],
  { bg: string; text: string }
> = {
  'job-search': { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  experience: { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
  discussion: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  question: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
  opportunity: { bg: 'bg-green-500/20', text: 'text-green-300' },
};

export function RecommendedPostCard({
  post,
  onSave,
  onShare,
  onRead,
  onUserClick,
}: RecommendedPostCardProps) {
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const category = categoryLabels[post.category];
  const categoryColor = categoryColors[post.category];

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      onClick={() => onRead?.(post.id)}
      className="rounded-lg border border-cyan-400/20 backdrop-blur-sm bg-linear-to-br from-white/10 to-white/5 overflow-hidden hover:border-cyan-400/40 transition-all cursor-pointer h-full flex flex-col group"
    >
      {/* Header - Author Info */}
      <div className="p-6 border-b border-cyan-400/10">
        <div
          className="flex gap-3 items-start mb-4 cursor-pointer group/author"
          onClick={(e) => {
            e.stopPropagation();
            onUserClick?.(post.author.id);
          }}
        >
          {/* Author Avatar */}
          <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center border border-cyan-400/20 group-hover/author:border-cyan-400/50 transition-all">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <h3
                className="font-semibold text-white line-clamp-1"
                style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
              >
                {post.author.name}
              </h3>
              {post.author.verified && (
                <span className="text-cyan-400 text-sm">✓</span>
              )}
            </div>
            <p className="text-xs text-gray-400 line-clamp-1">
              {post.author.title || 'Thành viên cộng đồng'}
            </p>
          </div>
        </div>

        {/* Category & Topic */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`px-2.5 py-1 text-xs rounded-full border ${categoryColor.bg} ${categoryColor.text} font-medium`}
          >
            {category.emoji} {category.label}
          </span>
          <span className="px-2.5 py-1 text-xs rounded-full bg-slate-700/50 text-gray-300 border border-slate-600/50 font-medium">
            {post.topic}
          </span>
        </div>

        {/* Post Title */}
        <h2
          className="text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors"
          style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
        >
          {post.title}
        </h2>

        {/* Post Description */}
        <p className="text-sm text-gray-400 line-clamp-2">{post.description}</p>
      </div>

      {/* Content Preview */}
      <div className="p-6 border-b border-cyan-400/10 flex-1">
        <p className="text-sm text-gray-300 line-clamp-3 mb-4 italic">
          &ldquo;{post.content.substring(0, 150)}&rdquo;
        </p>

        {/* Skills */}
        {post.skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase">Kỹ năng liên quan</p>
            <div className="flex flex-wrap gap-2">
              {post.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30"
                >
                  {skill}
                </span>
              ))}
              {post.skills.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-gray-400 border border-slate-600/50">
                  +{post.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Match Reasons */}
      <div className="p-6 border-b border-cyan-400/10">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Lý do khuyến nghị</p>
        <div className="space-y-1">
          {post.matchReasons.slice(0, 2).map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <Badge className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Stats & Actions */}
      <div className="p-6 space-y-3">
        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-400 pb-3 border-b border-cyan-400/10">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes} lượt thích</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments} bình luận</span>
          </div>
          <div className="text-gray-500 ml-auto">{post.postedAt}</div>
        </div>

        {/* Read More Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRead?.(post.id)}
          className="w-full py-2.5 rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          Đọc bài viết
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg border border-cyan-400/30 hover:bg-cyan-400/10 text-cyan-300 text-sm font-medium transition-all"
          >
            <Bookmark
              className={`w-4 h-4 mx-auto ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-cyan-300'}`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
