'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  TrendingUp,
  Brain,
  User,
} from 'lucide-react';

interface RecommendationStatsProps {
  totalCount: number;
  averageScore: number;
  type: 'jobs' | 'posts';
}

export function RecommendationStats({
  totalCount,
  averageScore,
  type,
}: RecommendationStatsProps) {
  const stats = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Tổng Gợi Ý',
      value: totalCount,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Mức Độ Trung Bình',
      value: `${averageScore}%`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: type === 'jobs' ? 'Dựa trên Hồ sơ' : 'Dựa trên Sở Thích',
      value: type === 'jobs' ? 'Công việc' : 'Bài viết',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      icon: <User className="w-5 h-5" />,
      label: 'Trạng Thái',
      value: 'Hoạt Động',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 hover:border-cyan-400/40 transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
