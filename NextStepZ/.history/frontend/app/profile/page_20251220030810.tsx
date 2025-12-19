'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useProfile } from '@/lib/profile-context';

// User Profile Components
import {
  UserInfoCard,
  PersonalInfoCard,
  CareerProfileCard,
  UserActivity,
  type CareerProfileData,
} from '@/components/profile/user';

// Employer Profile Components
import {
  EmployerInfoCard,
  EmployerCompanyInfo,
  EmployerAbout,
  EmployerJobPostings,
  EmployerActivity,
} from '@/components/profile/employer';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [userInfoEdit, setUserInfoEdit] = useState(false);
  const { userProfile, careerProfile, employerProfile, updateUserProfile, updateCareerProfile, updateEmployerProfile } = useProfile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleUserInfoSave = (data: { avatar: string; name: string; email: string; bio: string }) => {
    updateUserProfile({
      avatar: data.avatar,
      name: data.name,
      email: data.email,
      bio: data.bio,
    });
  };

  const handleCareerProfileUpdate = (data: CareerProfileData) => {
    updateCareerProfile(data);
  };

  // Loading state
  if (isAuthLoading || !userProfile) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Đang tải...</div>
      </div>
    );
  }

  // Check if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-gray-400">Vui lòng đăng nhập để xem trang cá nhân</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/auth')}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            Đăng nhập
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const isEmployer = user && user.role === 'employer';

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="text-xs sm:text-sm font-medium">Quay lại</span>
          </Link>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
          >
            {isEmployer ? 'Trang cá nhân' : 'Trang cá nhân'}
          </motion.h1>

          <div className="hidden sm:block w-12" />
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          {/* Employer Profile */}
          {isEmployer ? (
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Employer Info Card */}
              <EmployerInfoCard
                companyLogo={userProfile?.avatar}
                companyName={userProfile?.name}
                email={userProfile?.email}
                phone={userProfile?.phone}
                isVerified={false}
                onEditClick={() => setUserInfoEdit(!userInfoEdit)}
                onAvatarChange={(file) => {
                  console.log('Company logo changed:', file);
                }}
              />

              {/* Employer Company Info */}
              <EmployerCompanyInfo
                data={employerProfile ? {
                  companyName: employerProfile.companyName,
                  industry: employerProfile.industry,
                  companySize: employerProfile.companySize as '10-50' | '50-200' | '200-500' | '500+',
                  address: employerProfile.address,
                  website: employerProfile.website,
                  foundingYear: employerProfile.foundingYear,
                } : undefined}
                onEditClick={() => setUserInfoEdit(!userInfoEdit)}
              />

              {/* Employer About */}
              <EmployerAbout
                description={employerProfile?.about}
                onEditClick={() => setUserInfoEdit(!userInfoEdit)}
              />

              {/* Employer Job Postings */}
              <EmployerJobPostings
                postings={employerProfile?.jobPostings || []}
                totalPostings={employerProfile?.jobPostings.length || 0}
                onViewAllClick={() => router.push('/companies')}
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
                onViewAllClick={() => router.push('/community')}
              />
            </motion.div>
          ) : (
            /* User Profile */
            <motion.div variants={itemVariants} className="space-y-6">
              {/* User Info Card */}
              <UserInfoCard
                avatar={userProfile?.avatar}
                name={userProfile?.name}
                email={userProfile?.email}
                bio={userProfile?.bio}
                onEditClick={() => setUserInfoEdit(!userInfoEdit)}
                onAvatarChange={(file) => {
                  console.log('Avatar changed:', file);
                }}
                onSaveUserInfo={handleUserInfoSave}
              />

              {/* Personal Info Card */}
              <PersonalInfoCard
                data={{
                  fullName: userProfile?.name,
                  phone: userProfile?.phone,
                  birthDate: userProfile?.birthDate,
                  city: userProfile?.city,
                  district: userProfile?.district,
                  socialLinks: userProfile?.socialLinks,
                }}
                onUpdate={(data) => {
                  updateUserProfile({
                    phone: data.phone,
                    birthDate: data.birthDate,
                    city: data.city,
                    district: data.district,
                    socialLinks: data.socialLinks,
                  });
                }}
              />

              {/* Career Profile Card */}
              {careerProfile && (
                <CareerProfileCard
                  data={careerProfile}
                  onUpdate={handleCareerProfileUpdate}
                />
              )}

              {/* User Activity */}
              <UserActivity
                posts={[
                  {
                    id: '1',
                    title: 'Kinh nghiệm phỏng vấn tại các công ty tech lớn',
                    excerpt: 'Tôi vừa hoàn thành các vòng phỏng vấn tại Google, Meta và Amazon. Muốn chia sẻ...',
                    category: 'Chia sẻ kinh nghiệm',
                    postDate: '5 ngày trước',
                    engagement: {
                      likes: 89,
                      comments: 34,
                      shares: 12,
                    },
                  },
                  {
                    id: '2',
                    title: 'Mẹo học React hooks hiệu quả',
                    excerpt: 'Sau 2 năm làm việc với React, tôi tìm ra cách học hooks một cách...',
                    category: 'Chia sẻ kinh nghiệm',
                    postDate: '2 tuần trước',
                    engagement: {
                      likes: 156,
                      comments: 42,
                      shares: 23,
                    },
                  },
                  {
                    id: '3',
                    title: 'Nên chọn startup hay công ty lớn?',
                    excerpt: 'Tôi đang bối rối giữa việc nhận offer từ startup và công ty Fortune 500...',
                    category: 'Thảo luận',
                    postDate: '3 tuần trước',
                    engagement: {
                      likes: 234,
                      comments: 67,
                      shares: 18,
                    },
                  },
                ]}
                totalPosts={12}
                onViewAllClick={() => router.push('/community')}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden sm:block mt-12 text-center text-gray-500 text-sm"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
