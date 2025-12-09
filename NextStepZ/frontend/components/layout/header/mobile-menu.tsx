'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, User, Briefcase, Bookmark, Clock, Settings } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { MOCK_NOTIFICATIONS, getTimeAgo, getNotificationIcon } from '@/lib/notifications';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_NAV_ITEMS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Hồ sơ cá nhân', href: '/portfolio' },
  { label: 'Đề xuất', href: '/recommendations' },
  { label: 'Cộng đồng', href: '/community' },
  { label: 'Công ty', href: '/companies' },
  { label: 'Job Map', href: '/job-map' },
  { label: 'Về chúng tôi', href: '/about' },
];

const USER_MENU_ITEMS = [
  {
    label: 'Trang cá nhân',
    href: '/profile',
    icon: User,
  },
  {
    label: 'Hồ sơ sáng tạo của tôi',
    href: '/saved-portfolios',
    icon: Briefcase,
  },
  {
    label: 'Mục đã lưu',
    href: '/saved-jobs',
    icon: Bookmark,
  },
  {
    label: 'Lịch sử hoạt động',
    href: '/activity',
    icon: Clock,
  },
  {
    label: 'Cài đặt tài khoản',
    href: '/settings',
    icon: Settings,
  },
];

export function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const { user, isLoggedIn, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  // Handle escape key and menu open/close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setShowNotifications(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Allow scrolling in menu, don't lock body
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      // Restore original overflow state
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle dropdown scroll lock - when dropdown is open, lock background scroll
  useEffect(() => {
    if (showNotifications && isOpen) {
      // Lock page scroll when dropdown is open
      document.body.style.overflow = 'hidden';
    } else if (isOpen) {
      // Restore scroll when dropdown is closed (but menu is still open)
      document.body.style.overflow = 'auto';
    }

    return () => {
      if (!isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [showNotifications, isOpen]);

  const handleNavClick = useCallback(() => {
    setShowNotifications(false);
    onClose();
  }, [onClose]);

  const handleLogout = useCallback(() => {
    logout();
    setShowNotifications(false);
    onClose();
  }, [logout, onClose]);

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={`fixed top-16 md:top-20 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ease-out overflow-y-auto overflow-x-hidden md:hidden ${
          isOpen
            ? 'max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-80px)] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2 min-h-auto">
          {/* Navigation Links */}
          {MOBILE_NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-colors duration-200 ${
                idx === MOBILE_NAV_ITEMS.length - 1 ? 'border-b border-white/10 pb-3 sm:pb-4' : ''
              }`}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Section */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10 pt-3 sm:pt-4 space-y-1 sm:space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Ngôn ngữ
            </p>
            <button className="block w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm">
              🇻🇳 Tiếng Việt
            </button>
            <button className="block w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm">
              🇬🇧 English
            </button>
          </div>

          {/* Auth Section */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10 pt-3 sm:pt-4">
            {isLoggedIn ? (
              <div className="space-y-3">
                {/* User Info Card */}
                <div className="px-3 sm:px-4 py-3 rounded-lg bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                      {user?.username.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">
                        {user?.name || user?.username || 'Demo User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user?.email || 'demo@nextstepz.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  {/* Notifications Section */}
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-colors duration-200 flex items-center justify-between text-sm sm:text-base font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Thông báo</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-red-500">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="max-h-96 overflow-y-auto overflow-x-hidden scroll-smooth">
                          {MOCK_NOTIFICATIONS.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5 hover:bg-white/5 transition-colors duration-150 cursor-pointer text-sm ${
                                !notification.read ? 'bg-cyan-500/5' : ''
                              }`}
                            >
                              <Link
                                href={notification.actionUrl || '#'}
                                onClick={handleNavClick}
                              >
                                <div className="flex gap-2">
                                  {/* Avatar */}
                                  <div className="shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs">
                                    {notification.avatar || getNotificationIcon(notification.type)}
                                  </div>
                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                                      {notification.title}
                                    </h5>
                                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                      {notification.description}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {getTimeAgo(notification.timestamp)}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-1" />
                                  )}
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                        <Link href="/notifications" onClick={handleNavClick}>
                          <div className="px-3 sm:px-4 py-2 border-t border-white/5 text-center">
                            <span className="text-xs sm:text-sm font-medium text-cyan-300 hover:text-cyan-200">
                              Xem tất cả →
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* User Menu Items */}
                  <div className="space-y-2 border-t border-white/10 pt-3">
                    {USER_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href} onClick={handleNavClick}>
                          <button className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2 text-xs sm:text-sm font-medium">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" onClick={handleNavClick}>
                <button className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-linear-to-r from-cyan-400/90 to-blue-500/90 text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/40">
                  Đăng nhập / Đăng ký
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
