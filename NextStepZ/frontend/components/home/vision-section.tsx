'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Award, Target, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface TimelineStep {
  title: string;
  description: string;
  emoji: string;
  highlights: string[];
  color: {
    gradient: string;
    accent: string;
    light: string;
    border: string;
    glow: string;
  };
  icon: React.ReactNode;
}

const timelineSteps: TimelineStep[] = [
  {
    title: 'Sinh Viên Năm 1',
    description: 'Khám phá đam mê, tìm hiểu các lĩnh vực, xây dựng nền tảng kỹ năng cơ bản.',
    emoji: '🎓',
    highlights: ['Khám phá lĩnh vực', 'Xây dựng nền tảng', 'Phát triển kỹ năng'],
    color: {
      gradient: 'from-blue-600/40 to-cyan-600/20',
      accent: 'from-blue-400 to-cyan-400',
      light: 'from-blue-300 to-cyan-200',
      border: 'border-blue-400/50',
      glow: 'shadow-blue-500/50',
    },
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Sinh Viên Năm 2-3',
    description: 'Nâng cao kỹ năng, thực tập, xây dựng portfolio, mở rộng mạng lưới chuyên môn.',
    emoji: '📚',
    highlights: ['Thực tập chuyên đề', 'Xây dựng portfolio', 'Mở rộng mạng lưới'],
    color: {
      gradient: 'from-cyan-600/40 to-purple-600/20',
      accent: 'from-cyan-400 to-purple-400',
      light: 'from-cyan-300 to-purple-200',
      border: 'border-cyan-400/50',
      glow: 'shadow-cyan-500/50',
    },
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'Sinh Viên Cuối Khoá',
    description: 'Tìm việc làm chính thức, chuẩn bị cho sự nghiệp, kết nối với mentor hướng dẫn.',
    emoji: '🚀',
    highlights: ['Tìm việc chính thức', 'Chuẩn bị phỏng vấn', 'Kết nối mentor'],
    color: {
      gradient: 'from-purple-600/40 to-pink-600/20',
      accent: 'from-purple-400 to-pink-400',
      light: 'from-purple-300 to-pink-200',
      border: 'border-purple-400/50',
      glow: 'shadow-purple-500/50',
    },
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'Cựu Sinh Viên',
    description: 'Phát triển sự nghiệp, chia sẻ kinh nghiệm, mentoring và hỗ trợ thế hệ sau.',
    emoji: '⭐',
    highlights: ['Phát triển sự nghiệp', 'Chia sẻ kinh nghiệm', 'Mentoring thế hệ sau'],
    color: {
      gradient: 'from-pink-600/40 to-rose-600/20',
      accent: 'from-pink-400 to-rose-400',
      light: 'from-pink-300 to-rose-200',
      border: 'border-pink-400/50',
      glow: 'shadow-pink-500/50',
    },
    icon: <Award className="w-6 h-6" />,
  },
];

export default function VisionSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      className="relative w-full py-20 md:py-40 px-4 md:px-8 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Revolutionary 360° Rotating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Multi-layer Animated Gradients */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Rotating Orbs with 3D depth */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -120, 0],
            scale: [1, 0.95, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          style={{
            filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.3))',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/18 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -150, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          style={{
            filter: 'drop-shadow(0 0 50px rgba(168, 85, 247, 0.35))',
          }}
        />

        {/* Animated Grid with Hex Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.08]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle, #22d3ee 1px, transparent 1px),
              radial-gradient(circle, #22d3ee 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0, 40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Animated Badge */}
        <motion.div
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-400/40 backdrop-blur-lg mb-8"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(34, 211, 238, 0.3)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Target className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-bold text-cyan-300" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              HÀNH TRÌNH BIẾN ĐỔI SỰ NGHIỆP
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </motion.div>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8">
            <motion.span
              className="bg-linear-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Từ Giấc Mơ Đến Hiện Thực
            </motion.span>
          </h2>

          <p
            className="text-lg md:text-xl text-gray-400 max-w-full mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Trong hành trình sự nghiệp, mỗi bước tiến đều là <span className="text-cyan-300 font-bold">một dấu mốc quan trọng</span> trong hành trình sự nghiệp của bạn.
            NextStepZ đồng hành để bạn không chỉ <span className="text-blue-300 font-bold">bước qua từng giai đoạn</span>, mà còn{' '}
            <span className="text-cyan-300 font-bold">mở ra phiên bản tốt hơn của chính mình</span> ở mỗi bước đi.
          </p>
        </motion.div>

        {/* Compact Horizontal Timeline */}
        <motion.div
          className="mb-28 md:mb-32"
          initial={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Timeline Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
              Hành Trình 4 Giai Đoạn
            </h3>
            <p className="text-gray-400 text-sm md:text-base" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
              Theo dõi quá trình phát triển từ sinh viên đến cựu sinh viên
            </p>
          </motion.div>

          {/* Horizontal Timeline Container */}
          <div className="relative">
            {/* Timeline Progression Line */}
            <motion.div
              className="absolute top-6 left-0 right-0 h-1 bg-linear-to-r from-blue-500/20 via-cyan-500/50 to-purple-500/20 rounded-full hidden md:block"
              initial={{ opacity: 1 }}
            />

            {/* Timeline Cards Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10"
              initial="visible"
              variants={containerVariants}
            >
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-white to-gray-200 border-4 border-slate-900 flex items-center justify-center text-xl md:text-2xl font-black text-slate-950 shadow-xl mb-6 relative z-20"
                    animate={{
                      scale: activeCard === idx ? 1.3 : 1,
                      boxShadow: activeCard === idx
                        ? '0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4)'
                        : '0 0 15px rgba(34, 211, 238, 0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {idx + 1}
                  </motion.div>

                  {/* Compact Card */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden w-full min-h-72 cursor-pointer"
                    animate={{ y: activeCard === idx ? -8 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10, duration: 0.3 }}
                  >
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${step.color.gradient} backdrop-blur-xl border ${step.color.border}`}
                      animate={{ opacity: activeCard === idx ? 1 : 0.6 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ pointerEvents: 'none' }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-4 md:p-5 h-full flex flex-col justify-between">
                      {/* Icon & Title */}
                      <div className="mb-2">
                        <motion.span
                          className="text-2xl md:text-3xl block mb-2"
                          animate={activeCard === idx ? { scale: 1.2, rotate: 12 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {step.emoji}
                        </motion.span>
                        <h4
                          className="text-sm md:text-base font-bold text-white leading-tight"
                          style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
                        >
                          {step.title}
                        </h4>
                        <motion.div
                          className={`h-0.5 bg-linear-to-r ${step.color.accent} rounded-full mt-1.5 origin-left`}
                          initial={{ scaleX: 0 }}
                          animate={activeCard === idx ? { scaleX: 1 } : { scaleX: 0.3 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Description - Collapsible */}
                      <motion.div
                        className="overflow-hidden mb-2"
                        initial={{ height: 40 }}
                        animate={{ height: activeCard === idx ? 'auto' : 40 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p
                          className="text-xs text-gray-300 leading-snug"
                          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                        >
                          {step.description}
                        </p>
                      </motion.div>

                      {/* Mini Highlights - Show on Hover */}
                      <motion.div
                        className="space-y-1 mb-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={activeCard === idx ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {step.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-1.5">
                            <div className={`w-1 h-1 rounded-full bg-linear-to-r ${step.color.accent} shrink-0`} />
                            <span className="text-xs text-gray-400" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </motion.div>

                      {/* Mini Progress Bar */}
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-linear-to-r ${step.color.accent}`}
                            animate={{ width: `${(idx + 1) * 25}%` }}
                            transition={{ duration: 1.2, delay: 0.2 + idx * 0.1 }}
                          />
                        </div>
                        <span className="text-xs font-bold text-cyan-300 whitespace-nowrap w-8 text-right">{(idx + 1) * 25}%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Success Stories Section */}
          <motion.div
            className="mt-20 pt-16 relative z-10"
            initial={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 md:mb-20"
              initial={{ opacity: 1, y: 0 }}
            >
              {/* Top Divider */}
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-120 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                initial={{ scaleX: 1 }}
              />

              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 backdrop-blur-md mb-6"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(16, 185, 129, 0.3)',
                    '0 0 40px rgba(16, 185, 129, 0.5)',
                    '0 0 20px rgba(16, 185, 129, 0.3)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl">✨</span>
                <span className="text-sm font-bold text-emerald-300" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                  CHUYỆN THẬT – HỌC TỪ NHỮNG AI ĐỦNG ĐẦU
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                <motion.span
                  className="bg-linear-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  Hành Trình Thay Đổi Sự Nghiệp
                </motion.span>
                <div className="text-2xl md:text-3xl text-gray-300 font-normal mt-3" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                  Với NextStepZ
                </div>
              </h2>

              <motion.p
                className="text-gray-300 text-lg md:text-xl max-w-full mx-auto leading-relaxed mt-8"
                initial={{ opacity: 1 }}
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                Những câu chuyện thành công từ chính những <span className="text-emerald-300 font-semibold">sinh viên đã đi trước</span>.
                Họ bắt đầu từ <span className="text-cyan-300 font-semibold">con số 0</span>, từng bước xây dựng kỹ năng, mở rộng cơ hội và đạt được những <span className="text-blue-300 font-semibold">cột mốc đầu tiên</span> trong sự nghiệp — 
                tất cả thông qua hệ sinh thái NextStepZ.
              </motion.p>
            </motion.div>

            {/* Stories Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
              initial="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                },
              }}
            >
              {[
                {
                  name: 'Hồng Anh',
                  journey: 'Từ Sinh Viên Năm 3 → Thực Tập Sinh Marketing',
                  company: 'tại Công Ty XYZ',
                  quote: 'Trước đây mình không biết phải bắt đầu từ đâu. Nhờ NextStepZ, mình định hướng ngành marketing, xây portfolio rõ ràng và kết nối được mentor. Cuối cùng, mình đã được nhận thực tập tại XYZ.',
                  highlights: [
                    'Xác định thế mạnh & đam mê qua Career AI',
                    'Xây dựng portfolio marketing từ các dự án thực chiến',
                    'Nhận được phản hồi trực tiếp từ mentor ngành',
                    'Ứng tuyển thành công vào vị trí thực tập yêu thích',
                  ],
                  results: [
                    'Có offer trong 3 tuần',
                    'Portfolio được đánh giá chuyên nghiệp',
                    'Tự tin theo đuổi ngành Marketing',
                  ],
                  image: '/images/picnv1.jpg',
                  gradient: 'from-blue-600/30 to-cyan-600/20',
                  accent: 'from-blue-400 to-cyan-400',
                  border: 'border-blue-400/50',
                },
                {
                  name: 'Minh Đức',
                  journey: 'Portfolio từ con số 0 → Offer 12 triệu/tháng',
                  company: 'ngành Frontend',
                  quote: 'Mình từng lo lắng vì chưa có kinh nghiệm. NextStepZ giúp mình có roadmap học rõ ràng, gợi ý kỹ năng còn thiếu và hỗ trợ tối ưu CV bằng AI.',
                  highlights: [
                    'Học theo roadmap kỹ năng do AI phân tích',
                    'Tham gia các buổi chia sẻ với cộng đồng lập trình',
                    'Hoàn thiện portfolio cá nhân đầy đủ dự án',
                    'Được kết nối trực tiếp với doanh nghiệp tuyển dụng',
                  ],
                  results: [
                    'Nhận offer 12 triệu/tháng ngay sau buổi phỏng vấn',
                    'Portfolio đạt chuẩn để apply nhiều công ty',
                    'Tương lai nghề nghiệp rõ ràng hơn',
                  ],
                  image: '/images/picnv1.jpg',
                  gradient: 'from-purple-600/30 to-pink-600/20',
                  accent: 'from-purple-400 to-pink-400',
                  border: 'border-purple-400/50',
                },
                {
                  name: 'Thảo My',
                  journey: 'Từ Sinh Viên Trái Ngành → Junior Designer',
                  company: 'tại Studio Thiết Kế',
                  quote: 'Nhờ hệ sinh thái của NextStepZ, mình chuyển ngành thành công. Mình học design từ đầu, tạo CV đúng chuẩn và được kết nối với anh chị designer để học hỏi.',
                  highlights: [
                    'Career Test cho thấy phù hợp ngành design',
                    'Bắt đầu với khóa nền tảng + portfolio template',
                    'Nhận mentoring 1-1 để sửa portfolio',
                    'Apply thành công vào studio thiết kế',
                  ],
                  results: [
                    'Chuyển ngành thành công chỉ sau 4 tháng',
                    'Portfolio bắt mắt, đúng checklist tuyển dụng',
                    'Tự tin theo đuổi direction mới',
                  ],
                  image: '/images/picnv1.jpg',
                  gradient: 'from-emerald-600/30 to-teal-600/20',
                  accent: 'from-emerald-400 to-teal-400',
                  border: 'border-emerald-400/50',
                },
              ].map((story, idx) => (
                <motion.div
                  key={idx}
                  className="group relative"
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -20 },
                    visible: { opacity: 1, y: 0, rotateX: 0 },
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Story Card */}
                  <motion.div
                    className={`relative h-full rounded-3xl overflow-hidden backdrop-blur-xl border ${story.border} bg-linear-to-br ${story.gradient} p-8 flex flex-col group-hover:shadow-2xl transition-all duration-500`}
                    whileHover={{
                      y: -12,
                      borderColor: 'rgba(34, 211, 238, 0.8)',
                    }}
                  >
                    {/* Animated Background Mesh */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(45deg, rgba(34, 211, 238, 0.1) 0px, rgba(34, 211, 238, 0.1) 1px, transparent 1px, transparent 40px),
                          repeating-linear-gradient(-45deg, rgba(168, 85, 247, 0.1) 0px, rgba(168, 85, 247, 0.1) 1px, transparent 1px, transparent 40px)
                        `,
                        backgroundSize: '80px 80px',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <motion.div
                              className={`w-40 h-40 rounded-3xl bg-linear-to-br ${story.gradient} border-4 border-white/60 mb-3 inline-flex items-center justify-center overflow-hidden shadow-2xl`}
                              animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
                              transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                              style={{
                                boxShadow: `0 0 50px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)`
                              }}
                            >
                              {/* Avatar Image */}
                              {story.image ? (
                                <Image
                                  src={story.image}
                                  alt={story.name}
                                  width={120}
                                  height={120}
                                  className="w-full h-full object-cover object-center"
                                  quality={100}
                                  priority={idx === 0}
                                />
                              ) : (
                                <div className="w-full h-full bg-linear-to-br from-white/40 to-white/10 flex items-center justify-center text-5xl font-black text-white">
                                  {story.name[0]}
                                </div>
                              )}
                            </motion.div>
                            <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
                              {story.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm md:text-base font-bold text-gray-100 mb-1" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                          {story.journey}
                        </p>
                        <p className="text-xs text-gray-300">{story.company}</p>
                        <motion.div
                          className={`h-1 bg-linear-to-r ${story.accent} rounded-full mt-3 origin-left`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: idx * 0.15 }}
                        />
                      </div>

                      {/* Quote */}
                      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-sm text-gray-200 italic leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                          &quot;{story.quote}&quot;
                        </p>
                      </div>

                      {/* Hành Trình */}
                      <div className="mb-6 space-y-2">
                        <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Hành Trình</p>
                        {story.highlights.map((highlight, hIdx) => (
                          <motion.div
                            key={hIdx}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 + hIdx * 0.05 + 0.2 }}
                          >
                            <span className={`text-cyan-400 font-bold mt-0.5 shrink-0`}>✓</span>
                            <span className="text-xs text-gray-300" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                              {highlight}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Results - Bottom */}
                      <div className="mt-auto pt-6 border-t border-white/10">
                        <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">Kết Quả</p>
                        <div className="space-y-2">
                          {story.results.map((result, rIdx) => (
                            <motion.div
                              key={rIdx}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.15 + rIdx * 0.08 + 0.4 }}
                            >
                              <span className={`text-lg bg-linear-to-r ${story.accent} bg-clip-text text-transparent font-black`}>
                                🔹
                              </span>
                              <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                                {result}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl z-20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>


          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
