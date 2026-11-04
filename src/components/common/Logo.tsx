import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'silver' | 'white' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  tone = 'silver'
}) => {
  const monogramSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.28em]',
    md: 'text-base tracking-[0.32em]',
    lg: 'text-xl tracking-[0.35em]',
    xl: 'text-3xl tracking-[0.38em]'
  };

  const silverGradient = 'url(#stridePlatinumGradient)';
  const strokeColor = tone === 'white' ? '#FFFFFF' : tone === 'dark' ? '#111111' : silverGradient;

  const MonogramSvg = (
    <svg
      className={`${monogramSizes[size]} shrink-0 transition-transform duration-300 hover:scale-105`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="STRIDE LONDON Platinum Emblem"
    >
      <defs>
        <linearGradient id="stridePlatinumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <filter id="silverGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Modern Architectural Geometric Diamond & Circle Bezel */}
      <rect x="15" y="15" width="70" height="70" rx="20" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
      <circle cx="50" cy="50" r="42" stroke={strokeColor} strokeWidth="1" opacity="0.6" />
      
      {/* Sleek Interconnected S Monogram */}
      <path
        d="M66 30 C66 20 56 16 48 16 C38 16 30 22 30 32 C30 42 38 46 48 50 C60 54 70 58 70 68 C70 78 58 84 48 84 C36 84 28 78 28 66"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#silverGlow)"
      />

      {/* Precision Metallic Nodes */}
      <circle cx="68" cy="22" r="3" fill={strokeColor} />
      <circle cx="28" cy="78" r="3" fill={strokeColor} />
      
      {/* Center Refined Cross Accent */}
      <line x1="44" y1="50" x2="56" y2="50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'monogram') {
    return <div className={`inline-flex items-center ${className}`}>{MonogramSvg}</div>;
  }

  if (variant === 'wordmark') {
    return (
      <span
        className={`font-brand font-bold uppercase ${textSizes[size]} ${
          tone === 'white' ? 'text-white' : tone === 'dark' ? 'text-neutral-900' : 'text-slate-100'
        } ${className}`}
      >
        STRIDE LONDON
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {MonogramSvg}
      <div className="flex flex-col">
        <span
          className={`font-brand font-bold uppercase leading-none ${textSizes[size]} text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400`}
        >
          STRIDE LONDON
        </span>
        <span className="text-[9px] uppercase tracking-[0.38em] text-slate-400 mt-1 font-medium">
          Step Bold · Live Stylish
        </span>
      </div>
    </div>
  );
};
