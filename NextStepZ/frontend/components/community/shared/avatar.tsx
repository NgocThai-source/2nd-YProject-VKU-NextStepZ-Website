'use client';

import Image from 'next/image';
import { ComponentProps } from 'react';

interface AvatarProps extends ComponentProps<'div'> {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
  verified?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export function Avatar({
  src,
  alt,
  size = 'md',
  isOnline = false,
  verified = false,
  className = '',
  ...props
}: AvatarProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-full object-cover"
        sizes={size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px'}
      />

      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}

      {verified && (
        <div className="absolute bottom-0 right-0 -m-1 bg-blue-500 rounded-full p-0.5 text-white">
          <svg
            className="w-2 h-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
