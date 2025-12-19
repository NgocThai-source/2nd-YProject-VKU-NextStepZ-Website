'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DEFAULT_LOGO = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Company';

// Helper function to validate URL
const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to get safe logo URL
const getSafeLogoUrl = (url?: string): string => {
  if (isValidUrl(url)) return url;
  return DEFAULT_LOGO;
};

interface EditEmployerInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    companyLogo: string;
    companyName: string;
    email: string;
    phone: string;
  };
  onSave?: (data: {
    companyLogo: string;
    companyName: string;
    email: string;
    phone: string;
  }) => void;
}

export default function EditEmployerInfoDialog({
  isOpen,
  onClose,
  data,
  onSave,
}: EditEmployerInfoDialogProps) {
  const [formData, setFormData] = useState(data ? {
    companyLogo: getSafeLogoUrl(data.companyLogo),
    companyName: data.companyName || 'Công ty TNHH ABC',
    email: data.email || 'company@example.com',
    phone: data.phone || '+84 28 1234 5678',
  } : {
    companyLogo: DEFAULT_LOGO,
    companyName: 'Công ty TNHH ABC',
    email: 'company@example.com',
    phone: '+84 28 1234 5678',
  });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          companyLogo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      onSave?.(formData);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl bg-linear-to-br from-slate-900 to-slate-800 border-slate-700 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-linear-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <DialogTitle
              className="text-xl md:text-2xl font-bold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
            >
              Chỉnh sửa thông tin công ty
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto"
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center space-y-4"
          >
            <label className="block text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
              Logo công ty
            </label>
            <div
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              className="relative group"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl">
                <Image
                  src={getSafeLogoUrl(formData.companyLogo)}
                  alt="Company Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveringLogo ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center cursor-pointer"
              >
                <Camera className="w-8 h-8 text-white" />
              </motion.div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="absolute inset-0 rounded-2xl cursor-pointer" />
            </div>
            <p className="text-xs text-gray-400 text-center" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
              Nhấp để chọn ảnh mới
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-slate-700 via-cyan-400/20 to-slate-700" />

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Company Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                Tên công ty
              </label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Nhập tên công ty của bạn"
                className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 text-sm md:text-base"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                Email doanh nghiệp
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email công ty của bạn"
                className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 text-sm md:text-base"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                Số điện thoại doanh nghiệp
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+84 28 1234 5678"
                className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400 text-sm md:text-base"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <DialogFooter className="bg-slate-800/50 border-t border-slate-700 px-6 py-4 gap-2 sm:gap-3">
          <motion.div
            className="flex flex-col-reverse sm:flex-row gap-2 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm md:text-base py-2 md:py-3 transition-colors"
              disabled={isSaving}
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base py-2 md:py-3 transition-colors"
              disabled={isSaving}
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Đặt lại
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm md:text-base py-2 md:py-3 disabled:opacity-50 transition-colors"
              disabled={isSaving}
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
