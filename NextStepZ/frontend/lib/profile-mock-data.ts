// Mock data for Profile Page components
// Use this for testing and development

export const mockUserInfo = {
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  name: 'Nguyễn Văn A',
  email: 'user@example.com',
  bio: 'Frontend Developer | Creative Designer | Always Learning',
};

export const mockPersonalInfo = {
  fullName: 'Nguyễn Văn A',
  phone: '+84 912 345 678',
  birthDate: '1999-01-15',
  address: 'Hà Nội, Việt Nam',
  socialLinks: [
    {
      id: '1',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/user',
      icon: () => null,
    },
    {
      id: '2',
      platform: 'GitHub',
      url: 'https://github.com/user',
      icon: () => null,
    },
    {
      id: '3',
      platform: 'Facebook',
      url: 'https://facebook.com/user',
      icon: () => null,
    },
  ],
};

export const mockCareerProfile = {
  objective:
    'Tìm kiếm vị trí Frontend Developer có kinh nghiệm để phát triển kỹ năng kỹ thuật và đóng góp cho các dự án công nghệ hiện đại. Mục tiêu: xây dựng sự nghiệp vững chắc trong lĩnh vực phát triển web.',
  experiences: [
    {
      id: '1',
      position: 'Frontend Developer',
      company: 'Tech Company Vietnam',
      startDate: '2023-01',
      endDate: '',
      description:
        'Phát triển ứng dụng web với React và TypeScript. Tối ưu hóa hiệu suất và trải nghiệm người dùng. Cộng tác với team backend và designer.',
      isCurrent: true,
    },
    {
      id: '2',
      position: 'Junior Developer',
      company: 'Startup ABC',
      startDate: '2022-06',
      endDate: '2022-12',
      description:
        'Xây dựng các tính năng UI/UX sử dụng Vue.js. Cộng tác với team designer. Participate in code reviews.',
      isCurrent: false,
    },
    {
      id: '3',
      position: 'Intern Frontend Developer',
      company: 'Freelance',
      startDate: '2022-01',
      endDate: '2022-05',
      description:
        'Xây dựng các trang web responsive sử dụng HTML, CSS, JavaScript. Learning agile methodology.',
      isCurrent: false,
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'advanced' as const },
    { id: '2', name: 'TypeScript', level: 'advanced' as const },
    { id: '3', name: 'Tailwind CSS', level: 'advanced' as const },
    { id: '4', name: 'Next.js', level: 'intermediate' as const },
    { id: '5', name: 'Vue.js', level: 'intermediate' as const },
    { id: '6', name: 'JavaScript', level: 'expert' as const },
    { id: '7', name: 'HTML/CSS', level: 'expert' as const },
    { id: '8', name: 'Figma', level: 'beginner' as const },
    { id: '9', name: 'Git', level: 'intermediate' as const },
    { id: '10', name: 'REST API', level: 'intermediate' as const },
  ],
  education: [
    {
      id: '1',
      school: 'Đại học Bách Khoa Hà Nội',
      degree: 'Cử nhân',
      field: 'Công nghệ thông tin',
      graduationYear: '2023',
    },
    {
      id: '2',
      school: 'Trường THPT Lê Quý Đôn',
      degree: 'THPT',
      field: 'Chuyên Toán',
      graduationYear: '2019',
    },
  ],
};

export const mockActivities = [
  {
    id: '1',
    type: 'view' as const,
    title: 'Xem công việc',
    description: 'Senior React Developer - Tech Company Vietnam',
    timestamp: '2 giờ trước',
  },
  {
    id: '2',
    type: 'apply' as const,
    title: 'Ứng tuyển thành công',
    description: 'Frontend Developer - Startup ABC',
    timestamp: '1 ngày trước',
  },
  {
    id: '3',
    type: 'save' as const,
    title: 'Lưu công việc',
    description: 'UI/UX Designer - Design Studio XYZ',
    timestamp: '2 ngày trước',
  },
  {
    id: '4',
    type: 'share' as const,
    title: 'Chia sẻ hồ sơ',
    description: 'Với 5 bạn bè',
    timestamp: '3 ngày trước',
  },
  {
    id: '5',
    type: 'comment' as const,
    title: 'Bình luận bài viết',
    description: 'Chia sẻ cộng đồng',
    timestamp: '5 ngày trước',
  },
  {
    id: '6',
    type: 'like' as const,
    title: 'Thích bài viết',
    description: 'Từ cộng đồng NextStepZ',
    timestamp: '1 tuần trước',
  },
  {
    id: '7',
    type: 'view' as const,
    title: 'Xem công việc',
    description: 'Full Stack Developer - Company DEF',
    timestamp: '1 tuần trước',
  },
];

// Type exports for use in components
export type { PersonalInfo } from '@/components/profile/personal-info-card';
export type { CareerProfileData } from '@/components/profile/career-profile-card';
export type { Activity } from '@/components/profile/recent-activity-card';
