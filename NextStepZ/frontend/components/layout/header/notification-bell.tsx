'use client';

import { Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MOCK_NOTIFICATIONS, getTimeAgo, getNotificationIcon } from '@/lib/notifications';

interface NotificationBellProps {
  scrolled: boolean;
}

export function NotificationBell({ scrolled }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    // Mark all notifications as read when opening
    if (unreadCount > 0) {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <motion.button
        onClick={handleBellClick}
        className={`relative p-2 rounded-lg transition-all duration-200 ${
          scrolled
            ? 'text-gray-300 hover:bg-white/5 hover:text-white'
            : 'text-gray-400 hover:bg-white/5 hover:text-cyan-300'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.span
            className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
            className="absolute top-full right-0 mt-2 w-96 rounded-xl bg-slate-900 border border-cyan-400/20 shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-linear-to-r from-slate-900 to-slate-800/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  Thông báo
                </h3>
                <span className="text-xs text-gray-400">
                  {unreadCount} chưa đọc
                </span>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto scroll-smooth">
              {notifications.slice(0, 8).map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 cursor-pointer group ${
                    !notification.read ? 'bg-cyan-500/5' : ''
                  }`}
                >
                  <Link
                    href={notification.actionUrl || '#'}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-lg">
                        {notification.avatar || getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-cyan-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-linear-to-r from-slate-900/50 to-slate-800/30">
              <Link href="/notifications" onClick={() => setIsOpen(false)}>
                <button className="w-full py-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors duration-200">
                  Xem tất cả →
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
