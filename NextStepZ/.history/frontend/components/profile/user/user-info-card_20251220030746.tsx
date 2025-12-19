'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditUserInfoDialog from './edit-user-info-dialog';
import SharePublicProfileDialog from './share-public-profile-dialog';

interface UserInfoCardProps {
  avatar?: string;
  name?: string;
  email?: string;
  bio?: string;
  onEditClick?: () => void;
  onAvatarChange?: (file: File) => void;
  onSaveUserInfo?: (data: { avatar: string; name: string; email: string; bio: string }) => void;
}

export default function UserInfoCard({
  avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
  name = 'Nguyễn Văn A',
  email = 'user@example.com',
  bio = 'Frontend Developer | Creative Designer',
  onEditClick,
  onAvatarChange,
  onSaveUserInfo,
}: UserInfoCardProps) {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [currentData, setCurrentData] = useState({ 
    avatar: avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    name: name || 'Nguyễn Văn A',
    email: email || 'user@example.com',
    bio: bio || ''
  });

  const handleEditClick = () => {
    setIsDialogOpen(true);
    onEditClick?.();
  };

  const handleSaveUserInfo = (data: { avatar: string; name: string; email: string; bio: string }) => {
    setCurrentData(data);
    onSaveUserInfo?.(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange?.(file);
    }
  };

  return (
    <>
      <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>Thông tin tài khoản</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Account Type Badge */}
          <div className="mb-4 pb-4 border-b border-slate-700">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
              Loại tài khoản
            </p>
            <p className="text-lg font-medium text-cyan-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
              Sinh viên
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 items-start">
            {/* Avatar Section */}
            <div className="w-full flex justify-center sm:justify-start">
              <div className="relative group">
                <motion.div
                  onHoverStart={() => setIsHoveringAvatar(true)}
                  onHoverEnd={() => setIsHoveringAvatar(false)}
                  className="relative"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-lg relative mx-auto sm:mx-0">
                    <Image
                      src={currentData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                      alt={currentData.name || 'Avatar'}
                      fill
                      className="object-cover"
                      priority={false}
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  </div>

                  {/* Avatar Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHoveringAvatar ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 rounded-2xl cursor-pointer"
                  />
                </motion.div>
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full space-y-3 sm:space-y-4">
              {/* Full Name */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Họ tên đầy đủ
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}>
                  {currentData.name}
                </h2>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Email
                </p>
                <p className="text-sm text-gray-300 break-all" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                  {currentData.email}
                </p>
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                  Mô tả cá nhân
                </p>
                <p className="text-sm text-gray-300 line-clamp-3" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                  {currentData.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEditClick}
                  className="px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-colors text-sm font-medium"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  Chỉnh sửa thông tin
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsShareDialogOpen(true)}
                  className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                >
                  <Globe className="w-4 h-4" />
                  Xem hồ sơ công khai
                </motion.button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditUserInfoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={{
          avatar: currentData.avatar,
          name: currentData.name,
          email: currentData.email,
          bio: currentData.bio,
        }}
        onSave={handleSaveUserInfo}
      />

      {/* Share Public Profile Dialog */}
      <SharePublicProfileDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        userProfile={{
          name: currentData.name,
          bio: currentData.bio,
        }}
        shareUrl={typeof window !== 'undefined' ? `${window.location.origin}/public-profile` : ''}
      />
    </>
  );
}
