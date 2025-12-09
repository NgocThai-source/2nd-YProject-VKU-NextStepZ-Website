'use client';

import { motion } from 'framer-motion';
import { Eye, Rocket } from 'lucide-react';

export default function VisionMissionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
          >
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Hướng Đi & Mục Tiêu của NextStepZ
            </span>
          </h2>
          <p
            className="text-gray-400 text-base md:text-lg max-w mx-auto"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Xây dựng nền tảng định hướng và kết nối nghề nghiệp dành cho sinh viên.
Mang đến cơ hội thực tập, việc làm và part-time phù hợp.
Hỗ trợ sinh viên phát triển kỹ năng, tiếp cận thị trường lao động và định hình tương lai rõ ràng hơn.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Vision Card */}
          <motion.div
            variants={itemVariants}
            className="group relative"
            whileHover={{ y: -8 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            <div className="relative h-full p-8 md:p-12 rounded-2xl border border-cyan-400/30 bg-linear-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300">
              {/* Icon */}
              <motion.div
                className="mb-6 w-16 h-16 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Eye className="w-8 h-8 text-cyan-400" />
              </motion.div>

              {/* Content */}
              <h3
                className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4"
                style={{ fontFamily: "'Poppins SemiBold', sans-serif" }}
              >
                Tầm Nhìn
              </h3>

              <p
                className="text-gray-300 text-base md:text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                Trở thành nền tảng định hướng nghề nghiệp uy tín dành cho sinh viên nơi kết nối các bạn trẻ với nhà tuyển dụng và những người dẫn dắt trong ngành.
              </p>
              <ul className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 space-y-2">
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span>Xây dựng một hệ sinh thái hỗ trợ phát triển sự nghiệp cho sinh viên và người mới đi làm</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span>Giúp mỗi cá nhân khám phá tiềm năng thật sự, hiểu mình phù hợp với con đường nào</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span>Mang đến cơ hội kết nối chân thực giữa sinh viên và doanh nghiệp</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span>Hỗ trợ xây dựng sự nghiệp bền vững, chủ động và phù hợp với năng lực</span>
                </li>
              </ul>
              <p
                className="text-gray-300 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                NextStepZ hướng đến việc trở thành người bạn đồng hành lâu dài, giúp sinh viên tự tin định hướng, phát triển và tìm thấy cơ hội phù hợp trên hành trình nghề nghiệp của mình.
              </p>

              {/* Decorative element */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={itemVariants}
            className="group relative"
            whileHover={{ y: -8 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            />

            <div className="relative h-full p-8 md:p-12 rounded-2xl border border-blue-400/30 bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300">
              {/* Icon */}
              <motion.div
                className="mb-6 w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <Rocket className="w-8 h-8 text-blue-400" />
              </motion.div>

              {/* Content */}
              <h3
                className="text-2xl md:text-3xl font-bold text-blue-300 mb-4"
                style={{ fontFamily: "'Poppins SemiBold', sans-serif" }}
              >
                Sứ Mệnh
              </h3>

              <p
                className="text-gray-300 text-base md:text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                NextStepZ mang sứ mệnh cung cấp công cụ, tài nguyên và cộng đồng đáng tin cậy giúp sinh viên:
              </p>
              <ul className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 space-y-2">
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Khám phá đam mê và tiềm năng nghề nghiệp</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Phát triển kỹ năng thực chiến</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Tìm kiếm công việc đúng chuyên ngành hoặc part-time phù hợp</span>
                </li>
                <li style={{ fontFamily: "'Poppins Regular', sans-serif" }} className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Xây dựng mạng lưới chuyên môn vững chắc cho tương lai</span>
                </li>
              </ul>
              <p
                className="text-gray-300 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                Chúng mình hướng đến việc tạo ra một nền tảng đồng hành lâu dài, giúp sinh viên tự tin bước vào thị trường lao động đầy biến động.
              </p>

              {/* Decorative element */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        
      </div>
    </section>
  );
}
