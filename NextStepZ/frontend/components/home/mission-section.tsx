'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Rocket } from 'lucide-react';

interface MissionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const missionItems: MissionItem[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Định Hướng Sự Nghiệp',
    description: 'Giúp sinh viên khám phá đam mê, xác định mục tiêu và vạch rõ con đường nghề nghiệp phù hợp với năng lực, giá trị và ước mơ cá nhân.',
    delay: 0,
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Phát Triển Kỹ Năng',
    description: 'Mang đến nền tảng học tập hiện đại, giúp sinh viên rèn luyện chuyên môn và kỹ năng mềm, sẵn sàng chinh phục thị trường lao động.',
    delay: 0.1,
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Kết Nối Cộng Đồng',
    description: 'Xây dựng mạng lưới gắn kết sinh viên, cựu sinh viên và nhà tuyển dụng trong một cộng đồng học hỏi – chia sẻ – phát triển bền vững.',
    delay: 0.2,
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Tìm Cơ Hội Việc Làm',
    description: 'Ứng dụng công nghệ AI để gợi ý công việc, dự án và cơ hội phù hợp, giúp mỗi sinh viên tìm thấy lối đi đúng cho hành trình sự nghiệp.',
    delay: 0.3,
  },
];

export default function MissionSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="mission-section" className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-b from-slate-900 to-slate-950">
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}>
              Tại Sao NextStepZ Ra Đời?
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-8xl mx-auto" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
            Sinh viên ngày nay đang đối mặt với nhiều thách thức — <span className="text-cyan-300 font-semibold">thiếu định hướng, thiếu kết nối</span> và <span className="text-cyan-300 font-semibold">thiếu cơ hội</span> phát triển bản thân. <span className="text-cyan-300 font-semibold">NextStepZ</span> ra đời để đồng hành cùng họ trên hành trình <span className="text-cyan-300 font-semibold">khám phá đam mê, trau dồi kỹ năng</span> và <span className="text-cyan-300 font-semibold">kiến tạo tương lai sự nghiệp</span>.
          </p>
        </motion.div>

        {/* Mission Items */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {missionItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative p-6 rounded-2xl bg-linear-to-br from-blue-500/5 to-purple-500/5 border border-blue-400/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)',
              }}
            >
              {/* Icon Background */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/20 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <motion.div
                  className="text-cyan-400"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}>{item.title}</h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>{item.description}</p>
              </div>

              {/* Border Light Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-400/30 transition-all duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-3xl font-bold mb-6 text-white" style={{ fontFamily: "'Poppins ExtraBold', sans-serif" }}>Tầm Nhìn</h3>
          <p className="text-lg text-gray-300 leading-relaxed max-full mx-auto" style={{ fontFamily: "'Poppins Regular', sans-serif" }}>
            NextStepZ hướng tới trở thành <span className="text-cyan-300 font-semibold">nền tảng sinh viên – việc làm – cộng đồng số 1</span> cho thế hệ trẻ định hướng tương lai. Nơi sinh viên có thể khám phá tiềm năng, kết nối với những người cùng chí hướng & kiến tạo tương lai sự nghiệp toàn diện.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
