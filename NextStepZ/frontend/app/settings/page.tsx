'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Quay lại</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
            Cài đặt tài khoản
          </h1>
          <p className="text-gray-400">
            Quản lý cài đặt tài khoản của bạn tại đây
          </p>
        </motion.div>
      </div>
    </div>
  );
}
