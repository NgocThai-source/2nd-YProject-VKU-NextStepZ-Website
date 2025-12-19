'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageSquare,
  UserPlus,
  UserCheck,
  Award,
  Globe,
  MoreVertical,
} from 'lucide-react';
import { CommunityUser } from '@/lib/community-mock-data';
import { useState, useEffect } from 'react';
import { UserManagementDialog } from './user-management-dialog';

interface UserProfileModalProps {
  user: CommunityUser | null;
  isOpen: boolean;
  onClose: () => void;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
}

export function UserProfileModal({
  user,
  isOpen,
  onClose,
  onFollow,
  onMessage,
}: UserProfileModalProps) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  // Reset management dialog when main modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsManagementOpen(false);
    }
  }, [isOpen]);

  if (!user) return null;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.(user.id);
  };

  const userRoleIcons: Record<string, string> = {
    student: '📚',
    employer: '🤝',
    mentor: '🎓',
    alumni: '⭐',
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[90vh] z-50 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-cyan-400/20 backdrop-blur-sm overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>

            {/* Header Background */}
            <div className="h-24 bg-linear-to-r from-cyan-500/20 to-blue-500/20 relative">
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {/* Avatar */}
              <motion.div
                className="flex justify-center -mt-12 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden">
                    {/* Using img tag for avatar as per design */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {user.verified && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-slate-800">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* User Info */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  {user.name}
                </h2>
                <p className="text-sm text-gray-400 flex items-center justify-center gap-1 mb-2">
                  {userRoleIcons[user.role]} {user.role === 'student' ? 'Sinh viên' : user.role === 'employer' ? 'Nhà tuyển dụng' : user.role === 'mentor' ? 'Mentor' : 'Cựu sinh viên'}
                </p>
                {user.title && (
                  <p className="text-sm text-cyan-300 font-semibold" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    {user.title}
                  </p>
                )}
                {user.company && (
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Globe className="w-3 h-3" />
                    {user.company}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-lg bg-white/5 border border-cyan-400/10 text-center"
                >
                  <p className="text-lg font-bold text-cyan-300">
                    {(user.followers / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Follower
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-lg bg-white/5 border border-cyan-400/10 text-center"
                >
                  <p className="text-lg font-bold text-cyan-300">
                    {user.following}
                  </p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Following
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-3 rounded-lg bg-white/5 border border-cyan-400/10 text-center"
                >
                  <p className="text-lg font-bold text-yellow-400">
                    {user.reputation || 0}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    <Award className="w-3 h-3" />
                    Điểm
                  </p>
                </motion.div>
              </div>

              {/* Bio */}
              {user.title && (
                <p className="text-sm text-gray-400 text-center mb-6 line-clamp-3" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                  Chuyên gia về {user.title.toLowerCase()}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFollow}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    isFollowing
                      ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20'
                      : 'bg-linear-to-r from-cyan-400 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                  }`}
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Đang Follow</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onMessage?.(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition-all"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Tin Nhắn</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsManagementOpen(true)}
                  className="px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition-all flex items-center justify-center"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <MoreVertical className="w-4 h-4" />
                </motion.button>
              </div>

              {/* View Profile Link */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
              >
                Xem Hồ Sơ Đầy Đủ
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* User Management Dialog */}
    <UserManagementDialog
      user={user!}
      isOpen={isManagementOpen}
      onClose={() => setIsManagementOpen(false)}
    />
    </>
  );
}
