'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Briefcase,
  Map,
  Users,
  Brain,
  LineChart,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const features: Feature[] = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Sáng tạo hồ sơ',
    description:
      'Xây dựng hồ sơ chuyên nghiệp, trưng bày dự án, và thể hiện tài năng của bạn một cách ấn tượng.',
    delay: 0,
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Đề xuất thông minh',
    description:
      'Công nghệ AI thông minh gợi ý việc làm, dự án, và cơ hội phù hợp với kỹ năng của bạn.',
    delay: 0.1,
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: 'Job Map',
    description:
      'Bản đồ tương tác hiển thị các cơ hội việc làm theo lĩnh vực, địa điểm, và kỹ năng yêu cầu.',
    delay: 0.2,
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Cộng Đồng',
    description:
      'Chia sẻ kinh nghiệm, học hỏi từ những người khác, và xây dựng mạng lưới chuyên môn.',
    delay: 0.3,
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: 'Công Ty',
    description:
      'Khám phá doanh nghiệp phù hợp với định hướng của bạn.',
    delay: 0.4,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Darker & More Subtle */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/12 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 2,
          }}
        />

        {/* Subtle Grid Lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #22d3ee 1px, transparent 1px), linear-gradient(-45deg, #22d3ee 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Animated Elements */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Animated Top Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-cyan-500/30 to-purple-500/20 border border-cyan-400/60 backdrop-blur-md mb-8"
            animate={{ 
              y: [0, -8, 0],
              boxShadow: [
                '0 0 0px rgba(34, 211, 238, 0)',
                '0 0 30px rgba(34, 211, 238, 0.3)',
                '0 0 0px rgba(34, 211, 238, 0)'
              ]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="text-lg"
            >
            🔗
            </motion.span>
            <span className="text-sm font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              Nền Tảng Kết Nối NextStepZ
            </span>
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-4.5xl font-bold mb-6">
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}>
              Khám Phá Hệ Sinh Thái Nghề Nghiệp Thông Minh Cùng NextStepZ
            </span>
          </h2>
          
          <motion.p
            className="text-lg text-gray-400 max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Trải nghiệm những công cụ hỗ trợ toàn diện cho <span className="text-cyan-300 font-semibold">hành trình nghề nghiệp của bạn</span> - 
            từ <span className="text-cyan-300 font-semibold">khám phá việc làm, quản lý CV, đến kết nối nhà tuyển dụng</span> và 
            <span className="text-cyan-300 font-semibold"> cộng đồng sinh viên</span> trong cùng một nền tảng thông minh.
          </motion.p>
        </motion.div>

        {/* Revolutionary Features Grid - Alternating Horizontal Layout */}
        <div className="space-y-8 mb-20">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            const colors = [
              { 
                bg: 'from-cyan-600/40 to-blue-600/20', 
                border: 'border-cyan-400/50',
                accent: 'from-cyan-400 to-blue-400',
                light: 'from-cyan-300 to-cyan-200',
                number: '01'
              },
              { 
                bg: 'from-purple-600/40 to-pink-600/20', 
                border: 'border-purple-400/50',
                accent: 'from-purple-400 to-pink-400',
                light: 'from-purple-300 to-pink-200',
                number: '02'
              },
              { 
                bg: 'from-blue-600/40 to-indigo-600/20', 
                border: 'border-blue-400/50',
                accent: 'from-blue-400 to-indigo-400',
                light: 'from-blue-300 to-indigo-200',
                number: '03'
              },
              { 
                bg: 'from-emerald-600/40 to-teal-600/20', 
                border: 'border-emerald-400/50',
                accent: 'from-emerald-400 to-teal-400',
                light: 'from-emerald-300 to-teal-200',
                number: '04'
              },
              { 
                bg: 'from-orange-600/40 to-amber-600/20', 
                border: 'border-orange-400/50',
                accent: 'from-orange-400 to-amber-400',
                light: 'from-orange-300 to-amber-200',
                number: '05'
              },
              { 
                bg: 'from-rose-600/40 to-red-600/20', 
                border: 'border-rose-400/50',
                accent: 'from-rose-400 to-red-400',
                light: 'from-rose-300 to-red-200',
                number: '06'
              },
            ];
            const color = colors[idx];

            return (
              <motion.div
                key={idx}
                className={`group relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                {/* Feature Item Container */}
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 lg:gap-12`}>
                  {/* Left Content */}
                  <div className="flex-1 flex flex-col justify-center lg:flex-[1.2]">
                    {/* Number Badge */}
                    <motion.div
                      className={`inline-flex items-center gap-3 mb-6 w-fit`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-4xl font-black bg-linear-to-br ${color.light} bg-clip-text text-transparent`}>
                        {color.number}
                      </div>
                      <div className="w-12 h-1 rounded-full bg-linear-to-r ${color.accent}"></div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-black mb-4 text-white leading-tight" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {feature.description}
                    </p>

                    {/* Interactive CTA */}
                    <motion.button
                      className={`group/btn w-fit px-8 py-4 rounded-xl bg-linear-to-r ${color.accent} text-white font-bold flex items-center gap-3 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                    >
                      <span className="relative z-10">Khám Phá Ngay</span>
                      <motion.svg
                        className="w-5 h-5 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0"
                        whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>

                    {/* Benefits List */}
                    <div className="mt-8 space-y-3">
                      {[
                        idx === 1 ? 'Hoạt động ngay lập tức' : idx === 2 ? 'Tìm việc quanh bạn' : idx === 3 ? 'Nơi sinh viên chia sẻ và học hỏi cùng nhau' : idx === 4 ? 'Khám phá các công ty hàng đầu' : 'Hoạt động ngay lập tức',
                        idx === 1 ? 'Gợi ý việc làm phù hợp' : idx === 2 ? 'Khám phá cơ hội trên bản đồ' : idx === 3 ? 'Kết nối – Hỏi đáp – Chia sẻ kinh nghiệm' : idx === 4 ? 'Tìm hiểu văn hoá và cơ hội từ doanh nghiệp' : 'Tối ưu trải nghiệm người dùng',
                        idx === 1 ? 'Cá nhân hóa 100%' : idx === 2 ? 'Xem công việc theo vị trí' : idx === 3 ? 'Không gian trao đổi dành cho sinh viên' : idx === 4 ? 'Nơi kết nối giữa sinh viên và nhà tuyển dụng' : 'Bộ lọc thông minh'
                      ].map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 + i * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className={`w-6 h-6 rounded-full bg-linear-to-br ${color.accent} flex items-center justify-center text-white text-sm font-bold`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          >
                            ✓
                          </motion.div>
                          <span className="font-medium" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right Visual - Interactive Card */}
                  <motion.div
                    className={`flex-1 lg:flex-[1.4] relative h-96 lg:h-full min-h-[450px] rounded-3xl group-hover:shadow-2xl transition-all duration-500`}
                    whileHover={{ scale: 1.02 }}
                    style={{ transformOrigin: 'center' }}
                  >
                    {/* Background Layers */}
                    <div className="absolute inset-0 bg-linear-to-br ${color.bg} border ${color.border} backdrop-blur-xl rounded-3xl"></div>
                    
                    {/* Top & Bottom Borders - Thicker design lines */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${color.accent} rounded-t-3xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${color.accent} rounded-b-3xl"></div>

                    {/* Left & Right Borders - Vertical lines */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b ${color.accent} rounded-l-3xl opacity-50"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-linear-to-b ${color.accent} rounded-r-3xl opacity-50"></div>
                    
                    {/* Animated Grid */}
                    <motion.div
                      className="absolute inset-0 opacity-30 rounded-3xl"
                      animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />

                    {/* Image Placeholder - Ready for real images */}
                    <div className="absolute inset-2 rounded-2xl bg-linear-to-br from-white/5 to-white/2 flex items-center justify-center overflow-hidden">
                      {/* Show actual image for first feature (Sáng tạo hồ sơ) */}
                      {idx === 0 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src="/images/por.png"
                            alt="Portfolio Creation"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : idx === 1 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ transform: 'none' }}
                        >
                          <Image
                            src="/images/rec.png"
                            alt="Smart Recommendations"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : idx === 2 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ transform: 'none' }}
                        >
                          <Image
                            src="/images/jobmap.png"
                            alt="Job Map"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : idx === 3 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ transform: 'none' }}
                        >
                          <Image
                            src="/images/community.png"
                            alt="Community"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : idx === 4 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ transform: 'none' }}
                        >
                          <Image
                            src="/images/companies.png"
                            alt="Companies"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : idx === 5 ? (
                        <motion.div
                          className="relative w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{ transform: 'none' }}
                        >
                          <Image
                            src="/images/mentoring.png"
                            alt="Mentoring"
                            fill
                            className="object-cover"
                            priority
                            style={{ transform: 'none' }}
                          />
                        </motion.div>
                      ) : (
                        /* Icon Large Display - For other features */
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        >
                          <div className={`text-8xl md:text-9xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
                            {feature.icon}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Floating Particles */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-linear-to-r ${color.accent} opacity-50 z-10`}
                        animate={{
                          x: [0, Math.random() * 100 - 50, 0],
                          y: [0, Math.random() * 100 - 50, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                      />
                    ))}

                    {/* Shine Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl z-10"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modern Stats Showcase - Redesigned */}
        <motion.div
          className="relative mt-24 pt-20 border-t border-cyan-400/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold text-cyan-300 mb-4 tracking-widest uppercase" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              ⚡ Vậy tại sao chọn NextStepZ ?
            </p>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
              Kết Quả Thực Tế & Tác Động Thực Sự
            </h3>
            
            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            >
              <motion.span
                className="inline-block text-cyan-300 font-bold"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NextStepZ trao cho bạn lợi thế thực sự
              </motion.span>
              {' '}trên hành trình sự nghiệp.
            </motion.p>
          </motion.div>

          {/* 4 Reason Cards - Grid Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.3,
                },
              },
            }}
            viewport={{ once: true }}
          >
            {[
              {
                number: '1',
                title: 'Hệ Sinh Thái Toàn Diện',
                desc: 'Tìm việc, xây CV, portfolio, kết nối cộng đồng – tất cả tại một nơi.',
                icon: '🌐',
                gradient: 'from-cyan-500 to-blue-500',
                gradientBg: 'from-cyan-600/30 to-blue-600/15',
              },
              {
                number: '2',
                title: 'Tối Ưu Hóa Bằng AI',
                desc: 'Phân tích năng lực, gợi ý nghề, tối ưu CV/portfolio theo nhà tuyển dụng.',
                icon: '🤖',
                gradient: 'from-purple-500 to-pink-500',
                gradientBg: 'from-purple-600/30 to-pink-600/15',
              },
              {
                number: '3',
                title: 'Cơ Hội Chất Lượng Cao',
                desc: 'Kết nối với hàng ngàn doanh nghiệp uy tín.',
                icon: '⭐',
                gradient: 'from-emerald-500 to-teal-500',
                gradientBg: 'from-emerald-600/30 to-teal-600/15',
              },
              {
                number: '4',
                title: 'Hỗ Trợ 24/7',
                desc: 'AI và cộng đồng luôn đồng hành cùng bạn.',
                icon: '🎯',
                gradient: 'from-orange-500 to-amber-500',
                gradientBg: 'from-orange-600/30 to-amber-600/15',
              },
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                className="group relative"
                variants={{
                  hidden: { opacity: 0, y: 60, rotateX: 90 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Container */}
                <motion.div
                  className={`relative h-full p-8 rounded-3xl bg-linear-to-br ${reason.gradientBg} border border-white/20 backdrop-blur-xl overflow-hidden`}
                  whileHover={{
                    scale: 1.05,
                    y: -12,
                    borderColor: 'rgba(34, 211, 238, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      backgroundImage: `linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(168, 85, 247, 0.2))`,
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Animated Background Mesh */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 15,
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
                    {/* Number Badge */}
                    <motion.div
                      className={`w-12 h-12 rounded-2xl bg-linear-to-br ${reason.gradient} flex items-center justify-center mb-4 shadow-lg`}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.15,
                      }}
                    >
                      <span className="text-xl font-black text-white">{reason.number}</span>
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}>
                      {reason.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed grow" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                      {reason.desc}
                    </p>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className={`mt-4 h-1 bg-linear-to-r ${reason.gradient} rounded-full`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: idx * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Metrics - 3 Stats */}
          <motion.div
            className="relative pt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Top Divider */}
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-120 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            />

            {/* Section Title */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h4 className="text-3xl md:text-5xl font-black text-white mb-1 leading-relaxed" style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif", lineHeight: '1.8' }}>
                <motion.span
                  className="inline-block"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #06B6D4, #3B82F6, #A855F7)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  NextStepZ Sẽ Mang Đến Giá Trị Gì Cho Bạn ?
                </motion.span>
              </h4>
              
              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                Mỗi tính năng được xây dựng nhằm giúp <span className="text-cyan-300 font-semibold">sinh viên, nhà tuyển dụng</span> và <span className="text-cyan-300 font-semibold">cựu sinh viên</span> đạt được mục tiêu <span className="text-emerald-300 font-semibold">nhanh hơn, thông minh hơn</span>.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: '45%',
                  mainLabel: 'Tăng Cơ Hội Việc Làm',
                  subtitle: 'Nhờ AI CV Builder & Job Match.',
                  footnote: 'Dữ liệu người dùng thử nghiệm 2025.',
                  icon: '📈',
                  color: 'from-cyan-500 to-blue-500',
                },
                {
                  number: '10K+',
                  mainLabel: 'Cơ Hội Từ Doanh Nghiệp',
                  subtitle: 'Cập nhật liên tục từ đối tác tuyển dụng.',
                  footnote: 'Số liệu từ hệ thống NextStepZ.',
                  icon: '🏢',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  number: '92%',
                  mainLabel: 'Phản Hồi AI Dưới 5 Giây',
                  subtitle: 'Hỗ trợ 24/7 theo nhu cầu sinh viên.',
                  footnote: 'Thống kê AI nội bộ 2025.',
                  icon: '🤖',
                  color: 'from-emerald-500 to-teal-500',
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 + 0.7 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="relative p-8 rounded-3xl bg-linear-to-br from-white/5 to-white/2 border border-white/15 backdrop-blur-xl hover:border-white/40 transition-all duration-500 h-full flex flex-col"
                    whileHover={{
                      y: -15,
                      boxShadow: '0 30px 60px rgba(34, 211, 238, 0.15)',
                    }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full pb-2">
                      {/* Icon */}
                      <motion.div
                        className="text-6xl mb-4 inline-block"
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, 8, -8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {stat.icon}
                      </motion.div>

                      {/* Number Counter */}
                      <motion.div
                        className={`text-5xl md:text-6xl font-black bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 80,
                          delay: idx * 0.15 + 0.8,
                        }}
                        viewport={{ once: true }}
                      >
                        {stat.number}
                      </motion.div>

                      {/* Main Label */}
                      <h4 className="text-lg md:text-xl font-bold text-white mb-3" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                        {stat.mainLabel}
                      </h4>

                      {/* Subtitle */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 grow" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {stat.subtitle}
                      </p>

                      {/* Footnote */}
                      <p className="text-xs text-gray-500 italic mb-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
                        {stat.footnote}
                      </p>
                    </div>

                    {/* Bottom Gradient Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r ${stat.color} rounded-b-3xl`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.15 + 0.9,
                      }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
