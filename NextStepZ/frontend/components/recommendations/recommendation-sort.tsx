'use client';

import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

interface SortOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface RecommendationSortProps {
  onSortChange: (sortBy: string) => void;
  type: 'jobs' | 'posts';
  currentSort?: string;
}

const jobSortOptions: SortOption[] = [
  { id: 'salary', label: 'Mức Lương (Cao nhất)' },
  { id: 'salary-asc', label: 'Mức Lương (Thấp nhất)' },
  { id: 'newest', label: 'Mới Nhất' },
];

const postSortOptions: SortOption[] = [
  { id: 'relevance', label: 'Mức Độ Liên Quan (Cao nhất)' },
  { id: 'relevance-asc', label: 'Mức Độ Liên Quan (Thấp nhất)' },
  { id: 'popular', label: 'Phổ Biến (Lượt Like)' },
  { id: 'comments', label: 'Bình Luận (Nhiều nhất)' },
  { id: 'newest', label: 'Mới Nhất' },
];

export function RecommendationSort({
  onSortChange,
  type,
  currentSort = 'match',
}: RecommendationSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sortOptions = type === 'jobs' ? jobSortOptions : postSortOptions;
  const selectedOption = sortOptions.find((opt) => opt.id === currentSort);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-lg border border-cyan-400/30 bg-slate-800/50 hover:bg-slate-800 text-cyan-300 text-sm font-medium transition-all flex items-center gap-2"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span>Sắp Xếp</span>
        <span className="ml-1 text-xs text-gray-500">({selectedOption?.label || 'Mặc định'})</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-cyan-400/20 bg-slate-900 overflow-hidden shadow-xl z-50"
        >
          {sortOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={() => {
                onSortChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm transition-all flex items-center gap-2 border-b border-cyan-400/10 last:border-b-0 ${
                currentSort === option.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {currentSort === option.id && <ArrowUp className="w-4 h-4" />}
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
