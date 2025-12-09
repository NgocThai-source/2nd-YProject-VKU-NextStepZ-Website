'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Edit2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditPersonalInfoDialog from './edit-personal-info-dialog';

interface PersonalInfo {
  fullName: string;
  phone: string;
  birthDate: string;
  city: string;
  district: string;
  socialLinks: {
    id: string;
    platform: string;
    url: string;
  }[];
}

interface PersonalInfoCardProps {
  data?: PersonalInfo;
  onUpdate?: (data: PersonalInfo) => void;
}

export type { PersonalInfo };

export default function PersonalInfoCard({
  data = {
    fullName: 'Nguyễn Văn A',
    phone: '+84 912 345 678',
    birthDate: '1999-01-15',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    socialLinks: [
      {
        id: '1',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/user',
      },
      {
        id: '2',
        platform: 'GitHub',
        url: 'https://github.com/user',
      },
    ],
  },
  onUpdate,
}: PersonalInfoCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayData, setDisplayData] = useState<PersonalInfo>(data);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleSavePersonalInfo = (newData: PersonalInfo) => {
    setDisplayData(newData);
    onUpdate?.(newData);
  };

  const infoItems = [
    { icon: User, label: 'Họ tên đầy đủ', key: 'fullName' as const },
    { icon: Phone, label: 'Số điện thoại', key: 'phone' as const },
    { icon: Calendar, label: 'Ngày sinh', key: 'birthDate' as const },
  ];

  return (
    <>
      <Card className="bg-linear-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
            Thông tin cá nhân
          </CardTitle>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditClick}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            aria-label="Edit"
          >
            <Edit2 className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, idx) => {
              const IconComponent = item.icon;
              const value = displayData[item.key as keyof PersonalInfo] as string;

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="shrink-0 mt-1">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {value || 'Chưa cập nhật'}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* City & District */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-start gap-3"
            >
              <div className="shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                  Địa chỉ
                </p>
                <p className="text-sm sm:text-base text-white font-medium" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                  {displayData.district && displayData.city
                    ? `${displayData.district}, ${displayData.city}`
                    : displayData.city || 'Chưa cập nhật'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 pt-6 border-t border-slate-700"
          >
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
              <LinkIcon className="w-4 h-4 text-cyan-400" />
              Liên kết xã hội
            </h3>

            <div className="space-y-2">
              <AnimatePresence>
                {displayData.socialLinks.length > 0 ? (
                  displayData.socialLinks.map((link, idx) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                          {link.platform}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors truncate block"
                          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                        >
                          {link.url}
                        </a>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 py-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                    Chưa có liên kết nào
                  </p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 mt-6 pt-4 border-t border-slate-700"
          >
            <Button
              onClick={handleEditClick}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Chỉnh sửa
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditPersonalInfoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={displayData}
        onSave={handleSavePersonalInfo}
      />
    </>
  );
}
