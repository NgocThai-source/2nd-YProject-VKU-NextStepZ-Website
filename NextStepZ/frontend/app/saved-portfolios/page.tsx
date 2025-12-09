'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Maximize2,
  Eye,
  Trash2,
  FileText,
  Calendar,
  Share2,
  Copy,
  Facebook,
  Mail,
  MessageCircle,
  Check,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useSavedPortfolio, SavedPortfolio } from '@/lib/saved-portfolio-context';
import { TemplatePreview } from '@/components/portfolio/template-preview';
import { useSharePortfolio } from '@/lib/hooks/useSharePortfolio';

export default function SavedPortfoliosPage() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { getSavedPortfolios, deletePortfolio: deletePortfolioFromContext } = useSavedPortfolio();
  const [selectedPortfolio, setSelectedPortfolio] = useState<SavedPortfolio | null>(null);
  const [isFullscreenView, setIsFullscreenView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [sharePortfolioData, setSharePortfolioData] = useState<SavedPortfolio | null>(null);
  const { copyLink, shareToFacebook, shareToMessenger, shareViaEmail, copiedFeedback } = useSharePortfolio({
    portfolioId: showShareModal || '',
    portfolio: sharePortfolioData || undefined,
  });

  const savedPortfolios = getSavedPortfolios();

  const handleDelete = (id: string) => {
    deletePortfolioFromContext(id);
    setShowDeleteConfirm(null);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenView) {
        setIsFullscreenView(false);
      }
    };

    if (isFullscreenView) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenView]);

  if (authLoading) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-md space-y-8 text-center"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <Image 
                src="/images/logo-icon.png" 
                alt="NextStepZ Logo" 
                width={80} 
                height={80} 
                className="w-20 h-20"
                priority={false}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
              Hồ Sơ Sáng Tạo Của Tôi
            </h1>
            <p className="text-slate-400 text-lg" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
              Đăng nhập để xem các hồ sơ đã lưu
            </p>
          </div>

          <Link
            href="/auth"
            className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95 transform inline-flex items-center justify-center"
            style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
          >
            Đăng Nhập
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isFullscreenView && selectedPortfolio) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between backdrop-blur-sm z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFullscreenView(false)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              title="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-white font-semibold flex items-center gap-2" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
              <Eye className="w-5 h-5 text-cyan-400" />
              {selectedPortfolio.name}
            </h2>
          </div>
          <button
            onClick={() => setIsFullscreenView(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
            title="Đóng (Esc)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <TemplatePreview 
            key={`fullscreen-${selectedPortfolio.id}-${selectedPortfolio.selectedTemplate}`}
            templateId={selectedPortfolio.selectedTemplate} 
            data={{
              title: selectedPortfolio.title,
              headline: selectedPortfolio.headline,
              summary: selectedPortfolio.summary,
              photoUrl: selectedPortfolio.photoUrl || '',
              contactJson: selectedPortfolio.contactJson || {},
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              skills: selectedPortfolio.skills as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              experience: selectedPortfolio.experience as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              education: selectedPortfolio.education as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              projects: selectedPortfolio.projects as any,
              selectedTemplate: selectedPortfolio.selectedTemplate,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
            className="space-y-3"
          >
            <div className="inline-block">
              <h1 className="text-4xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
                Hồ Sơ Sáng Tạo Của Tôi
              </h1>
            </div>
            
          </motion.div>
          <p className="text-slate-400 mt-4" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
            Xem và quản lý các hồ sơ cá nhân của bạn
          </p>
        </div>

        {/* Portfolios Grid or Empty State */}
        {savedPortfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-12 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-500" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              Chưa có hồ sơ nào
            </h2>
            <p className="text-slate-400 mb-6" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
              Bạn chưa lưu hồ sơ nào. Hãy tạo hồ sơ mới và lưu nó.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Tạo Hồ Sơ Mới
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-slate-900/50 border border-slate-800/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-slate-800/50 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10" />
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">
                        Mẫu {portfolio.selectedTemplate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                    {portfolio.name || 'Hồ sơ không có tiêu đề'}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                    {portfolio.headline || 'Chưa có tiêu đề chuyên môn'}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(portfolio.updatedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPortfolio(portfolio);
                        setIsFullscreenView(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-sm font-medium group"
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Xem</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowShareModal(portfolio.id);
                        setSharePortfolioData(portfolio);
                      }}
                      className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                      title="Chia sẻ"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(portfolio.id)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className="w-full max-w-sm bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  Xóa hồ sơ?
                </h2>
                <p className="text-sm text-slate-400" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                  Hành động này không thể hoàn tác. Hồ sơ sẽ bị xóa vĩnh viễn.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-medium"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all font-medium"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  Xóa
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Portfolio Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className="w-full max-w-md bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  <Share2 className="w-5 h-5 text-blue-400" />
                  Chia sẻ hồ sơ
                </h2>
                <button
                  onClick={() => {
                    setShowShareModal(null);
                    setSharePortfolioData(null);
                  }}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="p-6 space-y-3">
              {/* Copy Link */}
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all group"
              >
                {copiedFeedback ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-white">Đã sao chép!</p>
                      <p className="text-xs text-slate-400">Link đã được sao chép vào clipboard</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-white">Sao chép liên kết</p>
                      <p className="text-xs text-slate-400">Sao chép link để chia sẻ</p>
                    </div>
                  </>
                )}
              </button>

              {/* Share to Facebook */}
              <button
                onClick={shareToFacebook}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-blue-900/30 hover:border-blue-700 transition-all group"
              >
                <Facebook className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-white">Chia sẻ lên Facebook</p>
                  <p className="text-xs text-slate-400">Chia sẻ trên tường của bạn</p>
                </div>
              </button>

              {/* Share to Messenger */}
              <button
                onClick={shareToMessenger}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-blue-900/30 hover:border-blue-700 transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-white">Gửi qua Messenger</p>
                  <p className="text-xs text-slate-400">Gửi cho bạn bè hoặc nhóm</p>
                </div>
              </button>

              {/* Share via Email */}
              <button
                onClick={shareViaEmail}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-purple-900/30 hover:border-purple-700 transition-all group"
              >
                <Mail className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-white">Gửi qua Email</p>
                  <p className="text-xs text-slate-400">Gửi liên kết qua email</p>
                </div>
              </button>
            </div>

            {/* Footer Info */}
            <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800">
              <p className="text-xs text-slate-400 text-center">
                Mọi người nhận được link sẽ có thể xem hồ sơ của bạn với giao diện đầy đủ
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
