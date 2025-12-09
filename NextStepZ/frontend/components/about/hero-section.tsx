'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function AboutHeroSection() {
  const particlePositions = [
    { left: 20, top: 30 },
    { left: 80, top: 40 },
    { left: 40, top: 60 },
    { left: 70, top: 20 },
    { left: 10, top: 80 },
  ];

  const scrollToSection = () => {
    const element = document.getElementById('story-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-900 pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 4,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main heading */}
        <motion.h1
          className="mb-6 text-5xl md:text-7xl font-extrabold text-white leading-tight"
          variants={itemVariants}
        >
          Về Chúng Tôi –{' '}
          <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            NextStepZ
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-12 max-w-2xl mx-auto text-lg text-gray-300"
          variants={itemVariants}
        >
          Nơi bắt đầu hành trình sự nghiệp của bạn. Chúng tôi kết nối sinh viên với những cơ hội phù hợp, đồng thời giúp bạn phát triển kỹ năng để tự tin bước vào tương lai.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <button
            onClick={scrollToSection}
            className="px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Tìm Hiểu Thêm
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-cyan-500/50 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105"
          >
            Quay Lại Trang Chủ
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToSection}
          className="absolute bottom--60 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
          <span className="text-sm font-medium">Cuộn xuống</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
