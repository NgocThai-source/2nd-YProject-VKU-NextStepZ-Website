'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterState {
  skills: string[];
  level: string;
  salary: [number, number];
  category: string;
}

interface RecommendationFilterProps {
  onFilterChange: (filters: FilterState) => void;
  type: 'jobs' | 'posts';
}

const skillOptions = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Python',
  'JavaScript',
  'CSS',
  'HTML',
  'Docker',
  'MongoDB',
  'PostgreSQL',
  'GraphQL',
  'AWS',
  'UI/UX Design',
];

const jobLevels = ['Intern', 'Junior', 'Mid', 'Senior'];

const postCategories = ['Kinh Nghiệm', 'Thảo Luận', 'Câu Hỏi', 'Cơ Hội', 'Tìm Việc'];

export function RecommendationFilter({ onFilterChange, type }: RecommendationFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 5000]);

  const handleSkillChange = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    onFilterChange({
      skills: updated,
      level: selectedLevel,
      salary: salaryRange,
      category: selectedCategory,
    });
  };

  const handleLevelChange = (level: string) => {
    const updated = selectedLevel === level ? '' : level;
    setSelectedLevel(updated);
    onFilterChange({
      skills: selectedSkills,
      level: updated,
      salary: salaryRange,
      category: selectedCategory,
    });
  };

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategory === category ? '' : category;
    setSelectedCategory(updated);
    onFilterChange({
      skills: selectedSkills,
      level: selectedLevel,
      salary: salaryRange,
      category: updated,
    });
  };

  const handleSalaryChange = (min: number, max: number) => {
    setSalaryRange([min, max]);
    onFilterChange({
      skills: selectedSkills,
      level: selectedLevel,
      salary: [min, max],
      category: selectedCategory,
    });
  };

  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedLevel('');
    setSelectedCategory('');
    setSalaryRange([0, 5000]);
    onFilterChange({
      skills: [],
      level: '',
      salary: [0, 5000],
      category: '',
    });
  };

  const hasActiveFilters =
    selectedSkills.length > 0 || selectedLevel || selectedCategory || salaryRange[0] > 0;

  return (
    <motion.div className="rounded-lg border border-cyan-400/20 bg-slate-800/30 overflow-hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <span
            className="font-semibold text-white"
            style={{ fontFamily: "'Poppins Medium', sans-serif" }}
          >
            Bộ Lọc
          </span>
          {hasActiveFilters && (
            <span className="text-xs bg-cyan-400/30 text-cyan-300 px-2 py-1 rounded-full">
              {selectedSkills.length + (selectedLevel ? 1 : 0) + (selectedCategory ? 1 : 0)}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-cyan-400/10 p-4 space-y-4"
          >
            {/* Skills Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-2">Kỹ Năng</p>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <motion.button
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-cyan-500 text-white border border-cyan-400'
                        : 'bg-slate-700/50 text-gray-300 border border-cyan-400/20 hover:border-cyan-400/40'
                    }`}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Level Filter - for Jobs */}
            {type === 'jobs' && (
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-2">Cấp Độ</p>
                <div className="flex flex-wrap gap-2">
                  {jobLevels.map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLevelChange(level.toLowerCase())}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedLevel === level.toLowerCase()
                          ? 'bg-purple-500 text-white border border-purple-400'
                          : 'bg-slate-700/50 text-gray-300 border border-cyan-400/20 hover:border-cyan-400/40'
                      }`}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter - for Posts */}
            {type === 'posts' && (
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-2">Danh Mục</p>
                <div className="flex flex-wrap gap-2">
                  {postCategories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-green-500 text-white border border-green-400'
                          : 'bg-slate-700/50 text-gray-300 border border-cyan-400/20 hover:border-cyan-400/40'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Salary Range Filter - for Jobs */}
            {type === 'jobs' && (
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-2">
                  Mức Lương (${salaryRange[0]} - ${salaryRange[1]}K)
                </p>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={salaryRange[0]}
                    onChange={(e) => handleSalaryChange(Number(e.target.value), salaryRange[1])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={salaryRange[1]}
                    onChange={(e) => handleSalaryChange(salaryRange[0], Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Reset Button */}
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="w-full py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-gray-300 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
