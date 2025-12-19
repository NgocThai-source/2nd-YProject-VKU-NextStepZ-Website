'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Filter,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CompanyCard } from '@/components/companies/company-card';
import { CompanyDetailModal } from '@/components/companies/company-detail-modal';
import { CompanyFilter } from '@/components/companies/company-filter';
import { CompanySearch } from '@/components/companies/company-search';
import { SortDropdown } from '@/components/companies/sort-dropdown';
import { Pagination } from '@/components/companies/pagination';
import { CreateJobPostingModal } from '@/components/companies/create-job-posting-modal';
import { JobPostingCard } from '@/components/companies/job-posting-card';
import { JobPostingDetailModal } from '@/components/companies/job-posting-detail-modal';
import type { JobPosting } from '@/components/companies/job-posting.types';
import { mockCompanies, Company } from '@/lib/companies-mock-data';

type SortType = 'trending' | 'rating' | 'salary' | 'newest';
type ViewType = 'grid' | 'list';

export default function CompaniesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateJobPostingOpen, setIsCreateJobPostingOpen] = useState(false);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(null);
  const [isPostingDetailOpen, setIsPostingDetailOpen] = useState(false);

  // Initialize search query from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('search');
    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }
  }, []);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('trending');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filters
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100]);

  // Filtered and sorted companies
  const filteredCompanies = useMemo(() => {
    let result = mockCompanies;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (company: Company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.some((ind: string) =>
            ind.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Location filter
    if (selectedLocations.length > 0 && !selectedLocations.includes('Toàn Quốc')) {
      result = result.filter((company: Company) =>
        selectedLocations.includes(company.location)
      );
    }

    // Company size filter
    if (selectedSizes.length > 0) {
      result = result.filter((company: Company) =>
        selectedSizes.includes(company.size)
      );
    }

    // Business type filter
    if (selectedBusinessTypes.length > 0) {
      result = result.filter((company: Company) =>
        selectedBusinessTypes.includes(company.businessType)
      );
    }

    // Employment type filter
    if (selectedEmploymentTypes.length > 0) {
      result = result.filter((company: Company) =>
        company.employmentType.some((compType) => selectedEmploymentTypes.includes(compType))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter((company: Company) =>
        selectedTags.some((tag) => company.tags?.includes(tag))
      );
    }

    // Rating filter
    if (ratingFilter > 0) {
      result = result.filter((company: Company) => company.rating >= ratingFilter);
    }

    // Salary range filter (using avg salary)
    result = result.filter((company: Company) => {
      const avgSalary = (company.salaryRange[0] + company.salaryRange[1]) / 2;
      return avgSalary >= salaryRange[0] && avgSalary <= salaryRange[1];
    });

    // Sort
    const sorted = [...result];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'salary':
        sorted.sort(
          (a, b) => (b.salaryRange[1] + b.salaryRange[0]) / 2 - (a.salaryRange[1] + a.salaryRange[0]) / 2
        );
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime());
        break;
      case 'trending':
      default:
        sorted.sort((a, b) => b.views - a.views);
        break;
    }

    return sorted;
  }, [
    searchQuery,
    selectedLocations,
    selectedSizes,
    selectedBusinessTypes,
    selectedEmploymentTypes,
    selectedTags,
    ratingFilter,
    salaryRange,
    sortBy,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, currentPage]);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsDetailOpen(true);
  };

  const handleCreateJobPosting = (data: any) => {
    console.log('Job posting data:', data);
    
    // Create new job posting with ID and timestamp
    const newPosting: JobPosting = {
      id: `posting-${Date.now()}`,
      companyName: data.companyName,
      companyLogo: data.galleryImages?.[0], // Use first gallery image as logo if available
      tags: data.tags,
      description: data.description,
      mission: data.mission,
      vision: data.vision,
      companyHistory: data.companyHistory,
      address: data.address,
      phone: data.phone,
      email: data.email,
      website: data.website,
      jobPositions: data.jobPositions,
      workingHours: data.workingHours,
      offDays: data.offDays,
      vacationDays: data.vacationDays,
      insurances: data.insurances,
      salaryBenefits: data.salaryBenefits,
      allowances: data.allowances,
      benefits: data.benefits,
      galleryImages: data.galleryImages,
      createdAt: new Date().toISOString(),
      postedBy: user?.id || 'anonymous',
    };

    // Add to job postings array (newest first)
    setJobPostings([newPosting, ...jobPostings]);
    setIsCreateJobPostingOpen(false);
  };

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
          {/* Search Bar */}
          <CompanySearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>


      {/* Main Content */}
      <div className="z-10 relative py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="shrink-0">
              <div className="sticky top-32">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full lg:hidden mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 font-semibold hover:border-cyan-400/50 transition-all"
                >
                  <Filter className="w-5 h-5" />
                  Bộ Lọc
                </motion.button>

                <AnimatePresence>
                  {(isFilterOpen || true) && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CompanyFilter
                        selectedLocations={selectedLocations}
                        onLocationsChange={setSelectedLocations}
                        selectedSizes={selectedSizes}
                        onSizesChange={setSelectedSizes}
                        selectedBusinessTypes={selectedBusinessTypes}
                        onBusinessTypesChange={setSelectedBusinessTypes}
                        selectedEmploymentTypes={selectedEmploymentTypes}
                        onEmploymentTypesChange={setSelectedEmploymentTypes}
                        selectedTags={selectedTags}
                        onTagsChange={setSelectedTags}
                        ratingFilter={ratingFilter}
                        onRatingChange={setRatingFilter}
                        salaryRange={salaryRange}
                        onSalaryRangeChange={setSalaryRange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Main Content - Companies Grid/List */}
            <div className="flex-1 min-w-0">
              {/* Header với nút tạo bài tuyển dụng */}
              {user?.role === 'employer' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCreateJobPostingOpen(true)}
                  className="w-full mb-6 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Đăng Bài Tuyển Dụng
                </motion.button>
              )}

              {/* Sort and View Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
              >
                <div className="flex items-center gap-2 text-gray-300">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span
                    style={{ fontFamily: "'Poppins Medium', sans-serif" }}
                  >
                    {filteredCompanies.length + jobPostings.length} bài đăng
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* Sort Dropdown */}
                  <SortDropdown
                    value={sortBy}
                    onChange={(value) => setSortBy(value as SortType)}
                  />

                  {/* View Toggle */}
                  <div className="flex gap-2 p-1 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                    {(['grid', 'list'] as const).map((view) => (
                      <motion.button
                        key={view}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewType(view)}
                        className={`px-3 py-1 rounded transition-all ${
                          viewType === view
                            ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/50'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        {view === 'grid' ? '⊞' : '≡'}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Companies & Job Postings Grid/List */}
              {paginatedCompanies.length > 0 || jobPostings.length > 0 ? (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewType === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {/* Job Postings */}
                    {jobPostings.map((posting, index) => (
                      <motion.div
                        key={posting.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <JobPostingCard
                          posting={posting}
                          viewType={viewType}
                          onViewDetails={(posting) => {
                            setSelectedPosting(posting);
                            setIsPostingDetailOpen(true);
                          }}
                        />
                      </motion.div>
                    ))}

                    {/* Companies */}
                    {paginatedCompanies.map((company, index) => (
                      <motion.div
                        key={company.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (jobPostings.length + index) * 0.05 }}
                        onClick={() => handleCompanyClick(company)}
                      >
                        <CompanyCard
                          company={company}
                          viewType={viewType}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="mb-4">
                    <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-300 mb-2"
                    style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  >
                    Không tìm thấy nơi làm việc
                  </h3>
                  <p className="text-gray-500">
                    Hãy thử điều chỉnh các bộ lọc của bạn
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explore Other Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 p-8 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
          Khám Phá Thêm
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommendations Link */}
          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = '/recommendations')}
            className="p-6 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 hover:border-cyan-400/40 transition-all text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="font-semibold text-white mb-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              Công Việc & Bài Viết Gợi Ý
            </h4>
            <p className="text-sm text-gray-400">
              Xem các gợi ý việc làm và bài viết cộng đồng được cá nhân hóa dựa trên hồ sơ của bạn.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-3">
              Tới Gợi Ý <TrendingUp className="w-4 h-4" />
            </div>
          </motion.button>

          {/* Community Link */}
          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = '/community')}
            className="p-6 rounded-lg border border-cyan-400/20 bg-linear-to-br from-white/10 to-white/5 hover:border-cyan-400/40 transition-all text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <Briefcase className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="font-semibold text-white mb-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              Cộng Đồng & Bài Viết
            </h4>
            <p className="text-sm text-gray-400">
              Tham gia cộng đồng, chia sẻ kinh nghiệm, đặt câu hỏi và học từ các chuyên gia khác.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-3">
              Tới Cộng Đồng <Briefcase className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailOpen && selectedCompany && (
          <CompanyDetailModal
            company={selectedCompany}
            onClose={() => {
              setIsDetailOpen(false);
              setTimeout(() => setSelectedCompany(null), 300);
            }}
          />
        )}
      </AnimatePresence>

      {/* Job Posting Detail Modal */}
      <AnimatePresence>
        {isPostingDetailOpen && selectedPosting && (
          <JobPostingDetailModal
            posting={selectedPosting}
            onClose={() => {
              setIsPostingDetailOpen(false);
              setTimeout(() => setSelectedPosting(null), 300);
            }}
          />
        )}
      </AnimatePresence>

      {/* Create Job Posting Modal */}
      <CreateJobPostingModal
        isOpen={isCreateJobPostingOpen}
        onClose={() => setIsCreateJobPostingOpen(false)}
        onSubmit={handleCreateJobPosting}
      />
    </main>
  );
}
