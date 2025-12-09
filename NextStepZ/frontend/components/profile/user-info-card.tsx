'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditUserInfoDialog from './edit-user-info-dialog';

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
  const [currentData, setCurrentData] = useState({ avatar, name, email, bio });

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
          <div className="flex items-start justify-between">
            <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>Thông tin tài khoản</CardTitle>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditClick}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              aria-label="Edit profile"
            >
              <Edit2 className="w-4 h-4 text-cyan-400" />
            </motion.button>
          </div>
        </CardHeader>

        <CardContent>
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
                      src={currentData.avatar}
                      alt={currentData.name}
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
            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                {currentData.name}
              </h2>
              <p className="text-cyan-400 text-xs sm:text-base mb-2 sm:mb-3 break-all" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                {currentData.email}
              </p>
              <p className="text-gray-300 text-xs sm:text-base line-clamp-3" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                {currentData.bio}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="default"
              className="w-full sm:flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base py-2 sm:py-3"
              onClick={handleEditClick}
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Chỉnh sửa thông tin
            </Button>
            <Link href="/public-profile" className="w-full sm:flex-1">
              <Button
                variant="outline"
                className="w-full border-slate-600 hover:bg-slate-700 text-xs sm:text-base py-2 sm:py-3"
                style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
              >
                Xem hồ sơ công khai
              </Button>
            </Link>
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
    </>
  );
}
