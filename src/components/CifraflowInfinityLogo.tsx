import React from 'react';

interface CifraflowInfinityLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showShield?: boolean;
  className?: string;
  animate?: boolean;
}

export const CifraflowInfinityLogo: React.FC<CifraflowInfinityLogoProps> = ({
  size = 'md',
  showShield = true,
  className = '',
  animate = true
}) => {
  const dimensions = {
    sm: { w: 40, h: 40, stroke: 3.5, shieldPad: 'p-1.5' },
    md: { w: 64, h: 64, stroke: 4.5, shieldPad: 'p-2.5' },
    lg: { w: 96, h: 96, stroke: 6, shieldPad: 'p-4' },
    xl: { w: 128, h: 128, stroke: 7, shieldPad: 'p-5' }
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Glow Aura */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-60 bg-gradient-to-r from-[#00f3ff] via-[#a855f7] to-[#ff007f] pointer-events-none"
      />

      {/* Holographic Shield Container */}
      <div 
        className={`relative z-10 rounded-2xl flex items-center justify-center transition-all ${
          showShield 
            ? `bg-[#050814]/90 border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(0,243,255,0.45)] ring-1 ring-cyan-500/30 backdrop-blur-md ${dimensions.shieldPad}`
            : ''
        }`}
      >
        <svg
          width={dimensions.w}
          height={dimensions.h * 0.65}
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={animate ? 'filter drop-shadow-[0_0_12px_rgba(0,243,255,0.7)]' : ''}
        >
          <defs>
            {/* Cyan to Magenta Gradient */}
            <linearGradient id="cifraInfinityGrad" x1="10" y1="45" x2="150" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f3ff" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#ff007f" />
            </linearGradient>

            {/* Glowing Accent Filter */}
            <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="circuitGrid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff007f" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Background circuit grid traces */}
          <path
            d="M20 45 L5 25 M140 45 L155 25 M80 15 L80 5 M80 75 L80 85 M45 15 L40 5 M115 15 L120 5"
            stroke="rgba(0,243,255,0.3)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Primary Infinity 3D Circuit Loop (Lemniscate path) */}
          <path
            d="M 80 45 
               C 55 18, 25 18, 25 45 
               C 25 72, 55 72, 80 45 
               C 105 18, 135 18, 135 45 
               C 135 72, 105 72, 80 45 Z"
            stroke="url(#cifraInfinityGrad)"
            strokeWidth={dimensions.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#circuitGlow)"
          />

          {/* Circuit Inner Line / Pulse track */}
          <path
            d="M 80 45 
               C 55 22, 29 22, 29 45 
               C 29 68, 55 68, 80 45 
               C 105 22, 131 22, 131 45 
               C 131 68, 105 68, 80 45 Z"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            opacity="0.85"
            className={animate ? 'animate-pulse' : ''}
          />

          {/* Central Crossing Node */}
          <circle cx="80" cy="45" r="4" fill="#00f3ff" className="shadow-lg" />
          <circle cx="80" cy="45" r="2" fill="#ffffff" />

          {/* Left Circuit Tech Nodes (Cyan side) */}
          <circle cx="25" cy="45" r="3.5" fill="#00f3ff" />
          <circle cx="48" cy="24" r="2.5" fill="#38bdf8" />
          <circle cx="48" cy="66" r="2.5" fill="#38bdf8" />

          {/* Right Circuit Tech Nodes (Magenta side) */}
          <circle cx="135" cy="45" r="3.5" fill="#ff007f" />
          <circle cx="112" cy="24" r="2.5" fill="#c084fc" />
          <circle cx="112" cy="66" r="2.5" fill="#ff007f" />
        </svg>
      </div>
    </div>
  );
};
