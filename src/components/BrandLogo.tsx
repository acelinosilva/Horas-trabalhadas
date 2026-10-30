import React from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onClick, size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <a
      href="#/"
      onClick={onClick}
      aria-label="Horas Trabalhadas — Ir para a página inicial"
      className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={`${iconSize} shrink-0 transition-transform duration-150 group-hover:scale-[1.03]`}
      >
        <rect width="64" height="64" rx="15" className="fill-teal-800 dark:fill-teal-700" />
        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="12"
          stroke="#2DD4BF"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="32"
          r="19"
          stroke="#F0FDFA"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="92 28"
          transform="rotate(-45 32 32)"
        />
        <path
          d="M44 17.5L48.5 22L55 15.5"
          stroke="#34D399"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 21V32L40 36.5"
          stroke="#FFFFFF"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="3" fill="#34D399" />
      </svg>
      <span
        className={`${textSize} font-bold tracking-tight text-slate-900 dark:text-white font-display`}
      >
        Horas <span className="text-teal-700 dark:text-teal-400">Trabalhadas</span>
      </span>
    </a>
  );
};
