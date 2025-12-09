'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import UserInfoCard from '@/components/profile/user-info-card';
import PersonalInfoCard from '@/components/profile/personal-info-card';
import CareerProfileCard, { type CareerProfileData } from '@/components/profile/career-profile-card';
import { useProfile } from '@/lib/profile-context';

export default function ProfilePage() {
  const [userInfoEdit, setUserInfoEdit] = useState(false);
  const { userProfile, careerProfile, updateUserProfile, updateCareerProfile } = useProfile();

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

  if (!userProfile || !careerProfile) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Đang tải...</div>
      </div>
    );
  }

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
            Trang cá nhân
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
          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* User Info Card */}
            <UserInfoCard
              avatar={userProfile.avatar}
              name={userProfile.name}
              email={userProfile.email}
              bio={userProfile.bio}
              onEditClick={() => setUserInfoEdit(!userInfoEdit)}
              onAvatarChange={(file) => {
                console.log('Avatar changed:', file);
              }}
              onSaveUserInfo={handleUserInfoSave}
            />

            {/* Personal Info Card */}
            <PersonalInfoCard
              data={{
                fullName: userProfile.name,
                phone: userProfile.phone,
                birthDate: userProfile.birthDate,
                city: userProfile.city,
                district: userProfile.district,
                socialLinks: userProfile.socialLinks,
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
            <CareerProfileCard
              data={careerProfile}
              onUpdate={handleCareerProfileUpdate}
            />
          </motion.div>
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
