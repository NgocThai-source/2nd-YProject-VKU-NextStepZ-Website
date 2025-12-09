'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, UserPlus, MessageSquare, Flag, UserCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile } from '@/lib/profile-context';
import { useToast } from '@/components/ui/toast';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const skillLevelColors = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-cyan-500',
  advanced: 'bg-purple-500',
  expert: 'bg-pink-500',
};

const skillLevels = {
  beginner: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
  expert: 'Chuyên gia',
};

export default function PublicProfilePage() {
  const { userProfile, careerProfile, isLoading } = useProfile();
  const { addToast } = useToast();
  const [isFriendRequested, setIsFriendRequested] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Hồ sơ của ${userProfile?.name}`,
        text: userProfile?.bio,
        url: window.location.href,
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      addToast('Đã sao chép liên kết hồ sơ!', 'success');
    }
  };

  const handleDownloadPDF = () => {
    addToast('Tính năng tải PDF sẽ được cập nhật sớm!', 'info');
  };

  const handleAddFriend = () => {
    if (isFriendRequested) {
      addToast('Đã hủy lời mời kết bạn!', 'warning');
      setIsFriendRequested(false);
    } else {
      addToast('Lời mời kết bạn đã được gửi!', 'success');
      setIsFriendRequested(true);
    }
  };

  const handleMessage = () => {
    addToast('Chuyển hướng đến trang nhắn tin...', 'info');
  };

  const handleReport = () => {
    addToast('Báo cáo hồ sơ đã được gửi. Cảm ơn bạn!', 'warning');
  };

  if (isLoading || !userProfile || !careerProfile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-gray-400">Đang tải hồ sơ...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>Quay lại</span>
          </Link>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-cyan-400"
              title="Chia sẻ hồ sơ"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-cyan-400"
              title="Tải PDF"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700 sticky top-24">
              <CardContent className="p-6 space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl">
                    <Image
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      {userProfile.name}
                    </h1>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {userProfile.bio}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 border-t border-slate-700 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddFriend}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all border ${
                      isFriendRequested
                        ? 'bg-green-500/20 hover:bg-green-500/30 border-green-400/50 hover:border-green-400 text-green-400'
                        : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/50 hover:border-cyan-400 text-cyan-400'
                    }`}
                    style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  >
                    {isFriendRequested ? (
                      <>
                        <UserCheck className="w-4 h-4" />
                        Hủy kết bạn
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Kết bạn
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMessage}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 hover:border-blue-400 text-blue-400 transition-all"
                    style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Nhắn tin
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReport}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 hover:border-red-400 text-red-400 transition-all"
                    style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  >
                    <Flag className="w-4 h-4" />
                    Báo cáo
                  </motion.button>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 border-t border-slate-700 pt-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${userProfile.email}`}
                      className="text-sm text-cyan-400 hover:text-cyan-300 break-all"
                      style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                    >
                      {userProfile.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                      Số điện thoại
                    </p>
                    <a
                      href={`tel:${userProfile.phone}`}
                      className="text-sm text-cyan-400 hover:text-cyan-300"
                      style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                    >
                      {userProfile.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                      Địa chỉ
                    </p>
                    <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {userProfile.district}, {userProfile.city}
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                {userProfile.socialLinks.length > 0 && (
                  <div className="space-y-2 border-t border-slate-700 pt-6">
                    <p className="text-xs font-semibold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Liên kết xã hội
                    </p>
                    {userProfile.socialLinks.map((link: { id: string; platform: string; url: string }) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                      >
                        <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                          {link.platform}
                        </p>
                        <p className="text-sm text-cyan-400 truncate" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                          {link.url}
                        </p>
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content - Experience, Skills, Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Experience */}
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Kinh nghiệm làm việc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerProfile.experiences.length > 0 ? (
                  careerProfile.experiences.map((exp, idx) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                            {exp.position}
                          </h3>
                          <p className="text-cyan-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                            {exp.company}
                          </p>
                        </div>
                        {exp.isCurrent && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold whitespace-nowrap" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                            Hiện tại
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {exp.startDate} - {exp.endDate || (exp.isCurrent ? 'Hiện tại' : 'N/A')}
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {exp.description}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Chưa có kinh nghiệm
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Kỹ năng
                </CardTitle>
              </CardHeader>
              <CardContent>
                {careerProfile.skills.length > 0 ? (
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {careerProfile.skills.map((skill: Skill, idx: number) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${
                          skillLevelColors[skill.level]
                        }`}
                        style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                      >
                        {skill.name}
                        <span className="text-xs opacity-75">({skillLevels[skill.level]})</span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Chưa có kỹ năng
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Học vấn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerProfile.education.length > 0 ? (
                  careerProfile.education.map((edu, idx) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <h3 className="font-semibold text-white mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                        {edu.school}
                      </h3>
                      <p className="text-cyan-400 text-sm mb-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {edu.degree}
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {edu.field} • {edu.graduationYear}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Chưa có học vấn
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
