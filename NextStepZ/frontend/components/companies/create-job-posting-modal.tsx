'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface JobPosition {
  title: string;
  minSalary: number;
  maxSalary: number;
}

interface CompanyHistory {
  year: string;
  milestone: string;
}

interface CreateJobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    companyName: string;
    tags: string[];
    description: string;
    mission: string;
    vision: string;
    companyHistory: CompanyHistory[];
    address: string;
    phone: string;
    email: string;
    website: string;
    jobPositions: JobPosition[];
    workingHours: string;
    offDays: number;
    vacationDays: number;
    insurances: string[];
    salaryBenefits: string[];
    allowances: string[];
    benefits: string[];
    galleryImages: string[];
  }) => void;
}

export function CreateJobPostingModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateJobPostingModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [activeTagCategory, setActiveTagCategory] = useState<string>('all');
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [companyHistory, setCompanyHistory] = useState<CompanyHistory[]>([
    { year: new Date().getFullYear().toString(), milestone: '' }
  ]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([
    { title: '', minSalary: 0, maxSalary: 0 }
  ]);
  const [workingStartTime, setWorkingStartTime] = useState('09:00');
  const [workingEndTime, setWorkingEndTime] = useState('18:00');
  const [offDays, setOffDays] = useState(2);
  const [vacationDays, setVacationDays] = useState(12);
  const [insurances, setInsurances] = useState<string[]>(['']);
  const [salaryBenefits, setSalaryBenefits] = useState<string[]>(['']);
  const [allowances, setAllowances] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const tagCategories = {
    all: { label: 'Tất Cả', tags: [] as string[] },
    tech: { label: 'Công Nghệ', tags: ['Technology', 'Software Development', 'Web Development', 'Mobile Development', 'Backend Development', 'Frontend Development', 'Full Stack', 'DevOps', 'Cloud Computing', 'AI', 'Machine Learning', 'Blockchain', 'Data Science', 'Cybersecurity'] },
    business: { label: 'Kinh Doanh', tags: ['E-commerce', 'Sales', 'B2B', 'B2C', 'Business Development', 'Customer Service', 'Retail', 'Online Shopping'] },
    marketing: { label: 'Marketing', tags: ['Digital Marketing', 'Content', 'Social Media', 'SEO', 'SEM', 'Branding', 'Advertising', 'Email Marketing'] },
    finance: { label: 'Tài Chính', tags: ['Finance', 'FinTech', 'Banking', 'Insurance', 'Investment', 'Accounting'] },
    food: { label: 'Ẩm Thực', tags: ['Food & Beverage', 'Restaurant', 'Cafe', 'Hotel', 'Hospitality', 'Culinary', 'Vietnamese Cuisine', 'Luxury Dining'] },
    fashion: { label: 'Thời Trang', tags: ['Fashion', 'Beauty', 'Cosmetics', 'Skincare', 'Luxury Fashion'] },
    logistics: { label: 'Logistics', tags: ['Logistics', 'Delivery', 'Supply Chain', 'Transportation', 'Warehousing'] },
    education: { label: 'Giáo Dục', tags: ['Education', 'Training', 'Learning', 'E-Learning', 'Coaching'] },
    healthcare: { label: 'Y Tế', tags: ['Healthcare', 'Hospital', 'Medical', 'Wellness', 'Fitness'] },
    other: { label: 'Khác', tags: ['Design', 'Creative', 'UI/UX', 'Staffing', 'Innovation', 'Startup', 'Global', 'Remote', 'Hybrid'] },
  };

  // Populate 'all' category
  tagCategories.all.tags = Object.values(tagCategories)
    .filter(cat => cat !== tagCategories.all)
    .flatMap(cat => cat.tags);

  const getFilteredTags = () => {
    // If there's a search query, search across ALL tags
    if (tagSearchQuery.trim()) {
      const allTags = tagCategories.all.tags;
      return allTags.filter(tag => 
        tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
      );
    }
    // If no search query, show tags from active category
    const categoryTags = tagCategories[activeTagCategory as keyof typeof tagCategories]?.tags || [];
    return categoryTags;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const addJobPosition = () => {
    setJobPositions([...jobPositions, { title: '', minSalary: 0, maxSalary: 0 }]);
  };

  const removeJobPosition = (index: number) => {
    setJobPositions(jobPositions.filter((_, i) => i !== index));
  };

  const updateJobPosition = (index: number, field: keyof JobPosition, value: string | number) => {
    const updated = [...jobPositions];
    if (field === 'title') {
      updated[index].title = value as string;
    } else if (field === 'minSalary' || field === 'maxSalary') {
      updated[index][field] = value as number;
    }
    setJobPositions(updated);
  };

  const addHistoryEntry = () => {
    setCompanyHistory([...companyHistory, { year: '', milestone: '' }]);
  };

  const removeHistoryEntry = (index: number) => {
    setCompanyHistory(companyHistory.filter((_, i) => i !== index));
  };

  const updateHistoryEntry = (index: number, field: keyof CompanyHistory, value: string) => {
    const updated = [...companyHistory];
    updated[index][field] = value;
    setCompanyHistory(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workingHours = `${workingStartTime} - ${workingEndTime}`;
    onSubmit({
      companyName,
      tags: selectedTags,
      description,
      mission,
      vision,
      companyHistory,
      address,
      phone,
      email,
      website,
      jobPositions,
      workingHours,
      offDays,
      vacationDays,
      insurances: insurances.filter(i => i.trim()),
      salaryBenefits: salaryBenefits.filter(s => s.trim()),
      allowances: allowances.filter(a => a.trim()),
      benefits: benefits.filter(b => b.trim()),
      galleryImages: galleryImages.filter(g => g.trim()),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl border border-cyan-400/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-cyan-400/20 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>
                Tạo Bài Tuyển Dụng
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Tên công ty */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Tên Công Ty *
                </label>
                <Input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nhập tên công ty"
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Các Ngành Nghề ({selectedTags.length} đã chọn)
                </label>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-4 pb-3 border-b border-cyan-400/10">
                  {Object.entries(tagCategories).map(([key, category]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActiveTagCategory(key);
                        setTagSearchQuery('');
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        activeTagCategory === key
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800 border border-cyan-400/30 text-gray-300 hover:border-cyan-400'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <Input
                  type="text"
                  placeholder="Tìm kiếm các ngành nghề"
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 mb-3 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                />

                {/* Tags Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-2">
                  {getFilteredTags().map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                        selectedTags.includes(tag)
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800 border border-cyan-400/30 text-gray-300 hover:border-cyan-400 hover:bg-slate-700'
                      }`}
                      title={tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-cyan-400/10">
                    <p className="text-xs text-gray-400 mb-2">Tags đã chọn:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500 text-cyan-300 rounded-full text-xs"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className="hover:text-cyan-200"
                          >
                            ✕
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mô tả công ty */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Mô Tả Ngắn Về Công Ty
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả về công ty"
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                />
              </div>

              {/* Sứ mệnh & Tầm nhìn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Sứ Mệnh
                  </label>
                  <textarea
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    placeholder="Sứ mệnh của công ty"
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Tầm Nhìn
                  </label>
                  <textarea
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    placeholder="Tầm nhìn của công ty"
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Lịch sử công ty */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-white">
                    Lịch Sử Công Ty
                  </label>
                  <button
                    type="button"
                    onClick={addHistoryEntry}
                    className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30"
                  >
                    <Plus className="w-4 h-4" /> Thêm
                  </button>
                </div>
                <div className="space-y-3">
                  {companyHistory.map((entry, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Năm"
                        value={entry.year}
                        onChange={(e) => updateHistoryEntry(idx, 'year', e.target.value)}
                        className="w-20 px-2 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                      <Input
                        type="text"
                        placeholder="Mô tả"
                        value={entry.milestone}
                        onChange={(e) => updateHistoryEntry(idx, 'milestone', e.target.value)}
                        className="flex-1 px-2 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                      {companyHistory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHistoryEntry(idx)}
                          className="p-2 hover:bg-red-500/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="border-t border-cyan-400/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Thông Tin Liên Hệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <Input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                  <Input
                    type="url"
                    placeholder="Website (nếu có)"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Vị trí tuyển dụng */}
              <div className="border-t border-cyan-400/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Vị Trí Tuyển Dụng *</h3>
                  <button
                    type="button"
                    onClick={addJobPosition}
                    className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30"
                  >
                    <Plus className="w-4 h-4" /> Thêm Vị Trí
                  </button>
                </div>
                <div className="space-y-3">
                  {jobPositions.map((position, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Vị trí tuyển dụng"
                        value={position.title}
                        onChange={(e) => updateJobPosition(idx, 'title', e.target.value)}
                        required
                        className="flex-1 px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                      />
                      <div>
                        <Input
                          type="number"
                          placeholder="Lương min"
                          value={position.minSalary === 0 ? '' : position.minSalary}
                          onChange={(e) => updateJobPosition(idx, 'minSalary', e.target.value ? parseInt(e.target.value) : 0)}
                          className="w-32 px-2 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">triệu đồng</p>
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="Lương max"
                          value={position.maxSalary === 0 ? '' : position.maxSalary}
                          onChange={(e) => updateJobPosition(idx, 'maxSalary', e.target.value ? parseInt(e.target.value) : 0)}
                          className="w-32 px-2 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">triệu đồng</p>
                      </div>
                      {jobPositions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeJobPosition(idx)}
                          className="p-2 hover:bg-red-500/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phúc lợi */}
              <div className="border-t border-cyan-400/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Phúc Lợi</h3>
                <div className="space-y-4">
                  {/* Thời gian làm việc */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Thời Gian Làm Việc</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="time"
                          value={workingStartTime}
                          onChange={(e) => setWorkingStartTime(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">Thời gian bắt đầu</p>
                      </div>
                      <div>
                        <Input
                          type="time"
                          value={workingEndTime}
                          onChange={(e) => setWorkingEndTime(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">Thời gian kết thúc</p>
                      </div>
                    </div>
                  </div>

                  {/* Ngày nghỉ và Ngày phép */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="number"
                        placeholder="Ngày nghỉ"
                        value={offDays}
                        onChange={(e) => setOffDays(parseInt(e.target.value))}
                        className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">ngày/tuần</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Ngày phép"
                        value={vacationDays}
                        onChange={(e) => setVacationDays(parseInt(e.target.value))}
                        className="px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">ngày phép/năm</p>
                    </div>
                  </div>

                  {/* Danh sách phúc lợi */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white">Bảo Hiểm</label>
                    {insurances.map((ins, idx) => (
                      <Input
                        key={idx}
                        type="text"
                        placeholder="Bảo hiểm"
                        value={ins}
                        onChange={(e) => {
                          const updated = [...insurances];
                          updated[idx] = e.target.value;
                          setInsurances(updated);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setInsurances([...insurances, ''])}
                      className="text-cyan-400 text-sm hover:text-cyan-300"
                    >
                      + Thêm bảo hiểm
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white">Phúc Lợi Lương</label>
                    {salaryBenefits.map((benefit, idx) => (
                      <Input
                        key={idx}
                        type="text"
                        placeholder="Phúc lợi"
                        value={benefit}
                        onChange={(e) => {
                          const updated = [...salaryBenefits];
                          updated[idx] = e.target.value;
                          setSalaryBenefits(updated);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setSalaryBenefits([...salaryBenefits, ''])}
                      className="text-cyan-400 text-sm hover:text-cyan-300"
                    >
                      + Thêm phúc lợi
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white">Phụ Cấp</label>
                    {allowances.map((allow, idx) => (
                      <Input
                        key={idx}
                        type="text"
                        placeholder="Phụ cấp"
                        value={allow}
                        onChange={(e) => {
                          const updated = [...allowances];
                          updated[idx] = e.target.value;
                          setAllowances(updated);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setAllowances([...allowances, ''])}
                      className="text-cyan-400 text-sm hover:text-cyan-300"
                    >
                      + Thêm phụ cấp
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white">Quyền Lợi Khác</label>
                    {benefits.map((benefit, idx) => (
                      <Input
                        key={idx}
                        type="text"
                        placeholder="Quyền lợi"
                        value={benefit}
                        onChange={(e) => {
                          const updated = [...benefits];
                          updated[idx] = e.target.value;
                          setBenefits(updated);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white text-sm"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setBenefits([...benefits, ''])}
                      className="text-cyan-400 text-sm hover:text-cyan-300"
                    >
                      + Thêm quyền lợi
                    </button>
                  </div>
                </div>
              </div>

              {/* Hình ảnh */}
              <div className="border-t border-cyan-400/10 pt-6">
                <label className="block text-sm font-semibold text-white mb-3">
                  Hình Ảnh Công Ty
                </label>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-cyan-400/30 rounded-lg bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors group">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm text-gray-300">Click để chọn hình ảnh</p>
                      <p className="text-xs text-gray-500 mt-1">(PNG, JPG, GIF)</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setGalleryImages([...galleryImages, result]);
                          };
                          reader.readAsDataURL(file);
                        });
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Preview Grid */}
                {galleryImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Hình ảnh đã tải lên ({galleryImages.length}):</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <div
                            className="w-full h-24 rounded-lg border border-cyan-400/30 bg-cover bg-center"
                            style={{ backgroundImage: `url('${img}')` }}
                          />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="border-t border-cyan-400/10 pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-semibold"
                >
                  Đăng Bài Tuyển Dụng
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
