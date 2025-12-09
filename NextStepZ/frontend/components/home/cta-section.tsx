'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Briefcase, Rocket, Users, Code } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative w-full py-24 md:py-48 px-4 md:px-8 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Revolutionary Multi-Layer Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Layers */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Dynamic Gradient Orbs with 3D Effects */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 60px rgba(34, 211, 238, 0.4))',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            filter: 'drop-shadow(0 0 60px rgba(168, 85, 247, 0.4))',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          style={{
            filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 0.3))',
          }}
        />

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
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

        {/* Floating Particles */}
        {[
          { x: 30, y: 50, left: 10, top: 20, duration: 6, delay: 0 },
          { x: -40, y: 60, left: 85, top: 25, duration: 7, delay: 0.5 },
          { x: 45, y: -35, left: 50, top: 75, duration: 8, delay: 1 },
          { x: -30, y: -50, left: 15, top: 65, duration: 7.5, delay: 1.5 },
          { x: 40, y: 30, left: 75, top: 55, duration: 6.5, delay: 2 },
        ].map((particle, idx) => (
          <motion.div
            key={idx}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-cyan-400 to-blue-400"
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="space-y-12 md:space-y-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Premium Animated Badge */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 backdrop-blur-lg"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.2)',
                  '0 0 40px rgba(168, 85, 247, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.2)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <span className="text-sm font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                 Khám Phá Cơ Hội Dành Riêng Cho Bạn
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Heading with Animated Gradient */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-7xl lg:text-6xl font-black leading-tight"
              style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
            >
              <span className="bg-linear-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Bắt Đầu Hành Trình
              </span>
              <br />
              <span className="block mt-2 bg-linear-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Sự Nghiệp Thông Minh Của Bạn 
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-2xl text-gray-300 max-w-full mx-auto leading-relaxed"
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Không cần chờ đợi thêm nữa. <span className="text-cyan-300 font-semibold">Khám phá điểm mạnh, nâng tầm hồ sơ</span> đã tìm thấy <span className="text-blue-300 font-semibold">mở khóa những cơ hội phù hợp nhất</span> dành riêng cho bạn.
              <br className="hidden md:block" />
              <span className="text-purple-300 font-semibold">NextStepZ</span> - nơi mỗi bước đi nhỏ hôm nay dẫn bạn đến<span className="text-cyan-300 font-semibold"> một tương lai lớn.</span>
            </motion.p>
          </motion.div>

          {/* Premium CTA Buttons with Glassmorphism */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/auth" className="w-full sm:w-auto">
              <motion.button
                className="w-full px-10 md:px-14 py-5 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                {/* Animated background shine */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                  Tham Gia Ngay
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <Link href="/portfolio" className="w-full sm:w-auto">
              <motion.button
                className="w-full px-10 md:px-14 py-5 rounded-2xl border-2 border-cyan-400/60 text-cyan-300 font-bold text-lg bg-linear-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md hover:bg-cyan-400/20 hover:border-cyan-300/80 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "'Exo 2 Bold', sans-serif" }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/10 to-transparent"
                  animate={{
                    x: [-200, 200],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Bắt Đầu Xây Dựng Hồ Sơ
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>
          </motion.div>

         

          {/* Trusted By Section */}
          <motion.div
            className="pt-12 border-t border-cyan-400/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-center text-sm text-gray-400 mb-8 font-medium tracking-widest" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                ĐƯỢC KẾT NỐI VỚI
              </p>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  { name: 'VKU', icon: <Briefcase className="w-8 h-8 text-cyan-400" />, sub: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn' },
                  { name: 'Startup Sinh Viên', icon: <Rocket className="w-8 h-8 text-purple-400" />, sub: 'Định hướng & hợp tác dự án.' },
                  { name: 'Cựu Sinh Viên VKU', icon: <Users className="w-8 h-8 text-cyan-400" />, sub: 'Mentoring – chia sẻ kinh nghiệm.' },
                  { name: 'Cộng Đồng IT Đà Nẵng', icon: <Code className="w-8 h-8 text-blue-400" />, sub: 'Nơi kết nối và học hỏi.' },
                ].map((brand, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-linear-to-br from-white/5 to-white/0 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                    }}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: '0 8px 20px rgba(34, 211, 238, 0.15)',
                      backgroundColor: 'rgba(34, 211, 238, 0.05)',
                    }}
                  >
                    <motion.div
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                    >
                      {brand.icon}
                    </motion.div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-cyan-300 transition-colors text-center" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>{brand.name}</span>
                    <span className="text-xs text-gray-500 text-center" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>{brand.sub}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
