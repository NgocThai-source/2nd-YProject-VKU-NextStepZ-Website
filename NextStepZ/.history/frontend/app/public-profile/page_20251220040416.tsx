'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, UserPlus, MessageSquare, Flag, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile } from '@/lib/profile-context';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/components/ui/toast';
import { UserForumPosts, SharePublicProfileDialog } from '@/components/profile/user';
import { ShareEmployerPublicProfileDialog, EmployerJobPostings, EmployerActivity } from '@/components/profile/employer';

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
  const { user } = useAuth();
  const { userProfile, careerProfile, employerProfile, publicProfile, isLoading } = useProfile();
  const { addToast } = useToast();
  const [isFriendRequested, setIsFriendRequested] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const isEmployer = user?.role === 'employer';

  // Listen for profile updates to trigger re-render
  useEffect(() => {
    const handleUserProfileUpdated = () => {
      // Trigger re-render
    };

    const handleEmployerProfileUpdated = () => {
      // Trigger re-render
    };

    const handleCareerProfileUpdated = () => {
      // Trigger re-render
    };

    window.addEventListener('userProfileUpdated', handleUserProfileUpdated);
    window.addEventListener('employerProfileUpdated', handleEmployerProfileUpdated);
    window.addEventListener('careerProfileUpdated', handleCareerProfileUpdated);

    return () => {
      window.removeEventListener('userProfileUpdated', handleUserProfileUpdated);
      window.removeEventListener('employerProfileUpdated', handleEmployerProfileUpdated);
      window.removeEventListener('careerProfileUpdated', handleCareerProfileUpdated);
    };
  }, []);

  const handleShare = () => {
    setIsShareDialogOpen(true);
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

  if (isLoading || !userProfile || (!isEmployer && !careerProfile)) {
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
          </div>
        </div>
      </header>

      {/* Share Dialog */}
      {isEmployer ? (
        <ShareEmployerPublicProfileDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          employerProfile={{
            companyName: userProfile.name,
            email: userProfile.email,
          }}
        />
      ) : (
        <SharePublicProfileDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          userProfile={userProfile || undefined}
          publicProfile={publicProfile || undefined}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isEmployer && employerProfile ? (
          // ========== EMPLOYER PUBLIC PROFILE ==========
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Logo & Company Name */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-xl">
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
                          Nhà tuyển dụng
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddFriend}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all border ${
                        isFriendRequested
                           ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/50 hover:border-cyan-400 text-cyan-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 border-green-400/50 hover:border-green-400 text-green-400'
                          }`}
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      {isFriendRequested ? (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Hủy theo dõi
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Theo dõi
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
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${userProfile.email}`}
                        className="text-sm text-amber-400 hover:text-amber-300 break-all"
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
                        className="text-sm text-amber-400 hover:text-amber-300"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        {userProfile.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Địa chỉ trụ sở
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {employerProfile.address || 'Chưa cập nhật'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* About Section */}
              {employerProfile.about && (
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Giới thiệu công ty
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {employerProfile.about}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Company Info */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Thông tin công ty
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Lĩnh vực hoạt động
                      </p>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {employerProfile.industry}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Quy mô công ty
                      </p>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {employerProfile.companySize}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Năm thành lập
                      </p>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {employerProfile.foundingYear}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Website công ty
                      </p>
                      <a
                        href={employerProfile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-amber-400 hover:text-amber-300"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        {employerProfile.website}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Postings */}
              <EmployerJobPostings
                postings={employerProfile?.jobPostings || []}
                totalPostings={employerProfile?.jobPostings.length || 0}
                onViewAllClick={() => {}}
              />

              {/* Employer Activity */}
              <EmployerActivity
                posts={[
                  {
                    id: '1',
                    title: 'Chia sẻ kinh nghiệm tuyển dụng lập trình viên giỏi',
                    excerpt: 'Sau 5 năm kinh nghiệm tuyển dụng, tôi muốn chia sẻ những mẹo hiệu quả...',
                    category: 'Chia sẻ kinh nghiệm',
                    postDate: '3 ngày trước',
                    engagement: {
                      likes: 125,
                      comments: 23,
                      shares: 8,
                    },
                  },
                  {
                    id: '2',
                    title: 'Công ty chúng tôi đang tuyển dụng 10 vị trí',
                    excerpt: 'Chúng tôi đang tìm kiếm các lập trình viên, designer và product manager...',
                    category: 'Tuyển dụng',
                    postDate: '1 tuần trước',
                    engagement: {
                      likes: 89,
                      comments: 15,
                      shares: 12,
                    },
                  },
                  {
                    id: '3',
                    title: 'Thảo luận: Xu hướng công nghệ 2024',
                    excerpt: 'AI, blockchain, và web3 đang là những xu hướng nóng nhất...',
                    category: 'Thảo luận',
                    postDate: '2 tuần trước',
                    engagement: {
                      likes: 234,
                      comments: 42,
                      shares: 19,
                    },
                  },
                ]}
                totalPosts={8}
                onViewAllClick={() => {}}
              />
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Interest Level */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Mức độ quan tâm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Lượt xem trang</span>
                      <span className="text-amber-400 font-bold">2.4K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Lượt theo dõi</span>
                      <span className="text-amber-400 font-bold">156</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Verification Status */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Trạng thái xác thực
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Chưa xác thực
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // ========== USER PUBLIC PROFILE ==========
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Avatar & Name */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-cyan-400/50 shadow-xl">
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
                        <p className="text-gray-400 text-sm line-clamp-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                          {userProfile.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddFriend}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all border ${
                        isFriendRequested
                          ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/50 hover:border-cyan-400 text-cyan-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 border-green-400/50 hover:border-green-400 text-green-400'
                      }`}
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      {isFriendRequested ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Hủy theo dõi
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Theo dõi
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
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardContent className="p-6 space-y-3">
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
                      <p className="text-sm text-cyan-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {userProfile.phone || 'Chưa cập nhật'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Địa chỉ
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {userProfile.district ? `${userProfile.district}, ${userProfile.city}` : 'Chưa cập nhật'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Objective */}
              {careerProfile?.objective && (
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Mục tiêu nghề nghiệp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {careerProfile.objective}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Experience */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Kinh nghiệm làm việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerProfile?.experiences && careerProfile.experiences.length > 0 ? (
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
                  {careerProfile?.skills && careerProfile.skills.length > 0 ? (
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
                  {careerProfile?.education && careerProfile.education.length > 0 ? (
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

              {/* Forum Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <UserForumPosts
                  userId={userProfile.email}
                  userName={userProfile.name}
                  maxPosts={5}
                />
              </motion.div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Social Links */}
                {userProfile.socialLinks && userProfile.socialLinks.length > 0 && (
                  <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-sm" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                        Liên kết xã hội
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {userProfile.socialLinks.map((link: { id: string; platform: string; url: string }) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                        >
                          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                            {link.platform}
                          </p>
                          <p className="text-sm text-cyan-400 truncate" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                            {link.url}
                          </p>
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Profile Stats */}
                {careerProfile && (
                  <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white text-sm" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                        Mức độ quan tâm
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Lượt xem trang</span>
                        <span className="text-cyan-400 font-bold">1.2K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Lượt theo dõi</span>
                        <span className="text-cyan-400 font-bold">89</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
