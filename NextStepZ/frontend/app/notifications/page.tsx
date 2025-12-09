'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MOCK_NOTIFICATIONS, getTimeAgo, getNotificationIcon } from '@/lib/notifications';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotificationsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Quay lại</span>
          </Link>
          <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2">
            Trung tâm thông báo
          </h1>
          <p className="text-gray-400">
            Bạn có {unreadCount} thông báo chưa đọc
          </p>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {MOCK_NOTIFICATIONS.length > 0 ? (
            MOCK_NOTIFICATIONS.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                className={`p-4 rounded-xl border transition-all duration-200 group cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 ${
                  !notification.read
                    ? 'bg-cyan-500/5 border-cyan-400/30 hover:border-cyan-400/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <Link href={notification.actionUrl || '#'}>
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl">
                      {notification.avatar || getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="shrink-0 w-3 h-3 rounded-full bg-cyan-400 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-gray-400">Không có thông báo nào</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
