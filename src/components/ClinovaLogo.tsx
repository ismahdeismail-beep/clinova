import { memo } from 'react';

interface ClinovaLogoProps {
  size?: number;
  variant?: 'default' | 'monochrome' | 'light';
  className?: string;
}

const COLOR_MAP = {
  default: {
    shield: '#1E3A8A',
    cross: '#0EA5E9',
    accent: '#10B981',
    stroke: '#38BDF8',
  },
  monochrome: {
    shield: '#2563EB',
    cross: '#2563EB',
    accent: '#1D4ED8',
    stroke: '#2563EB',
  },
  light: {
    shield: '#DBEAFE',
    cross: '#2563EB',
    accent: '#059669',
    stroke: '#93C5FD',
  },
};

function ClinovaLogo({ size = 32, variant = 'default', className }: ClinovaLogoProps) {
  const c = COLOR_MAP[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Clinova"
      role="img"
    >
      <path
        d="M16 1.5L28.5 7.5V17.5Q28.5 26 16 30Q3.5 26 3.5 17.5V7.5Z"
        fill={c.shield}
        stroke={c.stroke}
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <rect x="13.5" y="9" width="5" height="14" rx="2" fill={c.cross} />
      <rect x="9" y="13.5" width="14" height="5" rx="2" fill={c.cross} />
      <circle cx="16" cy="16" r="2.5" fill={c.accent} />
      <circle cx="16" cy="9" r="1" fill={c.accent} />
      <circle cx="16" cy="23" r="1" fill={c.accent} />
      <circle cx="9" cy="16" r="1" fill={c.accent} />
      <circle cx="23" cy="16" r="1" fill={c.accent} />
      <path d="M10 7L12 7.5" stroke={c.stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M22 7L20 7.5" stroke={c.stroke} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default memo(ClinovaLogo);
