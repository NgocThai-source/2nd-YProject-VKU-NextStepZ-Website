'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePublicProfile } from '@/lib/use-public-profile';

interface ShareProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareProfileDialog({
  isOpen,
  onClose,
}: ShareProfileDialogProps) {
  const { shareLink, publicProfile, copyShareLink, isLoading } =
    usePublicProfile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyShareLink()) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenLink = () => {
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
  };

  if (!publicProfile || !shareLink) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle
            className="text-white"
            style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
          >
            📤 Chia Sẻ Profile
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Share Link Display */}
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <p
              className="text-xs text-gray-400 mb-2 uppercase tracking-wide"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Link Chia Sẻ
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-black border border-slate-600 text-cyan-300 px-3 py-2 rounded text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  copied
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
            {copied && (
              <p className="text-xs text-green-400 mt-2">✓ Đã copy vào clipboard</p>
            )}
          </div>

          {/* Share Info */}
          <div className="p-4 bg-slate-800 rounded-lg">
            <p
              className="text-sm text-gray-300 mb-3"
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            >
              Bất cứ ai có link này đều có thể xem profile công khai của bạn:
            </p>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>✓ Họ tên, ảnh đại diện</li>
              <li>✓ Thông tin liên hệ</li>
              <li>✓ Học vấn, kỹ năng</li>
              <li>✓ Không thể chỉnh sửa thông tin của bạn</li>
            </ul>
          </div>

          {/* View Count */}
          <div className="text-center py-3 border-t border-slate-700">
            <p className="text-xs text-gray-400">Lượt xem</p>
            <p className="text-lg font-bold text-cyan-300">
              {publicProfile.viewCount}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenLink}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Xem Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Đóng
            </motion.button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
