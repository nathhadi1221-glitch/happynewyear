import React from 'react';

interface BloomingFlowerProps {
  bloomProgress: number; // 0 to 1 (0 = tight bud, 1 = fully bloomed)
  size?: number;
  swayDelay?: number;
  swayDuration?: number;
  className?: string;
  depth?: 'fg' | 'mg' | 'bg';
}

/**
 * Adey Abeba (Ethiopian Yellow Daisy)
 * Renders an organic SVG flower that blooms from a small tight bud into a radiant golden flower.
 * Features 8 outer petals, 8 inner alternating petals, a textured golden central disc,
 * sepals, and an optional stem.
 */
export const BloomingFlower: React.FC<BloomingFlowerProps> = ({
  bloomProgress,
  size = 120,
  swayDelay = 0,
  swayDuration = 6,
  className = '',
  depth = 'mg',
}) => {
  // Clamp progress between 0 and 1
  const progress = Math.max(0, Math.min(1, bloomProgress));

  // Depth adjustments
  const baseOpacity = depth === 'bg' ? 0.7 : depth === 'mg' ? 0.9 : 1.0;
  const filterStyle = depth === 'bg' ? 'drop-shadow(0 0 8px rgba(234,179,8,0.2))' : 'drop-shadow(0 0 16px rgba(251,191,36,0.35))';

  // Calculations for petal expansion
  // Petals start retracted/curled and expand outward in scale and rotation
  const petalScaleY = 0.2 + progress * 0.8;
  const petalScaleX = 0.3 + progress * 0.7;
  const centerScale = 0.4 + progress * 0.6;
  const petalSpreadAngle = progress * 1; // 0 = flat/clustered, 1 = fully open

  // 8 primary petals around the circle
  const petalCount = 8;
  const petalAngles = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount);
  
  // 8 inner smaller petals for lush volume
  const innerAngles = Array.from({ length: petalCount }, (_, i) => (i * 360) / petalCount + 22.5);

  return (
    <div
      className={`relative inline-block select-none pointer-events-none transition-transform ${className}`}
      style={{
        width: size,
        height: size,
        opacity: baseOpacity,
        filter: filterStyle,
        animationName: progress > 0.6 ? 'sway' : 'none',
        animationDuration: `${swayDuration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationDelay: `${swayDelay}s`,
        transformOrigin: 'bottom center',
      }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Gradients for rich Ethiopian Adey Abeba yellow/gold petals */}
          <linearGradient id={`petalGrad-${size}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id={`innerPetalGrad-${size}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="90%" stopColor="#fde047" />
          </linearGradient>

          {/* Center disc gradient: warm brown/amber florets with golden crown */}
          <radialGradient id={`centerGrad-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="55%" stopColor="#92400e" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>

          {/* Green sepal gradient for the bud stage */}
          <linearGradient id={`sepalGrad-${size}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Sepals visible during early bud stage */}
        <g
          style={{
            transform: `scale(${1.1 - progress * 0.4})`,
            transformOrigin: '0 0',
            opacity: 1 - progress * 0.7,
            transition: 'all 0.5s ease-out',
          }}
        >
          {[-45, 0, 45, 90, 135, 180, 225, 270].map((angle, idx) => (
            <path
              key={`sepal-${idx}`}
              d="M 0 0 C -6 -15 -10 -25 0 -35 C 10 -25 6 -15 0 0"
              fill={`url(#sepalGrad-${size})`}
              transform={`rotate(${angle})`}
            />
          ))}
        </g>

        {/* Primary Outer Petals */}
        <g>
          {petalAngles.map((deg, i) => {
            // Individual petal organic offset for lifelike bloom
            const individualOffset = (i % 3) * 0.05;
            const effectiveProgress = Math.max(0, Math.min(1, (progress - individualOffset) / 0.95));
            const curScaleY = 0.2 + effectiveProgress * 0.8;
            const curScaleX = 0.25 + effectiveProgress * 0.75;
            const curRotate = deg + (1 - effectiveProgress) * ((i % 2 === 0 ? 15 : -15));

            return (
              <path
                key={`outer-petal-${i}`}
                d="M 0 0 C -14 -20 -18 -60 0 -85 C 18 -60 14 -20 0 0"
                fill={`url(#petalGrad-${size})`}
                transform={`rotate(${curRotate}) scale(${curScaleX}, ${curScaleY})`}
                style={{
                  transformOrigin: '0 0',
                  transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              />
            );
          })}
        </g>

        {/* Secondary Inner Petals for lush layer */}
        <g style={{ opacity: progress > 0.2 ? 1 : progress * 5 }}>
          {innerAngles.map((deg, i) => {
            const innerProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.85));
            const curScaleY = 0.15 + innerProgress * 0.65;
            const curScaleX = 0.2 + innerProgress * 0.65;

            return (
              <path
                key={`inner-petal-${i}`}
                d="M 0 0 C -11 -15 -14 -50 0 -70 C 14 -50 11 -15 0 0"
                fill={`url(#innerPetalGrad-${size})`}
                transform={`rotate(${deg}) scale(${curScaleX}, ${curScaleY})`}
                style={{
                  transformOrigin: '0 0',
                  transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              />
            );
          })}
        </g>

        {/* Center Golden Core (Adey Abeba disk florets) */}
        <circle
          cx="0"
          cy="0"
          r="18"
          fill={`url(#centerGrad-${size})`}
          style={{
            transform: `scale(${centerScale})`,
            transformOrigin: '0 0',
            transition: 'transform 0.2s ease-out',
          }}
        />

        {/* Center pollen texture rings */}
        <g
          style={{
            transform: `scale(${centerScale})`,
            opacity: progress,
            transformOrigin: '0 0',
          }}
        >
          {/* Ring of golden stamen dots */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const cx = Math.cos(rad) * 11;
            const cy = Math.sin(rad) * 11;
            return (
              <circle
                key={`stamen-${idx}`}
                cx={cx}
                cy={cy}
                r="1.8"
                fill="#fef08a"
                opacity="0.9"
              />
            );
          })}
          {/* Inner ring */}
          {[15, 75, 135, 195, 255, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const cx = Math.cos(rad) * 6;
            const cy = Math.sin(rad) * 6;
            return (
              <circle
                key={`inner-stamen-${idx}`}
                cx={cx}
                cy={cy}
                r="1.4"
                fill="#fbbf24"
                opacity="0.85"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
