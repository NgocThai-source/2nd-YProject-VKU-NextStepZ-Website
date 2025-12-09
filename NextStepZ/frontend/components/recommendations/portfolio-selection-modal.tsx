'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Calendar } from 'lucide-react';
import { SavedPortfolio } from '@/lib/saved-portfolio-context';

interface PortfolioSelectionModalProps {
  isOpen: boolean;
  portfolios: SavedPortfolio[];
  isLoading: boolean;
  onSelect: (portfolio: SavedPortfolio) => void;
  onClose?: () => void;
}

export function PortfolioSelectionModal({
  isOpen,
  portfolios,
  isLoading,
  onSelect,
  onClose,
}: PortfolioSelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm sm:max-w-4xl max-h-[70vh] sm:max-h-[75vh] overflow-y-auto bg-slate-900 rounded-lg sm:rounded-2xl border border-slate-800/50 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-6 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur-sm gap-2 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-base sm:text-2xl font-bold text-white truncate sm:line-clamp-none"
                    style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}
                  >
                    Chọn Hồ Sơ Sáng Tạo
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-1">Chọn một hồ sơ để nhận gợi ý phù hợp</p>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-6 sm:h-6 text-slate-400 hover:text-white" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12 sm:py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-400 border-r-transparent" />
                  </div>
                ) : portfolios.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 sm:py-20"
                  >
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <FileText className="w-5 h-5 sm:w-8 sm:h-8 text-slate-500" />
                    </div>
                    <p className="text-slate-400 mb-3 sm:mb-6 text-sm sm:text-lg">Bạn chưa có hồ sơ sáng tạo nào</p>
                    <a
                      href="/saved-portfolios"
                      className="inline-flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xs sm:text-base hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      Tạo Hồ Sơ Mới
                    </a>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    {portfolios.map((portfolio, index) => (
                      <motion.button
                        key={portfolio.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelect(portfolio)}
                        className="group bg-slate-900/50 border border-slate-800/50 rounded-lg sm:rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 text-left flex flex-col h-full"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-24 sm:h-40 bg-slate-800/50 overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10" />
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="w-6 h-6 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-1 sm:mb-2" />
                              <p className="text-xs text-slate-500 font-semibold">
                                Mẫu {portfolio.selectedTemplate}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-2.5 sm:p-4 flex flex-col flex-1">
                          <h3 className="font-semibold text-white mb-0.5 sm:mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors text-xs sm:text-base" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                            {portfolio.name || 'Hồ sơ không có tiêu đề'}
                          </h3>
                          <p className="text-xs text-slate-400 mb-1.5 sm:mb-3 line-clamp-2" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                            {portfolio.headline || portfolio.title || 'Chưa có tiêu đề chuyên môn'}
                          </p>

                          {/* Skills */}
                          {portfolio.skills?.selected && portfolio.skills.selected.length > 0 && (
                            <div className="flex gap-1 mb-1.5 sm:mb-3 flex-wrap">
                              {portfolio.skills.selected.slice(0, 3).map((skill, idx) => (
                                <span
                                  key={`${portfolio.id}-skill-${skill.id || idx}`}
                                  className="text-xs px-2 py-0.5 sm:py-1 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                                >
                                  {skill.name}
                                </span>
                              ))}
                              {portfolio.skills.selected.length > 3 && (
                                <span key={`${portfolio.id}-more-skills`} className="text-xs px-2 py-0.5 sm:py-1 rounded bg-slate-700 text-gray-300">
                                  +{portfolio.skills.selected.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-1.5 sm:pt-3 border-t border-slate-700/50">
                            <div className="flex items-center gap-1 min-w-0">
                              <Calendar className="w-3 h-3 shrink-0" />
                              <span className="truncate">{new Date(portfolio.updatedAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                              →
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 px-3 sm:px-6 py-2 sm:py-4 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
                <p className="text-xs text-slate-500 text-center line-clamp-2">
                  Hồ sơ sáng tạo được sử dụng để tạo gợi ý phù hợp với kỹ năng và kinh nghiệm của bạn
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
