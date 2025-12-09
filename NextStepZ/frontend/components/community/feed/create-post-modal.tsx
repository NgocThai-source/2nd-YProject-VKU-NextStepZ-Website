'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { Post, PostCategory, mockUsers, mockTopics } from '@/lib/community-mock-data';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (post: Post) => void;
}

const categories: { id: PostCategory; label: string }[] = [
  { id: 'job-search', label: '💼 Tìm Việc' },
  { id: 'experience', label: '📝 Chia Sẻ Kinh Nghiệm' },
  { id: 'discussion', label: '💬 Thảo Luận' },
  { id: 'question', label: '❓ Câu Hỏi' },
  { id: 'offer', label: '✨ Cơ Hội' },
];

const suggestedHashtags = [
  'React',
  'TypeScript',
  'WebDevelopment',
  'CareerAdvice',
  'Startup',
  'AI',
  'NextJS',
  'TailwindCSS',
];

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('discussion');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postIdCounterRef = useRef(0);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddHashtag = (tag: string) => {
    const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
    if (!hashtags.includes(cleanTag) && hashtags.length < 10) {
      setHashtags([...hashtags, cleanTag]);
      setHashtagInput('');
      setErrors([]);
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 4 - images.length).map((file) => {
      return URL.createObjectURL(file);
    });
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleHashtagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      handleAddHashtag(hashtagInput.trim());
    }
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];

    if (!content.trim()) {
      newErrors.push('Vui lòng nhập nội dung bài viết');
    }
    if (content.trim().length < 10) {
      newErrors.push('Bài viết phải có ít nhất 10 ký tự');
    }
    if (content.trim().length > 5000) {
      newErrors.push('Bài viết không được vượt quá 5000 ký tự');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create post object with generated ID
    const newPost: Post = {
      id: `post-${postIdCounterRef.current++}`,
      author: mockUsers[0], // Current user mock
      content: content.trim(),
      category,
      topics: selectedTopics,
      images,
      hashtags,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      isLiked: false,
      isSaved: false,
    };

    onSubmit?.(newPost);
    handleClose();
  };

  const handleClose = () => {
    setContent('');
    setCategory('discussion');
    setSelectedTopics([]);
    setHashtags([]);
    setHashtagInput('');
    setImages([]);
    setErrors([]);
    onClose();
  };

  const charCount = content.length;
  const charLimit = 5000;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
          >
            <div className="bg-slate-800 border border-cyan-400/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden backdrop-blur-sm flex flex-col relative z-0">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-cyan-400/10 sticky top-0 bg-slate-800/95">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  Tạo Bài Viết Mới
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Error Messages */}
                {errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-2"
                  >
                    {errors.map((error, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-red-300">{error}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Chọn Danh Mục
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          category === cat.id
                            ? 'bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/50'
                            : 'bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20'
                        }`}
                        style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                      >
                        {cat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Topics Selection */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Chủ Đề ({selectedTopics.length})
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {mockTopics.map((topic) => (
                      <motion.button
                        key={topic.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const isSelected = selectedTopics.includes(topic.id);
                          setSelectedTopics(
                            isSelected
                              ? selectedTopics.filter(t => t !== topic.id)
                              : [...selectedTopics, topic.id]
                          );
                        }}
                        className={`relative group px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 shrink-0 ${
                          selectedTopics.includes(topic.id)
                            ? 'bg-linear-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30 border border-violet-400'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-violet-400/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{topic.icon}</span>
                          <span>{topic.name}</span>
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 rounded-full transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Text Editor */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Nội Dung
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (errors.length > 0) setErrors([]);
                    }}
                    placeholder="Chia sẻ suy nghĩ, kinh nghiệm, câu hỏi của bạn..."
                    className="w-full h-40 p-4 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/60 outline-none transition-all resize-none"
                    style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>{charCount} / {charLimit} ký tự</span>
                    <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          charCount > charLimit * 0.9 ? 'bg-red-500' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${Math.min((charCount / charLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hashtags Input */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Hashtags ({hashtags.length}/10)
                  </label>
                  <input
                    type="text"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyPress={handleHashtagKeyPress}
                    placeholder="Gõ hashtag và nhấn Enter (VD: React, TypeScript)..."
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:border-cyan-400/60 outline-none transition-all"
                    style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                  />
                  
                  {/* Suggested Hashtags */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-400">Gợi ý:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHashtags.map((tag) => (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddHashtag(tag)}
                          disabled={hashtags.length >= 10}
                          className="px-2 py-1 text-xs rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/20 disabled:opacity-50 transition-all"
                        >
                          +{tag}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Active Hashtags */}
                  {hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hashtags.map((tag) => (
                        <motion.div
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => handleRemoveHashtag(tag)}
                            className="hover:text-cyan-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Ảnh ({images.length}/4)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {images.length < 4 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 rounded-lg border-2 border-dashed border-cyan-400/30 hover:border-cyan-400/60 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-cyan-300"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Nhấp để tải ảnh lên (tối đa 4)</span>
                    </motion.button>
                  )}

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      {images.map((image, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img
                            src={image}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg border border-cyan-400/20"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded bg-red-500/80 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-cyan-400/10 flex gap-3 sticky bottom-0 bg-slate-800/95">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-300 font-semibold hover:bg-white/5 transition-all"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={charCount === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <Plus className="w-4 h-4" />
                  Đăng Bài
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
