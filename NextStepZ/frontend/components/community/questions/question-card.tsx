'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/community-mock-data';
import { Eye, MessageCircle, ThumbsUp, CheckCircle, Tag, MoreHorizontal, Flag } from 'lucide-react';
import { formatTimeAgo } from '@/lib/community-utils';
import { useState } from 'react';
import { QuestionCommentSection } from './question-comment-section';

interface QuestionCardProps {
  question: Question;
  onVote?: (questionId: string, direction: 'up' | 'down') => void;
  onAnswerClick?: (questionId: string) => void;
  onReport?: (questionId: string) => void;
}

export function QuestionCard({
  question,
  onVote,
  onAnswerClick,
  onReport,
}: QuestionCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(question.isUpvoted || false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleVote = (direction: 'up' | 'down') => {
    setIsUpvoted(!isUpvoted);
    onVote?.(question.id, direction);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all overflow-hidden"
    >
      <div className="p-4">
        {/* Header with More Menu */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 
              className="text-base font-semibold text-white mb-1 line-clamp-2 cursor-pointer hover:text-cyan-300 transition-colors" 
              style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
              onClick={() => onAnswerClick?.(question.id)}
            >
              {question.title}
            </h3>
            <p className="text-xs text-gray-400 flex items-center gap-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
              <span>được hỏi {formatTimeAgo(question.timestamp)}</span>
              {question.isAnswered && (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Đã trả lời
                </span>
              )}
            </p>
          </div>

          {/* More Menu Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </motion.button>

            {/* Menu Items */}
            {showMoreMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-800 border border-cyan-400/20 shadow-xl backdrop-blur-sm z-50 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onClick={() => {
                    onReport?.(question.id);
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-yellow-400 transition-colors"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <Flag className="w-4 h-4" />
                  Báo Cáo
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Preview */}
        <p 
          className="text-sm text-gray-300 mb-3 line-clamp-2 cursor-pointer hover:text-gray-200 transition-colors" 
          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          onClick={() => onAnswerClick?.(question.id)}
        >
          {question.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 text-xs text-cyan-300"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              <Tag className="w-3 h-3" />
              {tag}
            </motion.div>
          ))}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{question.views}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span>{question.answers}</span>
            </div>
          </div>

          {/* Vote & Comment Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleVote('up');
              }}
              className={`p-1 rounded transition-all ${
                isUpvoted
                  ? 'text-green-400 bg-green-400/10'
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </motion.button>
            <span className="text-xs text-gray-400 min-w-6">{question.votes}</span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              className="p-1 rounded transition-all text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comment Section - Expanded Below */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cyan-400/10 px-4 py-4 bg-white/2"
          >
            <QuestionCommentSection
              comments={question.comments}
              onAddComment={(text) => console.log('Comment added:', text)}
              onLikeComment={(commentId) => console.log('Comment liked:', commentId)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface QAFeedProps {
  questions: Question[];
  onVote?: (questionId: string, direction: 'up' | 'down') => void;
  onAnswerClick?: (questionId: string) => void;
  onReport?: (questionId: string) => void;
}

export function QAFeed({
  questions,
  onVote,
  onAnswerClick,
  onReport,
}: QAFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <QuestionCard
            question={question}
            onVote={onVote}
            onAnswerClick={onAnswerClick}
            onReport={onReport}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

