'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  BookmarkPlus,
  Badge,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { RecommendedJob } from '@/lib/recommendations-mock-data';

interface RecommendedJobCardProps {
  job: RecommendedJob;
  onSave?: (jobId: string) => void;
  onShare?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}

const levelColors: Record<RecommendedJob['level'], { bg: string; text: string }> = {
  intern: { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  junior: { bg: 'bg-cyan-500/20', text: 'text-cyan-300' },
  mid: { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  senior: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
};

const typeColors: Record<RecommendedJob['type'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  remote: 'Remote',
};

export function RecommendedJobCard({
  job,
  onSave,
  onShare,
  onApply,
}: RecommendedJobCardProps) {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave?.(job.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(job.id);
  };

  const handleViewCompany = () => {
    const url = `/companies?search=${encodeURIComponent(job.company)}`;
    window.location.href = url;
    onApply?.(job.id);
  };

  const salaryText =
    job.salary[0] === job.salary[1]
      ? `$${(job.salary[0] / 1000).toFixed(1)}K`
      : `$${(job.salary[0] / 1000).toFixed(1)}K - $${(job.salary[1] / 1000).toFixed(1)}K`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="rounded-lg border border-cyan-400/20 backdrop-blur-sm bg-linear-to-br from-white/10 to-white/5 overflow-hidden hover:border-cyan-400/40 transition-all h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-cyan-400/10">
        <div className="flex gap-4 items-start mb-4">
          {/* Company Logo */}
          <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-700">
            <Image
              src={job.companyLogo}
              alt={job.company}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-bold text-white line-clamp-2 mb-1"
              style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
            >
              {job.title}
            </h3>
            <p className="text-sm text-gray-400">{job.company}</p>
          </div>
        </div>

        {/* Job Type & Level Badge */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-medium">
            {typeColors[job.type]}
          </span>
          <span
            className={`px-2.5 py-1 text-xs rounded-full border ${levelColors[job.level].bg} ${levelColors[job.level].text} font-medium`}
          >
            {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
          </span>
        </div>

        {/* Location & Salary */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span>{salaryText}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-cyan-400/10 flex-1">
        <p className="text-sm text-gray-300 line-clamp-2 mb-4">{job.description}</p>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase">Kỹ năng yêu cầu</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Match Reasons */}
      <div className="p-6 border-b border-cyan-400/10">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Lý do khuyến nghị</p>
        <div className="space-y-1">
          {job.matchReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
              <Badge className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 space-y-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button 
            onClick={handleViewCompany}
            className="w-full py-2.5 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            Xem công ty
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg border border-cyan-400/30 hover:bg-cyan-400/10 text-cyan-300 text-sm font-medium transition-all"
          >
            <BookmarkPlus
              className={`w-4 h-4 mx-auto ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-cyan-300'}`}
            />
          </motion.button>
        </div>

        {/* Applicants Info */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-cyan-400/10">
          {job.applicants} người đã ứng tuyển • {job.postedAt}
        </div>
      </div>
    </motion.div>
  );
}
