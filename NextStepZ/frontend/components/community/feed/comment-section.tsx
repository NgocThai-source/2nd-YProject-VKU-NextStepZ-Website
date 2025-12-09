'use client';

import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Comment } from '@/lib/community-mock-data';
import { Avatar } from '../shared/avatar';
import { CommentCard } from './comment-card';
import { mockUsers } from '@/lib/community-mock-data';

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
  onAddComment?: (content: string) => void;
  onReplyComment?: (commentId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
}

export function CommentSection({
  comments: initialComments,
  totalComments: initialTotalComments,
  onAddComment,
  onReplyComment,
  onLikeComment,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [totalComments, setTotalComments] = useState(initialTotalComments);

  const currentUser = mockUsers[0];

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Create new comment
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        author: currentUser,
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: 0,
        isLiked: false,
        replyList: [],
      };

      // Add to comments
      setComments([newCommentObj, ...comments]);
      setTotalComments(totalComments + 1);

      // Call callback
      onAddComment?.(newComment);

      // Reset
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    onLikeComment?.(commentId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {/* Comment Input Box - Facebook Style */}
      <div className="flex items-start gap-2">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận..."
            className="w-full p-2.5 rounded-2xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/60 outline-none transition-all resize-none text-sm"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            rows={1}
          />
          <div className="flex items-center justify-end gap-2 mt-1.5">
            <span className="text-xs text-gray-500">{newComment.length}/500</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddComment}
              disabled={newComment.trim().length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              <Send className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comments List - Facebook Style */}
      {comments.length > 0 && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2"
            >
              <CommentCard
                comment={comment}
                onLike={handleLikeComment}
                onReply={() => {}}
                onAddReply={(parentId, content) => {
                  onReplyComment?.(parentId, content);
                }}
                totalComments={totalComments}
                onTotalCommentsChange={setTotalComments}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* No Comments */}
      {comments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-6"
        >
          <MessageCircle className="w-8 h-8 text-gray-500 mx-auto mb-2 opacity-50" />
          <p className="text-sm text-gray-500">Chưa có bình luận nào</p>
        </motion.div>
      )}
    </motion.div>
  );
}
