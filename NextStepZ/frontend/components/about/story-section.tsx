'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, Users, Target } from 'lucide-react';
import Image from 'next/image';

export default function OurStorySection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const highlights = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      text: 'Kết nối sinh viên với cơ hội thực tập, việc làm và part-time phù hợp',
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: 'Xây dựng cộng đồng học tập – chia sẻ kinh nghiệm thực tế từ người đi trước',
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Hỗ trợ doanh nghiệp tiếp cận và tìm kiếm tài năng trẻ đầy tiềm năng',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: 'Ứng dụng công nghệ AI để cá nhân hoá lộ trình và trải nghiệm người dùng',
    },
  ];

  return (
    <section
      id="story-section"
      className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-slate-900 to-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
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
            duration: 12,
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
              Một Hành Trình Bắt Đầu Từ Nhu Cầu Thực Tế
            </span>
          </h2>
          <p
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Điều đã thôi thúc chúng tôi xây dựng NextStepZ
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Poppins SemiBold', sans-serif" }}
              >
                Một Hành Trình Bắt Đầu Từ Nhu Cầu Thực Tế
              </h3>
              <p
                className="text-gray-300 leading-relaxed text-base md:text-lg mb-4"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                NextStepZ ra đời từ thực trạng hàng nghìn sinh viên mỗi năm phải đối mặt với áp lực tìm việc, thiếu trải nghiệm thực tế, kỹ năng chưa đủ và không biết đâu là cơ hội phù hợp cho mình.
              </p>
              <p
                className="text-gray-300 leading-relaxed text-base md:text-lg mb-6"
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                Chúng mình không chỉ muốn tạo ra một nền tảng tìm việc đơn thuần — mà mong xây dựng một hệ sinh thái hỗ trợ sinh viên phát triển sự nghiệp một cách bền vững, rõ ràng và đúng hướng.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div variants={containerVariants} className="space-y-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors duration-300"
                  >
                    <div className="shrink-0 mt-1 text-cyan-400">
                      {item.icon}
                    </div>
                    <p
                      className="text-gray-300 text-sm md:text-base"
                      style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Image container with border glow */}
            <div className="relative h-full rounded-2xl overflow-hidden border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
              <Image
                src="/images/trip.jpg"
                alt="NextStepZ Journey"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay gradient for better text readability */}
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* Border glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyan-400/20 pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.2)',
                    '0 0 40px rgba(34, 211, 238, 0.4)',
                    '0 0 20px rgba(34, 211, 238, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
