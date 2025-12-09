export interface Notification {
  id: string;
  type: 'job_match' | 'comment' | 'portfolio_update' | 'message' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'job_match',
    title: 'Công việc phù hợp mới',
    description: 'Senior Frontend Developer tại TechCorp',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    avatar: '💼',
    actionUrl: '/job-map',
  },
  {
    id: '2',
    type: 'comment',
    title: 'Bình luận mới trên portfolio',
    description: 'Nguyễn Văn A: "Portfolio của bạn rất ấn tượng!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: false,
    avatar: '💬',
    actionUrl: '/portfolio',
  },
  {
    id: '3',
    type: 'portfolio_update',
    title: 'Đề xuất cập nhật hồ sơ',
    description: 'Thêm thêm các kỹ năng để tăng độ phù hợp công việc',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    avatar: '📈',
    actionUrl: '/portfolio',
  },
  {
    id: '4',
    type: 'message',
    title: 'Tin nhắn mới từ Trần Thị B',
    description: 'Bạn có quan tâm đến vị trí này không?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    avatar: '✉️',
    actionUrl: '/messages',
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Thành tích mới',
    description: 'Bạn đã hoàn thành 50% hồ sơ sáng tạo',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    avatar: '🏆',
    actionUrl: '/portfolio',
  },
  {
    id: '6',
    type: 'job_match',
    title: 'Công việc phù hợp mới',
    description: 'Backend Developer tại StartupXYZ',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
    avatar: '💼',
    actionUrl: '/job-map',
  },
  {
    id: '7',
    type: 'comment',
    title: 'Phản hồi từ cộng đồng',
    description: 'Lê Văn C vừa thích bài viết của bạn',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    read: true,
    avatar: '👍',
    actionUrl: '/community',
  },
  {
    id: '8',
    type: 'portfolio_update',
    title: 'Cơ hội nâng cao hồ sơ',
    description: 'Thêm sản phẩm nhân tạo (portfolio) để tăng độ tin cậy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
    read: true,
    avatar: '⭐',
    actionUrl: '/portfolio',
  },
  {
    id: '9',
    type: 'message',
    title: 'Lời mời phỏng vấn',
    description: 'Công ty ABC muốn mời bạn phỏng vấn',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
    read: true,
    avatar: '📞',
    actionUrl: '/interviews',
  },
  {
    id: '10',
    type: 'achievement',
    title: 'Hành trình tiếp tục',
    description: 'Bạn đã hoạt động trên nền tảng trong 30 ngày liên tiếp',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144),
    read: true,
    avatar: '🔥',
    actionUrl: '/profile',
  },
];

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'vừa xong';
  if (minutes < 60) return `${minutes}m trước`;
  if (hours < 24) return `${hours}h trước`;
  if (days < 7) return `${days}d trước`;
  return new Date(date).toLocaleDateString('vi-VN');
}

export function getNotificationIcon(type: Notification['type']): string {
  const icons: Record<Notification['type'], string> = {
    job_match: '💼',
    comment: '💬',
    portfolio_update: '📈',
    message: '✉️',
    achievement: '🏆',
  };
  return icons[type];
}
