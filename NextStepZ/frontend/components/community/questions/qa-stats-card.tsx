'use client';

import { Question } from '@/lib/community-mock-data';

interface QAStatsCardProps {
  questions: Question[];
}

export function QAStatsCard({ questions }: QAStatsCardProps) {
  const unansweredCount = questions.filter((q) => !q.isAnswered).length;
  const resolvedRate =
    questions.length > 0
      ? Math.round(
          ((questions.length - unansweredCount) / questions.length) * 100
        )
      : 0;

  return (
    <div className="rounded-xl bg-white/5 border border-cyan-400/20 backdrop-blur-sm p-6">
      <h3
        className="text-lg font-bold text-white mb-4"
        style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
      >
        📊 Thống kê Hỏi & Đáp
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center pb-3 border-b border-cyan-400/10">
          <p
            className="text-gray-400"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Tổng câu hỏi:
          </p>
          <p className="font-bold text-cyan-300 text-lg">{questions.length}</p>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-cyan-400/10">
          <p
            className="text-gray-400"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Chưa được trả lời:
          </p>
          <p className="font-bold text-red-400 text-lg">{unansweredCount}</p>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-cyan-400/10">
          <p
            className="text-gray-400"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Tỷ lệ câu hỏi được giải quyết:
          </p>
          <p className="font-bold text-green-400 text-lg">{resolvedRate}%</p>
        </div>
        <div className="flex justify-between items-center">
          <p
            className="text-gray-400"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Câu trả lời tuần này:
          </p>
          <p className="font-bold text-purple-400 text-lg">
            12
          </p>
        </div>
      </div>
    </div>
  );
}
