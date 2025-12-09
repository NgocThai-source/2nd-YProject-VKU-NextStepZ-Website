'use client';

import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sáng tạo hồ sơ', href: '/portfolio' },
  { label: 'Đề xuất', href: '/recommendations' },
  { label: 'Cộng đồng', href: '/community' },
  { label: 'Công ty', href: '/companies' },
  { label: 'Job Map', href: '/job-map' },
  { label: 'Về chúng tôi', href: '/about' },
];

interface NavMenuProps {
  scrolled: boolean;
}

export function NavMenu({ scrolled }: NavMenuProps) {
  return (
    <nav className={`flex items-center ${scrolled ? 'gap-7' : 'gap-1'}`}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 text-sm font-semibold relative group whitespace-nowrap transition-colors duration-200 ${
            scrolled
              ? 'text-gray-200 hover:text-white'
              : 'text-gray-300 hover:text-cyan-300'
          }`}
          style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}
        >
          {item.label}

          {/* Underline hover effect */}
          <span
            className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out ${
              scrolled ? 'bg-cyan-400' : 'bg-cyan-400/80'
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
