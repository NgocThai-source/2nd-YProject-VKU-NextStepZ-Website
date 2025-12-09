'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface RecommendationSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function RecommendationSearch({
  onSearch,
  placeholder = 'Tìm kiếm công việc, bài viết, kỹ năng...',
}: RecommendationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <motion.div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 rounded-lg bg-slate-800/50 border border-cyan-400/30 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
        />
        {searchQuery && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
