import { memo } from 'react';

function ClinovaLogo({ size = 24, variant = 'default' }: { size?: number; variant?: string }) {
  const color = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#0F172A' : 'var(--primary)';
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ color }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}

export default memo(ClinovaLogo);
