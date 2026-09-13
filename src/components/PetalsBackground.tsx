import React, { useMemo } from 'react';

interface PetalsBackgroundProps {
  petalCount?: number;
  particleCount?: number;
}

export const PetalsBackground: React.FC<PetalsBackgroundProps> = ({
  petalCount = 14,
  particleCount = 18,
}) => {
  // Generate randomized deterministic petals
  const petals = useMemo(() => {
    return Array.from({ length: petalCount }, (_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 7.3 + 4) % 96}%`,
      animationDuration: `${12 + (i % 7) * 2.5}s`,
      animationDelay: `${(i * 1.3) % 8}s`,
      size: 14 + (i % 5) * 4,
      rotation: (i * 47) % 360,
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, [petalCount]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: `particle-${i}`,
      top: `${(i * 6.2 + 8) % 92}%`,
      left: `${(i * 9.1 + 3) % 94}%`,
      size: 3 + (i % 4) * 2,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${4 + (i % 4) * 2}s`,
    }));
  }, [particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft warm golden ambient lighting */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, rgba(217,119,6,0.04) 60%, transparent 80%)',
          animationName: 'pulseGlow',
          animationDuration: '10s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 75%)',
        }}
      />

      {/* Floating yellow petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-40px]"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            animationName: 'floatPetal',
            animationDuration: p.animationDuration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        >
          <svg
            viewBox="0 0 30 45"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
          >
            <path
              d="M 15 0 C 3 12 0 30 15 45 C 30 30 27 12 15 0 Z"
              fill="url(#petalAmberGrad)"
              transform={`rotate(${p.rotation} 15 22.5)`}
            />
            <defs>
              <linearGradient id="petalAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      {/* Glowing firefly / celebration particles */}
      {particles.map((pt) => (
        <div
          key={pt.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: pt.top,
            left: pt.left,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            backgroundColor: '#fef08a',
            boxShadow: '0 0 10px 2px rgba(250, 204, 21, 0.65)',
            animationName: 'pulseGlow',
            animationDuration: pt.duration,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: pt.delay,
          }}
        />
      ))}
    </div>
  );
};
