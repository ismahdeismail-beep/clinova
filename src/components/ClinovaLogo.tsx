import { memo } from 'react';

function ClinovaLogo({ size = 24, variant = 'default' }: { size?: number; variant?: string }) {
  // Determine colors based on variant, defaulting to our vibrant theme-aware gradient
  const hasGradient = variant === 'default' || variant === 'colored';
  const strokeColor = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#0F172A' : 'var(--primary)';
  const fillColor = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#0F172A' : 'url(#clinova-grad)';
  const starOpacity = variant === 'light' ? 0.25 : 0.15;
  const ringOpacity = variant === 'light' ? 0.5 : 0.4;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block transition-transform duration-300 hover:scale-105"
      id="clinova-logo-svg"
    >
      <defs>
        {/* Modern health-tech gradient from primary (blue/cyan) to primary-hover */}
        <linearGradient id="clinova-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-hover)" />
        </linearGradient>
      </defs>

      {/* 1. Outer Precision Orbital Ring (represents universal reach, connection, and wholeness) */}
      <circle 
        cx="16" 
        cy="16" 
        r="14" 
        stroke={hasGradient ? "url(#clinova-grad)" : strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeDasharray="64 16" 
        opacity={ringOpacity}
        fill="none" 
      />

      {/* Tiny orbital satellite node representing continuous innovation / data point */}
      <circle
        cx="28"
        cy="10"
        r="1.5"
        fill={hasGradient ? "url(#clinova-grad)" : fillColor}
      />

      {/* 2. Background Astroid Star / Nova (represents "Nova" - new light, intelligence, and future innovation) */}
      <path 
        d="M 16 5 A 11 11 0 0 0 27 16 A 11 11 0 0 0 16 27 A 11 11 0 0 0 5 16 A 11 11 0 0 0 16 5 Z" 
        fill={hasGradient ? "url(#clinova-grad)" : fillColor}
        opacity={starOpacity}
      />

      {/* 3. Foreground Floating-Core Clinical Cross (represents "Clinical" - precision medicine and care) */}
      {/* Dynamic segments leaving a clean, breathing negative space at the exact center */}
      {/* Top limb */}
      <rect 
        x="14.5" 
        y="7.5" 
        width="3" 
        height="6.5" 
        rx="1.5" 
        fill={hasGradient ? "url(#clinova-grad)" : fillColor} 
      />
      {/* Bottom limb */}
      <rect 
        x="14.5" 
        y="18" 
        width="3" 
        height="6.5" 
        rx="1.5" 
        fill={hasGradient ? "url(#clinova-grad)" : fillColor} 
      />
      {/* Left limb */}
      <rect 
        x="7.5" 
        y="14.5" 
        width="6.5" 
        height="3" 
        rx="1.5" 
        fill={hasGradient ? "url(#clinova-grad)" : fillColor} 
      />
      {/* Right limb */}
      <rect 
        x="18" 
        y="14.5" 
        width="6.5" 
        height="3" 
        rx="1.5" 
        fill={hasGradient ? "url(#clinova-grad)" : fillColor} 
      />
    </svg>
  );
}

export default memo(ClinovaLogo);
