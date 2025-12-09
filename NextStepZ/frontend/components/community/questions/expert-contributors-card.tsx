'use client';

interface ExpertContributorsCardProps {
  experts?: Array<{ name: string; answers: number; badge: string }>;
}

export function ExpertContributorsCard({
  experts = [
    { name: 'Trần Thị B', answers: 45, badge: '🏆' },
    { name: 'Lý Quốc D', answers: 38, badge: '🥈' },
    { name: 'Phạm Minh C', answers: 32, badge: '🥉' },
  ],
}: ExpertContributorsCardProps) {
  return (
    <div className="rounded-xl bg-white/5 border border-cyan-400/20 backdrop-blur-sm p-6">
      <h3
        className="text-lg font-bold text-white mb-4"
        style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
      >
        ⭐ Chuyên Gia Hàng Đầu
      </h3>
      <div className="space-y-3">
        {experts.map((expert, idx) => (
          <div
            key={idx}
            className="p-3 bg-white/5 border border-cyan-400/10 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{expert.badge}</span>
                <div>
                  <p className="text-sm font-medium text-white">{expert.name}</p>
                  <p className="text-xs text-gray-500">{expert.answers} câu trả lời</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
