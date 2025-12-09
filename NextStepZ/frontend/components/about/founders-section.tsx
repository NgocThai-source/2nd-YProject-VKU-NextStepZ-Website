'use client';

import { motion } from 'framer-motion';
import { Facebook, Mail, Github } from 'lucide-react';
import Image from 'next/image';

interface Founder {
  id: number;
  name: string;
  university: string;
  social: {
    facebook?: string;
    email?: string;
    github?: string;
  };
  image: string;
}

const founders: Founder[] = [
  {
    id: 1,
    name: 'Nguyễn Ngọc Thái',
    university: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU), Đại học Đà Nẵng',
    social: {
      facebook: 'https://www.facebook.com/2nthais/',
      email: 'nguyenngocthai.nqu@gmail.com',
      github: 'https://github.com/NgocThai-source',
    },
    image: '/images/picnv1.jpg',
  },
  {
    id: 2,
    name: 'Lê Đức Hải',
    university: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU), Đại học Đà Nẵng',
    social: {
      facebook: 'https://facebook.com',
      email: 'tech@nextstepz.com',
      github: 'https://github.com',
    },
    image: '/images/founders/founder-2.jpg',
  },
];

export default function FoundersSection() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 -right-48 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            delay: 2,
          }}
        />

        {/* Animated grid */}
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
            backgroundImage:
              'linear-gradient(45deg, #22d3ee 1px, transparent 1px), linear-gradient(-45deg, #22d3ee 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />

        {/* Floating particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6"
            style={{ fontFamily: "'Exo 2 ExtraBold', sans-serif" }}
          >
            <span className="bg-linear-to-r from-purple-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Những Người Đứng Sau NextStepZ
            </span>
          </h2>

          <p
            className="text-gray-400 text-base md:text-lg max-w- mx-auto"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Giữa sự bấp bênh của thị trường và nỗi lo thất nghiệp, chúng mình muốn tạo nên một nền tảng thật sự hỗ trợ sinh viên — giúp các bạn tìm được hướng đi phù hợp, một công việc đúng ngành 
            hoặc thậm chí là những công việc part-time để vững vàng hơn trên hành trình trưởng thành của. Và chúng mình đã biến một ý tưởng nhỏ bé ấy thành NextStepZ - nơi giúp sinh viên tìm được hướng đi đúng đắn cho tương lai.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              variants={itemVariants}
              className="group"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-full">
                {/* Glow effect background */}
                <motion.div
                  className={`absolute -inset-0.5 rounded-3xl bg-linear-to-r ${
                    index === 0
                      ? 'from-cyan-500/30 to-blue-500/30'
                      : 'from-purple-500/30 to-pink-500/30'
                  } blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                {/* Main Card */}
                <div className={`relative h-full p-8 md:p-10 rounded-3xl border backdrop-blur-sm transition-all duration-500 bg-linear-to-br ${
                  index === 0
                    ? 'border-cyan-400/20 from-cyan-500/10 to-blue-500/10 group-hover:border-cyan-400/50'
                    : 'border-purple-400/20 from-purple-500/10 to-pink-500/10 group-hover:border-purple-400/50'
                }`}>
                  {/* Profile Image Section */}
                  <motion.div
                    className="mb-8 relative flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`relative w-80 h-90 rounded-2xl overflow-hidden border-2 ${
                        index === 0 ? 'border-cyan-400/30' : 'border-purple-400/30'
                      } group-hover:border-opacity-100 transition-all duration-300`}
                    >
                      {index === 0 && founder.image ? (
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className={`w-full h-full rounded-2xl flex items-center justify-center text-white text-lg font-semibold bg-linear-to-br ${
                          index === 0
                            ? 'from-cyan-500 to-blue-600'
                            : 'from-purple-500 to-pink-600'
                        }`}>
                          {founder.name.charAt(0)}
                        </div>
                      )}
                    </div>


                  </motion.div>

                  {/* Content Section */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <h3
                        className={`text-2xl md:text-3xl font-bold mb-3 ${
                          index === 0 ? 'text-cyan-300' : 'text-purple-300'
                        }`}
                        style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}
                      >
                        {founder.name}
                      </h3>
                      <p
                        className="text-xs md:text-sm text-gray-400 flex items-center gap-2"
                        style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`} />
                        {founder.university}
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <motion.div
                    className="flex items-center gap-4 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {founder.social.facebook && (
                      <motion.a
                        href={founder.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border transition-all duration-300 ${
                          index === 0
                            ? 'border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50'
                            : 'border-purple-400/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400/50'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="w-4 h-4" />
                      </motion.a>
                    )}
                    {founder.social.github && (
                      <motion.a
                        href={founder.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border transition-all duration-300 ${
                          index === 0
                            ? 'border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50'
                            : 'border-purple-400/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400/50'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {founder.social.email && (
                      <motion.a
                        href={`mailto:${founder.social.email}`}
                        className={`p-2 rounded-lg border transition-all duration-300 ${
                          index === 0
                            ? 'border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50'
                            : 'border-purple-400/20 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400/50'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    )}
                    <div className="flex-1" />
                    <p
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                    >
                      Kết nối với chúng tôi
                    </p>
                  </motion.div>

                  {/* Decorative corner elements */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 rounded-full ${
                      index === 0 ? 'bg-cyan-500/10' : 'bg-purple-500/10'
                    } blur-xl pointer-events-none`}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 w-16 h-16 rounded-full ${
                      index === 0 ? 'bg-blue-500/10' : 'bg-pink-500/10'
                    } blur-xl pointer-events-none`}
                    animate={{
                      scale: [1.2, 0.8, 1.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Quote Section */}
        <motion.div
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="relative px-8 md:px-12 py-12 md:py-16 rounded-2xl border border-cyan-400/30 bg-linear-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-sm overflow-hidden">
            {/* Background glow */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 blur-2xl opacity-50"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <div className="relative text-center space-y-4">
              <p
                className="text-lg md:text-2xl text-gray-300 italic leading-relaxed"
                style={{ fontFamily: "'Poppins Medium Italic', sans-serif" }}
              >
                &ldquo;Chúng mình tin rằng mỗi sinh viên đều sở hữu một tiềm năng lớn hơn những gì họ nghĩ. NextStepZ được tạo ra để giúp bạn khám phá thế mạnh của mình, phát triển kỹ năng và từng bước biến ước mơ nghề nghiệp thành hiện thực.&rdquo;
              </p>
              <p
                className="text-sm md:text-base text-cyan-400"
                style={{ fontFamily: "'Poppins SemiBold', sans-serif" }}
              >
                — Nguyễn Ngọc Thái
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
