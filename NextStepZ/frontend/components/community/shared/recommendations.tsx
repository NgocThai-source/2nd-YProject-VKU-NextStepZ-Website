'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Eye } from 'lucide-react';
import { CommunityUser } from '@/lib/community-mock-data';
import { Avatar } from './avatar';

interface RecommendedUserProps {
  user: CommunityUser;
  reason: string;
  onFollow?: (userId: string) => void;
  onDismiss?: (userId: string) => void;
}

interface RecommendationsProps {
  users: CommunityUser[];
  onFollow?: (userId: string) => void;
  onDismiss?: (userId: string) => void;
}

export function RecommendedUser({
  user,
  reason,
  onFollow,
  onDismiss,
}: RecommendedUserProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 rounded-lg bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={user.avatar} alt={user.name} size="md" verified={user.verified} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
            {user.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{user.title || user.role}</p>
          <p className="text-xs text-cyan-300 mt-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" />
            {reason}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFollow?.(user.id)}
          className="flex-1 px-3 py-1 rounded-lg bg-cyan-400/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-400/30 transition-colors"
          style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
        >
          Theo Dõi
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDismiss?.(user.id)}
          className="flex-1 px-3 py-1 rounded-lg bg-white/10 text-gray-300 text-xs hover:bg-white/20 transition-colors"
        >
          Bỏ qua
        </motion.button>
      </div>
    </motion.div>
  );
}

export function Recommendations({
  users,
  onFollow,
  onDismiss,
}: RecommendationsProps) {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());

  const visibleUsers = users.filter((u) => !dismissed.has(u.id));

  const handleDismiss = (userId: string) => {
    setDismissed((prev) => new Set([...prev, userId]));
    onDismiss?.(userId);
  };

  if (visibleUsers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg bg-linear-to-br from-white/10 to-white/5 border border-cyan-400/20 p-6 text-center"
      >
        <Eye className="w-8 h-8 text-gray-600 mx-auto mb-2 opacity-50" />
        <p className="text-sm text-gray-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
          Bạn đã xem tất cả đề xuất
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-400" />
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
        >
          Gợi Ý Theo Dõi
        </h3>
      </div>

      <div className="space-y-2">
        {visibleUsers.map((user) => (
          <RecommendedUser
            key={user.id}
            user={user}
            reason={`${user.followers} người theo dõi`}
            onFollow={onFollow}
            onDismiss={handleDismiss}
          />
        ))}
      </div>
    </div>
  );
}
