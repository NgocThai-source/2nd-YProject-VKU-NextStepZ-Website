'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, BookOpen } from 'lucide-react';
import { usePublicProfile } from '@/lib/use-public-profile';

interface PublicProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  province?: string;
  school?: string;
  major?: string;
  title?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const shareToken = params.token as string;
  const { getPublicProfileByToken } = usePublicProfile();

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        setLoading(true);
        const data = await getPublicProfileByToken(shareToken);
        setProfile(data.profile);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Không tìm thấy profile'
        );
      } finally {
        setLoading(false);
      }
    };

    if (shareToken) {
      fetchPublicProfile();
    }
  }, [shareToken, getPublicProfileByToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">❌ {error}</p>
          <button
            onClick={() => router.back()}
            className="text-cyan-400 hover:text-cyan-300"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center">
        <p className="text-gray-400">Không tìm thấy profile</p>
      </div>
    );
  }

  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Avatar & Name */}
          <div className="text-center space-y-4">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={profile.avatar || DEFAULT_AVATAR}
              alt={fullName}
              className="w-32 h-32 rounded-full mx-auto border-4 border-cyan-400/30 shadow-lg"
            />

            <div>
              <h1
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                {fullName || 'Anonymous'}
              </h1>

              {profile.title && (
                <p className="text-xl text-cyan-300 mt-2">{profile.title}</p>
              )}

              <p className="text-gray-400 text-sm mt-1">@{profile.user.username}</p>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg"
            >
              <p
                className="text-gray-300"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                {profile.bio}
              </p>
            </motion.div>
          )}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {profile.email && (
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Email</p>
                  <p className="text-gray-300">{profile.email}</p>
                </div>
              </div>
            )}

            {profile.phone && (
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Điện thoại</p>
                  <p className="text-gray-300">{profile.phone}</p>
                </div>
              </div>
            )}

            {profile.province && (
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Địa chỉ</p>
                  <p className="text-gray-300">{profile.province}</p>
                </div>
              </div>
            )}

            {profile.school && (
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Trường học</p>
                  <p className="text-gray-300">{profile.school}</p>
                </div>
              </div>
            )}

            {profile.major && (
              <div className="p-4 bg-slate-800/30 rounded-lg flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Ngành học</p>
                  <p className="text-gray-300">{profile.major}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                🎯 Kỹ Năng
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience */}
          {profile.experience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                💼 Kinh Nghiệm
              </h3>
              <p className="text-gray-300">{profile.experience}</p>
            </motion.div>
          )}

          {/* Education */}
          {profile.education && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                🎓 Học Vấn
              </h3>
              <p className="text-gray-300">{profile.education}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
