'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase, GraduationCap } from 'lucide-react';

interface ConnectionNode {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const connectionNodes: ConnectionNode[] = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Sinh Viên',
    description: 'Tìm kiếm định hướng, phát triển kỹ năng, và khám phá cơ hội nghề nghiệp phù hợp.',
    delay: 0,
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Nhà Tuyển Dụng',
    description: 'Tìm kiếm tài năng trẻ, năng động, có kỹ năng phù hợp để phát triển doanh nghiệp.',
    delay: 0.1,
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Cựu Sinh Viên',
    description: 'Chia sẻ kinh nghiệm, mentoring, và xây dựng cộng đồng hỗ trợ lẫn nhau.',
    delay: 0.2,
  },
];

// Floating particles positions
const particlePositions = [
  { left: 15, top: 20, duration: 5, xDir: 1 },
  { left: 75, top: 35, duration: 6, xDir: -1 },
  { left: 30, top: 60, duration: 5.5, xDir: 1 },
  { left: 85, top: 75, duration: 6.5, xDir: -1 },
  { left: 50, top: 40, duration: 7, xDir: 1 },
];

export default function ConnectionHubSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Enhanced Background - New yet Harmonious */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs - Similar concept, different positions */}
        <motion.div
          className="absolute -top-20 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            delay: 2,
          }}
        />

        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
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

        {/* Floating particles */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, particle.xDir * 30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}>
              Cầu Nối Kết Nối 3 Bên
            </span>
          </h2>
         
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
            Ba nhóm người không chỉ kết nối, mà còn cùng nhau <span className="text-cyan-300 font-semibold">tạo giá trị, nuôi dưỡng cơ hội và kiến tạo tương lai</span> trong Hệ Sinh Thái NextStepZ.
          </p>
        </motion.div>

        {/* Interactive Connection Diagram with 3D Cards */}
        <motion.div
          className="relative mb-12 md:mb-20 hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Animated SVG Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.1))' }}
          >
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Lines connecting to center */}
            <motion.path
              d="M 100 150 Q 400 200 500 250"
              stroke="url(#connectionGradient)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M 900 150 Q 600 200 500 250"
              stroke="url(#connectionGradient)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M 500 0 Q 480 150 500 250"
              stroke="url(#connectionGradient)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.6 }}
              viewport={{ once: true }}
            />

            {/* Animated particles */}
            <motion.circle
              cx="100"
              cy="150"
              r="4"
              fill="rgb(34, 211, 238)"
              animate={{ cx: [100, 500, 100], cy: [150, 250, 150], r: [4, 6, 4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="900"
              cy="150"
              r="4"
              fill="rgb(139, 92, 246)"
              animate={{ cx: [900, 500, 900], cy: [150, 250, 150], r: [4, 6, 4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="500"
              cy="0"
              r="4"
              fill="rgb(99, 102, 241)"
              animate={{ cy: [0, 250, 0], r: [4, 6, 4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Central hub */}
            <motion.circle
              cx="500"
              cy="250"
              r="8"
              fill="none"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              animate={{ r: [8, 12, 8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="500"
              cy="250"
              r="15"
              fill="none"
              stroke="rgb(34, 211, 238)"
              strokeWidth="1"
              opacity="0.3"
              animate={{ r: [15, 25, 15], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* 3D Card Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {connectionNodes.map((node, idx) => {
              const colors = [
                { bg: 'from-blue-600/20 to-cyan-600/10', border: 'border-blue-400/40', glow: 'rgba(34, 211, 238, 0.2)' },
                { bg: 'from-purple-600/20 to-pink-600/10', border: 'border-purple-400/40', glow: 'rgba(168, 85, 247, 0.2)' },
                { bg: 'from-cyan-600/20 to-teal-600/10', border: 'border-cyan-400/40', glow: 'rgba(34, 211, 238, 0.2)' },
              ];
              const color = colors[idx];

              return (
                <motion.div
                  key={idx}
                  className="group relative h-80 sm:h-96 md:h-full"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Card Background with gradient */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-linear-to-br ${color.bg} ${color.border} border backdrop-blur-xl overflow-hidden`}
                    whileHover={{
                      boxShadow: `0 0 60px ${color.glow}`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        background: [
                          `linear-gradient(45deg, transparent, ${color.glow}, transparent)`,
                          `linear-gradient(45deg, transparent, transparent, transparent)`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Pulsing border effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl ${color.border} border-2 opacity-0 group-hover:opacity-100`}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Card Content */}
                  <div className="relative z-10 h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                    {/* Icon with pulse */}
                    <motion.div
                      className="text-4xl sm:text-5xl mb-4 sm:mb-6 inline-block w-fit"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                      whileHover={{
                        scale: 1.4,
                        rotate: 10,
                      }}
                    >
                      {idx === 0 && '🎓'}
                      {idx === 1 && '💼'}
                      {idx === 2 && '👥'}
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>
                        {node.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
                        {node.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="space-y-2">
                        {idx === 0 && (
                          <>
                            {['Định hướng sự nghiệp', 'Phát triển kỹ năng', 'Tiếp cận cơ hội'].map((feature, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2 text-gray-300 text-xs"
                                whileHover={{ x: 4 }}
                              >
                                <motion.span
                                  className="w-1 h-1 rounded-full bg-cyan-400"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                />
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </>
                        )}
                        {idx === 1 && (
                          <>
                            {['Tìm tài năng trẻ', 'Xây dựng thương hiệu', 'Tuyển dụng hiệu quả'].map((feature, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2 text-gray-300 text-xs"
                                whileHover={{ x: 4 }}
                              >
                                <motion.span
                                  className="w-1 h-1 rounded-full bg-purple-400"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                />
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </>
                        )}
                        {idx === 2 && (
                          <>
                            {['Mentoring & chia sẻ', 'Xây dựng mạng lưới', 'Phát triển bền vững'].map((feature, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2 text-gray-300 text-xs"
                                whileHover={{ x: 4 }}
                              >
                                <motion.span
                                  className="w-1 h-1 rounded-full bg-cyan-400"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                />
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-20 h-20 bg-linear-to-br from-cyan-400/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-16 h-16 bg-linear-to-tr from-purple-400/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Vision Summary - Unique Design */}
        <motion.div
          className="relative p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden mt-12 md:mt-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          />
          <div className="absolute inset-0 border border-cyan-400/30 rounded-3xl backdrop-blur-md" />

          <div className="relative z-10 text-center max-w-full mx-auto">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 inline-block"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              🧭
            </motion.div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 px-2" style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}>
              Kiến Tạo Tương Lai Nghề Nghiệp Cùng NextStepZ
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-2" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
             Từ những kết nối ý nghĩa giữa sinh viên, nhà tuyển dụng và cựu sinh viên, NextStepZ mở ra <span className="text-cyan-300 font-semibold">hệ sinh thái nghề nghiệp toàn diện</span>,
              nơi mỗi người đều có thể <span className="text-cyan-300 font-semibold">học hỏi, phát triển và tiến xa hơn</span> trên hành trình sự nghiệp của mình.
            </p>

            {/* Dynamic Interactive Stats - Revolutionary Design */}
            <div className="mt-8 sm:mt-10 md:mt-12 pt-8 sm:pt-10 md:pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
                {/* Background animated connector */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 1000 200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
                      <stop offset="50%" stopColor="rgb(34, 211, 238)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 100 100 Q 350 50 650 100 T 900 100"
                    stroke="url(#flowGradient)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>

                {[
                  { num: 'Phát Triển Năng Lực', label: 'Mở rộng kỹ năng, tích lũy kinh nghiệm từ thực tế và chuyên gia.', icon: '🚀', color: 'from-blue-400 to-cyan-400' },
                  { num: 'Mở Rộng Cơ Hội', label: 'Tiếp cận việc làm, dự án và mạng lưới chuyên nghiệp chất lượng.', icon: '🌐', color: 'from-purple-400 to-pink-400' },
                  { num: 'Định Hướng Tương Lai', label: 'Tự tin vạch ra con đường sự nghiệp phù hợp với đam mê và năng lực.', icon: '💡', color: 'from-cyan-400 to-teal-400' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Rotating background blur */}
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${stat.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                    />

                    {/* Main stat card */}
                    <motion.div
                      className={`relative p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 overflow-hidden min-h-[180px] sm:min-h-[220px] flex flex-col justify-center`}
                      whileHover={{ 
                        scale: 1.08,
                        boxShadow: `0 0 40px ${idx === 0 ? 'rgba(34, 211, 238, 0.4)' : idx === 1 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(34, 211, 238, 0.4)'}`,
                        y: -10,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {/* Animated gradient border */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-linear-to-r ${stat.color} opacity-0 group-hover:opacity-20`}
                        animate={{
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      <div className="relative z-10 text-center space-y-2">
                        {/* Icon - Animated */}
                        <motion.div
                          className="text-3xl sm:text-4xl md:text-5xl mb-1"
                          animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                          }}
                        >
                          {stat.icon}
                        </motion.div>

                        {/* Number with counting effect */}
                        <motion.div
                          className={`text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent leading-tight`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: idx * 0.3 }}
                          viewport={{ once: true }}
                          style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                        >
                          {stat.num}
                        </motion.div>

                        {/* Label */}
                        <motion.div
                          className="text-xs sm:text-sm font-regular text-gray-300 tracking-wide leading-tight"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: idx * 0.3 + 0.2 }}
                          viewport={{ once: true }}
                          style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}
                        >
                          {stat.label}
                        </motion.div>

                        {/* Pulse indicator */}
                        <motion.div
                          className={`h-0.5 w-10 mx-auto bg-linear-to-r ${stat.color} rounded-full`}
                          animate={{
                            scaleX: [0.5, 1, 0.5],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.3,
                          }}
                        />
                      </div>

                      {/* Corner accent */}
                      <motion.div
                        className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full blur-xl`}
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                      />
                    </motion.div>

                    {/* Floating particle effect on hover */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-linear-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-60`}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 100, 0],
                          y: [0, -50 - i * 20, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Bottom insight message */}
              <motion.div
                className="mt-8 sm:mt-10 md:mt-12 text-center px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-xs sm:text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="hidden sm:inline"
                  >
                    ⚡
                  </motion.span>
                  <span style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>NextStepZ – nơi mỗi kết nối trở thành bước đệm cho hành trình tương lai.</span>
                  <motion.span
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="hidden sm:inline"
                  >
                    ⚡
                  </motion.span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
