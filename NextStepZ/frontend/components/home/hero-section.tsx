'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CountUpNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetValue = value;
    const increment = targetValue / (duration * 60);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-bold text-cyan-300">
      {count}K+
    </div>
  );
};

export default function HeroSection() {
  const handleLearnMore = () => {
    const nextSection = document.getElementById('mission-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      transition: { duration: 0.8 },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 px-4 md:px-8 py-20 md:py-32">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-sm w-fit"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
             <span className="text-sm font-medium text-cyan-300" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
                Tương lai bắt đầu từ đây
              </span>
            </motion.div>

            {/* Main Title - Logo */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/images/logofull1-transprent.png"
                  alt="NextStepZ Logo"
                  width={384}
                  height={128}
                  sizes="(max-width: 768px) 320px, 384px"
                  className="w-80 h-auto md:w-96 drop-shadow-lg"
                  priority
                />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold bg-linear-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent ml-1.5" style={{ fontFamily: "'Poppins Medium Italic', sans-serif" }}>
                Your First Step to the Future
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl" style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              variants={itemVariants}
            >
              Kết nối sinh viên, nhà tuyển dụng và cựu sinh viên trong cùng một hệ sinh thái công nghệ hiện đại.
Nơi bạn tìm thấy cơ hội, rèn luyện kỹ năng và kiến tạo tương lai sự nghiệp của chính mình.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
              <Link href="/auth">
                <motion.button
                  className="px-8 py-4 rounded-lg bg-linear-to-r from-cyan-400 to-blue-500 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Khám Phá Ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <motion.button
                className="px-8 py-4 rounded-lg border-2 border-cyan-400/50 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition-all duration-300" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLearnMore}
              >
                Tìm Hiểu Thêm
              </motion.button>
            </motion.div>

            
          </motion.div>

          {/* Right Visual */}
          <motion.div className="relative h-96 md:h-full" variants={itemVariants}>
            {/* Animated Circles Background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={floatingVariants}
            >
              {/* Large circle */}
              <motion.div
                className="absolute w-64 h-64 rounded-full bg-linear-to-br from-blue-500 to-purple-600 opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Medium circle */}
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 opacity-30 blur-2xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />

              {/* Small circle */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-linear-to-br from-pink-400 to-cyan-400 opacity-40 blur-xl"
                animate={{
                  x: [0, 20, -20, 0],
                  y: [0, -20, 20, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Floating Elements */}
            {[
              { label: 'Job Map (bản đồ việc làm)', delay: 0 },
              { label: 'Gợi ý việc làm thông minh (AI Matching)', delay: 0.3 },
              { label: 'Cộng đồng đến từ NextStepZ', delay: 0.6 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="absolute px-4 py-2 rounded-lg bg-white/5 border border-cyan-400/30 backdrop-blur-md text-sm text-cyan-300 font-medium"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: item.delay,
                }}
                style={{
                  top: `${20 + idx * 30}%`,
                  left: idx % 2 === 0 ? '10%' : '60%',
                  fontFamily: "'Poppins SemiBold', sans-serif",
                }}
              >
                <Star className="w-4 h-4 inline mr-2" />{item.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Scroll để khám phá</span>
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
