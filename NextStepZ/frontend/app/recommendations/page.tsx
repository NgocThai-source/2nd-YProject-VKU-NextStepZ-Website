/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  RecommendationType,
} from '@/lib/recommendations-mock-data';
import {
  getRecommendedJobs,
  getRecommendedPosts,
} from '@/lib/recommendations-adapter';
import {
  RecommendedJobCard,
  RecommendedPostCard,
  RecommendationSort,
  RecommendationSearch,
  PortfolioSelectionModal,
} from '@/components/recommendations';
import { useSavedPortfolio, SavedPortfolio } from '@/lib/saved-portfolio-context';

type SortType = 'match' | 'match-asc' | 'salary' | 'salary-asc' | 'newest' | 'relevance' | 'relevance-asc' | 'popular' | 'comments';

interface FilterState {
  skills: string[];
  level: string;
  salary: [number, number];
  category: string;
}

export default function RecommendationsPage() {
  const { getSavedPortfolios } = useSavedPortfolio();
  const savedPortfolios = getSavedPortfolios();
  
  // Get saved portfolio from localStorage on initial render
  const getInitialPortfolio = (): SavedPortfolio | null => {
    if (typeof window === 'undefined') return null;
    const savedPortfolioId = localStorage.getItem('selectedPortfolioId');
    if (savedPortfolioId && savedPortfolios.length > 0) {
      return savedPortfolios.find((p) => p.id === savedPortfolioId) || null;
    }
    return null;
  };

  const [selectedPortfolio, setSelectedPortfolio] = useState<SavedPortfolio | null>(getInitialPortfolio());
  const [showPortfolioModal, setShowPortfolioModal] = useState(false); // Default: hidden, allow viewing recommendations without portfolio

  const handlePortfolioSelect = (portfolio: SavedPortfolio) => {
    setSelectedPortfolio(portfolio);
    localStorage.setItem('selectedPortfolioId', portfolio.id);
    setShowPortfolioModal(false);
  };

  const handleChangePortfolio = () => {
    setShowPortfolioModal(true);
  };

  const [activeTab, setActiveTab] = useState<RecommendationType>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('match');
  const [filters] = useState<FilterState>({
    skills: [],
    level: '',
    salary: [0, 5000],
    category: '',
  });

  const sections = [
    { id: 'jobs' as RecommendationType, label: 'Công Việc Phù Hợp', icon: Briefcase },
    { id: 'posts' as RecommendationType, label: 'Bài Viết Có Liên Quan', icon: MessageSquare },
  ];

  // Process recommendations with filtering and sorting
  const recommendations = useMemo(() => {
    // Start with base data
    let items: any[] = activeTab === 'jobs' ? getRecommendedJobs() : getRecommendedPosts();

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter((item: any) => {
        const title = (item.title || '').toLowerCase();
        const description = (item.description || '').toLowerCase();
        const company = (item.company || '').toLowerCase();
        return (
          title.includes(query) || description.includes(query) || company.includes(query)
        );
      });
    }

    // Apply skill filter
    if (filters.skills.length > 0) {
      items = items.filter((item: any) => {
        const itemSkills = (item.skills || []).map((s: string) => s.toLowerCase());
        return filters.skills.some(
          (skill) => itemSkills.includes(skill.toLowerCase())
        );
      });
    }

    // Apply level filter (jobs only)
    if (activeTab === 'jobs' && filters.level) {
      items = items.filter((job: any) => job.level === filters.level);
    }

    // Apply category filter (posts only)
    if (activeTab === 'posts' && filters.category) {
      const categoryMap: Record<string, string> = {
        'Kinh Nghiệm': 'experience',
        'Thảo Luận': 'discussion',
        'Câu Hỏi': 'question',
        'Cơ Hội': 'opportunity',
        'Tìm Việc': 'job-search',
      };
      const categoryKey = categoryMap[filters.category] || filters.category.toLowerCase();
      items = items.filter((post: any) => post.category === categoryKey);
    }

    // Apply salary range (jobs only)
    // Skip salary filter to show all IT jobs by default
    // if (activeTab === 'jobs' && filters.salary) {
    //   console.log('Salary filter applied, salary range:', filters.salary);
    //   items = items.filter((job: any) => {
    //     const avgSalary = (job.salary[0] + job.salary[1]) / 2;
    //     return (
    //       avgSalary >= filters.salary[0] && avgSalary <= filters.salary[1]
    //     );
    //   });
    //   console.log('After salary filter:', items.length);
    // }

    // Apply sorting
    const sorted = [...items];
    if (activeTab === 'jobs') {
      if (sortBy === 'match') {
        sorted.sort((a: any, b: any) => b.matchScore - a.matchScore);
      } else if (sortBy === 'match-asc') {
        sorted.sort((a: any, b: any) => a.matchScore - b.matchScore);
      } else if (sortBy === 'salary') {
        sorted.sort(
          (a: any, b: any) =>
            (b.salary[1] + b.salary[0]) / 2 - (a.salary[1] + a.salary[0]) / 2
        );
      } else if (sortBy === 'salary-asc') {
        sorted.sort(
          (a: any, b: any) =>
            (a.salary[1] + a.salary[0]) / 2 - (b.salary[1] + b.salary[0]) / 2
        );
      }
    } else {
      if (sortBy === 'relevance') {
        sorted.sort((a: any, b: any) => b.relevanceScore - a.relevanceScore);
      } else if (sortBy === 'relevance-asc') {
        sorted.sort((a: any, b: any) => a.relevanceScore - b.relevanceScore);
      } else if (sortBy === 'popular') {
        sorted.sort((a: any, b: any) => b.likes - a.likes);
      } else if (sortBy === 'comments') {
        sorted.sort((a: any, b: any) => b.comments - a.comments);
      }
    }

    return sorted;
  }, [activeTab, searchQuery, filters, sortBy]);

  const handleRefresh = () => {
    console.log('Refreshing recommendations...');
  };

  // Portfolio selection is now optional - show recommendations without portfolio
  // (Portfolio can still be selected to filter recommendations)

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Header */}
      <div className="z-10 sticky top-0 backdrop-blur-md bg-slate-900/80 border-b border-cyan-400/10 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-linear-to-br from-cyan-500/30 to-blue-500/30">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}
                >
                  Đề Xuất Cho Bạn
                </h1>
              </div>
            </div>
            <p className="text-gray-400 ml-11">
              {selectedPortfolio
                ? `Gợi ý dựa trên: ${selectedPortfolio.name}`
                : 'Những gợi ý được cá nhân hóa dựa trên hồ sơ và kỹ năng của bạn'}
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex gap-3 mb-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(section.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                    activeTab === section.id
                      ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'border border-cyan-400/30 text-gray-300 hover:border-cyan-400/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Selected Portfolio Card */}
        {selectedPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 p-6 rounded-xl border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-2">Hồ Sơ Được Chọn</p>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  {selectedPortfolio.name}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  {selectedPortfolio.headline || selectedPortfolio.title || 'Chưa có mô tả'}
                </p>
                {selectedPortfolio.skills?.selected && selectedPortfolio.skills.selected.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedPortfolio.skills.selected.slice(0, 4).map((skill) => (
                      <span
                        key={`${selectedPortfolio.id}-skill-${skill.id}`}
                        className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {selectedPortfolio.skills.selected.length > 4 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700 text-gray-300">
                        +{selectedPortfolio.skills.selected.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChangePortfolio}
                className="px-6 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Đổi Hồ Sơ
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search & Actions */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 w-full">
              <RecommendationSearch onSearch={setSearchQuery} />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <RecommendationSort
                onSortChange={(sort) => setSortBy(sort as SortType)}
                type={activeTab}
                currentSort={sortBy}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="px-4 py-2.5 rounded-lg border border-cyan-400/30 bg-slate-800/50 hover:bg-slate-800 text-cyan-300 text-sm font-medium transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Làm Mới</span>
              </motion.button>
            </div>
          </div>

        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {recommendations.length > 0 ? (
            <div>
              <p className="text-sm text-gray-400 mb-6">
                Tìm thấy <span className="text-cyan-300 font-bold">{recommendations.length}</span>{' '}
                gợi ý {activeTab === 'jobs' ? 'công việc' : 'bài viết'}
              </p>

              <AnimatePresence mode="wait">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((recommendation: any, index: number) => (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {activeTab === 'jobs' ? (
                        <RecommendedJobCard
                          job={recommendation}
                          onApply={(jobId) => {
                            console.log('Apply for job:', jobId);
                          }}
                          onSave={(jobId) => console.log('Save job:', jobId)}
                          onShare={(jobId) => console.log('Share job:', jobId)}
                        />
                      ) : (
                        <RecommendedPostCard
                          post={recommendation}
                          onRead={(postId) => {
                            window.location.href = `/shared-post/${postId}`;
                          }}
                          onSave={(postId) => console.log('Save post:', postId)}
                          onShare={(postId) => console.log('Share post:', postId)}
                          onUserClick={(userId) => {
                            console.log('View user:', userId);
                            // Navigate to community page
                            window.location.href = '/community';
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-lg bg-cyan-500/20">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Không có gợi ý</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {searchQuery
                  ? `Không tìm thấy ${activeTab === 'jobs' ? 'công việc' : 'bài viết'} phù hợp với "${searchQuery}".`
                  : 'Hãy cập nhật hồ sơ của bạn để nhận được những gợi ý tốt hơn.'}
              </p>
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm"
                >
                  Xóa Tìm Kiếm
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-6 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm mb-8"
        >
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-cyan-500/20 shrink-0">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3
                className="font-semibold text-white mb-1"
                style={{ fontFamily: "'Poppins SemiBold', sans-serif" }}
              >
                Cách Hoạt Động Của Gợi Ý
              </h3>
              <p className="text-sm text-gray-300">
                Hệ thống gợi ý của NextStepZ sử dụng thông tin từ <strong>Hồ sơ Sáng Tạo</strong> và{' '}
                <strong>Hồ sơ Nghề Nghiệp</strong> của bạn để tìm những công việc và bài viết phù hợp nhất.
                Sắp tới, chúng tôi sẽ tích hợp{' '}
                <strong>công nghệ AI tiên tiến</strong> để nâng cao chất lượng của những gợi ý này.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Khám Phá Thêm</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Community Link */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = '/community')}
              className="p-6 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 hover:border-cyan-400/40 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <h4
                className="font-semibold text-white mb-2"
                style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
              >
                Xem Bài Viết Khác
              </h4>
              <p className="text-sm text-gray-400">
                Khám phá hàng ngàn bài viết từ cộng đồng, kinh nghiệm, và thảo luận từ các chuyên gia.
              </p>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-3">
                Tới Cộng Đồng <TrendingUp className="w-4 h-4" />
              </div>
            </motion.button>

            {/* Companies Link */}
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = '/companies')}
              className="p-6 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 hover:border-cyan-400/40 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
              <h4
                className="font-semibold text-white mb-2"
                style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
              >
                Xem Công Việc Khác
              </h4>
              <p className="text-sm text-gray-400">
                Duyệt danh sách đầy đủ các công ty và vị trí tuyển dụng phù hợp với kỹ năng của bạn.
              </p>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-3">
                Tới Công Ty <TrendingUp className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Selection Modal */}
      <PortfolioSelectionModal
        isOpen={showPortfolioModal}
        portfolios={savedPortfolios}
        isLoading={false}
        onSelect={handlePortfolioSelect}
        onClose={() => {
          if (selectedPortfolio) {
            setShowPortfolioModal(false);
          }
        }}
      />
    </main>
  );
}
