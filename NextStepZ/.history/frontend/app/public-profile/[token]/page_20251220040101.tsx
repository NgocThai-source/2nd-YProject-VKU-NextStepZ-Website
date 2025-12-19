'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, UserPlus, MessageSquare, Flag, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { API_URL } from '@/lib/api';

interface PublicProfileData {
  id: string;
  userId: string;
  shareToken: string;
  isActive: boolean;
  viewCount: number;
  profile: {
    id: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    socialLinks?: Array<{
      id: string;
      platform: string;
      url: string;
    }>;
    user?: {
      id: string;
      username: string;
      role: string;
    };
  };
}

export default function PublicProfileTokenPage() {
  const params = useParams();
  const token = params.token as string;
  const { addToast } = useToast();
  const [publicProfile, setPublicProfile] = useState<PublicProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFriendRequested, setIsFriendRequested] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const isEmployer = publicProfile?.profile?.user?.role === 'employer';

  // Fetch public profile by token
  useEffect(() => {
    const loadPublicProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/profiles/public/share/${token}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Hồ sơ công khai không tồn tại');
          } else if (response.status === 400) {
            setError('Hồ sơ công khai này không còn khả dụng');
          } else {
            setError('Không thể tải hồ sơ công khai');
          }
          return;
        }

        const data = await response.json();
        setPublicProfile(data);
      } catch (err) {
        console.error('Failed to load public profile:', err);
        setError('Có lỗi khi tải hồ sơ công khai');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      loadPublicProfile();
    }
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
    setIsShareDialogOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-gray-400">Đang tải hồ sơ...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Lỗi tải hồ sơ</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Data not found
  if (!publicProfile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Không tìm thấy hồ sơ</h2>
          <p className="text-gray-400 mb-6">Hồ sơ bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const profile = publicProfile.profile;
  const fullName = profile.firstName && profile.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : profile.user?.username || 'Người dùng ẩn danh';

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
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
              {/* Avatar & Name */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col items-center text-center">
                    {profile.avatar && (
                      <Image
                        src={profile.avatar}
                        alt={fullName}
                        width={120}
                        height={120}
                        className="w-24 h-24 rounded-full border-2 border-cyan-500 object-cover mb-4"
                      />
                    )}
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      {fullName}
                    </h2>
                    {profile.title && (
                      <p className="text-cyan-400 text-sm mt-1">{profile.title}</p>
                    )}
                    {profile.bio && (
                      <p className="text-gray-400 text-sm mt-2 line-clamp-3">{profile.bio}</p>
                    )}
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
                    className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    {isFriendRequested ? 'Hủy lời mời' : 'Kết bạn'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMessage}
                    className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Nhắn tin
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReport}
                    className="w-full px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                  >
                    <Flag className="w-4 h-4" />
                    Báo cáo
                  </motion.button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-3">
                  {profile.email && (
                    <div className="flex items-start gap-3">
                      <div className="text-gray-400 text-sm font-medium min-w-fit">Email:</div>
                      <div className="text-cyan-400 text-sm break-all">{profile.email}</div>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-start gap-3">
                      <div className="text-gray-400 text-sm font-medium min-w-fit">Điện thoại:</div>
                      <div className="text-cyan-400 text-sm">{profile.phone}</div>
                    </div>
                  )}
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
            {/* Bio Section */}
            {profile.bio && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Giới thiệu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {profile.experience && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Kinh nghiệm làm việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="whitespace-pre-wrap">{profile.experience}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Kỹ năng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {profile.education && (
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                    Giáo dục
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="whitespace-pre-wrap">{profile.education}</p>
                </CardContent>
              </Card>
            )}
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
              {profile.socialLinks && profile.socialLinks.length > 0 && (
                <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                      Liên kết xã hội
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {profile.socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-cyan-400 hover:text-cyan-300 transition-colors text-sm truncate"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* View Count */}
              <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Lượt xem</p>
                      <p className="text-2xl font-bold text-white">{publicProfile.viewCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
