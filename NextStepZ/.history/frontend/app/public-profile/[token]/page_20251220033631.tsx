'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, MessageSquare, Flag, UserCheck, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { API_URL } from '@/lib/api';

interface SharedProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  province: string;
  school: string;
  major: string;
  title: string;
  skills: string[];
  experience: string;
  education: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

interface SharedPublicProfile {
  id: string;
  profileId: string;
  userId: string;
  shareToken: string;
  isActive: boolean;
  viewCount: number;
  sharedAt: string;
  profile?: SharedProfile;
}

export default function PublicProfileSharePage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const token = params?.token as string;

  const [profile, setProfile] = useState<SharedPublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFriendRequested, setIsFriendRequested] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Không tìm thấy token chia sẻ');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profiles/public/share/${token}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Hồ sơ công khai không tồn tại hoặc đã bị xóa');
          } else {
            setError('Không thể tải hồ sơ công khai');
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setProfile(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch shared profile:', err);
        setError('Lỗi khi tải hồ sơ công khai');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

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

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/public-profile/${token}`;
    navigator.clipboard.writeText(shareUrl);
    addToast('Đã sao chép liên kết hồ sơ!', 'success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-gray-400">Đang tải hồ sơ...</div>
      </div>
    );
  }

  if (error || !profile || !profile.profile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>Quay lại</span>
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">{error}</h1>
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Quay lại trang chủ
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const userData = profile.profile;
  const fullName = userData.firstName && userData.lastName 
    ? `${userData.firstName} ${userData.lastName}` 
    : 'Người dùng';

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>Quay lại</span>
          </Link>
          <div className="text-sm text-gray-400">
            Lượt xem: {profile.viewCount}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {/* Profile Card */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl">
                      <Image
                        src={userData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                        alt={fullName}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                        {fullName}
                      </h1>
                      <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {userData.title || 'Sinh viên'}
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
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 hover:border-purple-400 text-purple-400 transition-all"
                    style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
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
                  {userData.email && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${userData.email}`}
                        className="text-sm text-cyan-400 hover:text-cyan-300 break-all"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        {userData.email}
                      </a>
                    </div>
                  )}
                  {userData.phone && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Số điện thoại
                      </p>
                      <a
                        href={`tel:${userData.phone}`}
                        className="text-sm text-cyan-400 hover:text-cyan-300"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        {userData.phone}
                      </a>
                    </div>
                  )}
                  {userData.province && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        Tỉnh/Thành phố
                      </p>
                      <p className="text-sm text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {userData.province}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Bio */}
            {userData.bio && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Giới thiệu
                  </h2>
                  <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    {userData.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {userData.school && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Học vấn
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      <span className="font-semibold">{userData.school}</span>
                    </p>
                    {userData.major && (
                      <p className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        Chuyên ngành: {userData.major}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {userData.experience && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Kinh nghiệm
                  </h2>
                  <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    {userData.experience}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {userData.skills && userData.skills.length > 0 && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Kỹ năng
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-sm"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
