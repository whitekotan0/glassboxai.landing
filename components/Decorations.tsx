import React from 'react';

export const DotPattern: React.FC<{ className?: string, width?: number, height?: number, cx?: number, cy?: number, cr?: number }> = ({ 
  className = "", 
  width = 16, 
  height = 16, 
  cx = 1, 
  cy = 1, 
  cr = 1 
}) => {
  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} className="fill-neutral-700" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#dot-pattern)" />
    </svg>
  );
};

export const GridPattern: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg className={`absolute inset-0 h-full w-full stroke-white/10 ${className}`} aria-hidden="true">
        <defs>
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse" x="-1" y="-1">
                <path d="M.5 32V.5H32" fill="none" strokeDasharray="0"></path>
            </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)"></rect>
    </svg>
  );
}

export const NoiseTexture: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`pointer-events-none absolute inset-0 opacity-[0.05] ${className}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export const SpectralBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[0%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[100px]"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]"></div>
    </div>
);